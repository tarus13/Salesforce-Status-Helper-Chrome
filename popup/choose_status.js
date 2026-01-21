var selectedsite;

function applyTheme(themeName) {
  document.body.className = document.body.className.replace(/\btheme-\w+\b/g, '').trim();
  document.body.classList.add('theme-' + themeName);
}

function showQueueValidationMessage(msg) {
    var el = document.getElementById("queueValidationMsg");
    if (!el) return;
    el.textContent = msg || "Please fill in Start / End Shift and First Shift before enabling.";
    clearTimeout(showQueueValidationMessage._t);
    showQueueValidationMessage._t = setTimeout(function () {
        el.textContent = "";
    }, 3500);
}

function _hasValue(id) {
    var el = document.getElementById(id);
    return !!(el && el.value && el.value.trim() !== "");
}

function canEnableAutoQueue() {
    // Require Start / End Shift and First Shift
    if (!_hasValue("startshift") || !_hasValue("endshift")) return false;
    if (!_hasValue("firstshiftstart") || !_hasValue("firstshiftend")) return false;

    // Second shift only required if enabled
    var ss = document.getElementById("secondshift_enabled_checkbox");
    if (ss && ss.checked) {
        if (!_hasValue("secondshiftstart") || !_hasValue("secondshiftend")) return false;
    }
    return true;
}

function getSelectedSitePattern() {
    var site = document.querySelector("#salesforcesite").value;
    if (site === "government") return "*://zscalergov.lightning.force.com/*";
    return "*://zscaler.lightning.force.com/*";
}

function updateSecondShiftUI() {
    var ssCb = document.getElementById('secondshift_enabled_checkbox');
    var section = document.getElementById('secondshift_section');
    var start = document.getElementById('secondshiftstart');
    var end = document.getElementById('secondshiftend');

    var enabled = ssCb ? ssCb.checked : true;

    if (start) start.disabled = !enabled;
    if (end) end.disabled = !enabled;

    // Collapse for cleaner UI
    if (section) {
        section.style.display = enabled ? '' : 'none';
    }
}

function listenForClicks() {
    // Status button clicks (Available/Backlog/Disable)
    document.addEventListener("click", function (e) {

        function setStatus(statusName) {
            switch (statusName) {
                case "Available":
                    return "Available";
                case "Backlog":
                    return "Backlog";
                default:
                    return null;
            }
        }

        function pushStatus(tabs) {
            var status = setStatus(e.target.textContent);
            if (!status) return;

            for (var i = 0; i < tabs.length; ++i) {
                if (status === "Backlog") {
                    chrome.tabs.sendMessage(tabs[i].id, { command: "Backlog" });
                } else if (status === "Available") {
                    chrome.tabs.sendMessage(tabs[i].id, { command: "Available" });
                }
            }
        }

        function disableHelper(tabs) {
            for (var i = 0; i < tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, { command: "Disable" });
            }
        }

        function reportError(error) {
            console.error("Could not set Omni-Channel status:", error);
        }

        // Buttons identified by class
        if (e.target.classList.contains("available")) {
            selectedsite = getSelectedSitePattern();
            chrome.tabs.query({ url: selectedsite }).then(pushStatus).catch(reportError);
        } else if (e.target.classList.contains("backlog")) {
            selectedsite = getSelectedSitePattern();
            chrome.tabs.query({ url: selectedsite }).then(pushStatus).catch(reportError);
        } else if (e.target.classList.contains("disable")) {
            selectedsite = getSelectedSitePattern();
            chrome.tabs.query({ url: selectedsite }).then(disableHelper).catch(reportError);
        }
    });

    // Toggle between Status section and Queue Hours section
    var queueHoursCheckbox = document.getElementById("queuehours_checkbox");
    if (queueHoursCheckbox) {
        queueHoursCheckbox.addEventListener('change', function () {
            var autoQueueBox = document.getElementById("enableQueue_checkbox");
            var statusSection = document.getElementById("status-section");
            var queueSection = document.getElementById("queue-section");

            if (queueHoursCheckbox.checked) {
                if (queueSection) queueSection.removeAttribute("hidden");
                if (statusSection) statusSection.setAttribute("hidden", "hidden");
            } else {
                if (queueSection) queueSection.setAttribute("hidden", "hidden");
                if (statusSection) statusSection.removeAttribute("hidden");

                // If user exits queue-hours UI, disable auto queue if it was enabled
                if (autoQueueBox && autoQueueBox.checked) {
                    autoQueueBox.click();
                }
            }
        });
    }

    function pushEnableAutoQueue(tabs) {
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, { command: "enableAutoQueue" });
        }
    }

    function pushDisableAutoQueue(tabs) {
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, { command: "disableAutoQueue" });
        }
    }

    // Restore: if previously enabled, only re-enable if required fields exist
    chrome.storage.sync.get({
        savedEnableQueueCheckbox: true,
        savedSecondShiftEnabled: true
    }, function (items) {
        if (items.savedEnableQueueCheckbox === true) {
            if (!canEnableAutoQueue()) {
                var cb = document.getElementById("enableQueue_checkbox");
                if (cb) cb.checked = false;
                chrome.storage.sync.set({ savedEnableQueueCheckbox: false });
                showQueueValidationMessage("Auto Queue disabled: set Start / End Shift and First Shift first.");
                return;
            }
            selectedsite = getSelectedSitePattern();
            chrome.tabs.query({ url: selectedsite }).then(pushEnableAutoQueue);
        }
    });

    // Enable/disable auto queue checkbox
    var enableQueueCb = document.getElementById("enableQueue_checkbox");
    if (enableQueueCb) {
        enableQueueCb.addEventListener('change', function () {
            if (enableQueueCb.checked && !canEnableAutoQueue()) {
                enableQueueCb.checked = false;
                showQueueValidationMessage();
                return;
            }

            selectedsite = getSelectedSitePattern();
            if (enableQueueCb.checked) {
                chrome.tabs.query({ url: selectedsite }).then(pushEnableAutoQueue);
            } else {
                chrome.tabs.query({ url: selectedsite }).then(pushDisableAutoQueue);
            }
        });
    }

    // If any required field becomes empty while enabled, automatically disable Auto Queue and notify.
    ["startshift", "endshift", "firstshiftstart", "firstshiftend", "secondshiftstart", "secondshiftend"].forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.addEventListener("change", function () {
            var cb = document.getElementById("enableQueue_checkbox");
            if (cb && cb.checked && !canEnableAutoQueue()) {
                cb.checked = false;

                selectedsite = getSelectedSitePattern();
                chrome.tabs.query({ url: selectedsite })
                    .then(pushDisableAutoQueue)
                    .catch(function (error) { console.error("Could not disable Auto Queue:", error); });

                chrome.storage.sync.set({ savedEnableQueueCheckbox: false });
                showQueueValidationMessage("Auto Queue disabled: required hours were cleared.");
            }
        });
    });
}

function save_options() {
    var salesforceSite = document.getElementById('salesforcesite').value;
    var queueCheckbox = document.getElementById('queuehours_checkbox').checked;
    var startshift = document.getElementById("startshift").value;
    var endshift = document.getElementById("endshift").value;
    var firstshiftstart = document.getElementById("firstshiftstart").value;
    var firstshiftend = document.getElementById("firstshiftend").value;
    var secondshiftstart = document.getElementById("secondshiftstart").value;
    var secondshiftend = document.getElementById("secondshiftend").value;
    var enableQueueCheckbox = document.getElementById('enableQueue_checkbox').checked;
    var secondShiftEnabledCheckbox = document.getElementById('secondshift_enabled_checkbox').checked;

    chrome.storage.sync.set({
        savedSite: salesforceSite,
        savedCheckbox: queueCheckbox,
        savedStartShift: startshift,
        savedEndShift: endshift,
        savedFirstShiftStart: firstshiftstart,
        savedFirstShiftEnd: firstshiftend,
        savedSecondShiftStart: secondshiftstart,
        savedSecondShiftEnd: secondshiftend,
        savedEnableQueueCheckbox: enableQueueCheckbox,
        savedSecondShiftEnabled: secondShiftEnabledCheckbox
    }, function () {
        var status = document.getElementById('saveStatus');
        if (!status) return;
        status.textContent = "Settings have been saved";
        setTimeout(function () { status.textContent = ""; }, 2000);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        savedSite: "government",
        savedCheckbox: true,
        savedStartShift: "",
        savedEndShift: "",
        savedFirstShiftStart: "",
        savedFirstShiftEnd: "",
        savedSecondShiftStart: "",
        savedSecondShiftEnd: "",
        savedEnableQueueCheckbox: false,
        savedSecondShiftEnabled: true
    }, function (items) {
        document.getElementById('salesforcesite').value = items.savedSite;
        document.getElementById('queuehours_checkbox').checked = items.savedCheckbox;
        document.getElementById("startshift").value = items.savedStartShift;
        document.getElementById("endshift").value = items.savedEndShift;
        document.getElementById("firstshiftstart").value = items.savedFirstShiftStart;
        document.getElementById("firstshiftend").value = items.savedFirstShiftEnd;
        document.getElementById("secondshiftstart").value = items.savedSecondShiftStart;
        document.getElementById("secondshiftend").value = items.savedSecondShiftEnd;
        document.getElementById('enableQueue_checkbox').checked = items.savedEnableQueueCheckbox;
        document.getElementById('secondshift_enabled_checkbox').checked = items.savedSecondShiftEnabled;

        updateSecondShiftUI();

        var statusSection = document.getElementById("status-section");
        var queueSection = document.getElementById("queue-section");

        if (items.savedCheckbox === true) {
            if (queueSection) queueSection.removeAttribute("hidden");
            if (statusSection) statusSection.setAttribute("hidden", "hidden");
        } else {
            if (queueSection) queueSection.setAttribute("hidden", "hidden");
            if (statusSection) statusSection.removeAttribute("hidden");
            document.getElementById("enableQueue_checkbox").checked = false;
        }

        // If storage says enabled but fields are missing, immediately disable + warn.
        if (items.savedEnableQueueCheckbox === true && !canEnableAutoQueue()) {
            var cb = document.getElementById("enableQueue_checkbox");
            if (cb) cb.checked = false;
            chrome.storage.sync.set({ savedEnableQueueCheckbox: false });
            showQueueValidationMessage("Auto Queue disabled: set Start / End Shift and First Shift first.");
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    restore_options();

    // Keep popup UI version in sync with manifest
    var vEl = document.getElementById('uiVersion');
    if (vEl) { vEl.textContent = chrome.runtime.getManifest().version; }

    // Second shift toggle
    var ssCb = document.getElementById('secondshift_enabled_checkbox');
    if (ssCb) ssCb.addEventListener('change', updateSecondShiftUI);

    // Save button
    var btn = document.getElementById("saveSettingsButton");
    if (btn) btn.addEventListener('click', save_options);

    // Wire main listeners
    listenForClicks();
});


document.addEventListener('DOMContentLoaded', function () {
    var paletteBtn = document.getElementById('paletteBtn');
    var paletteMenu = document.getElementById('paletteMenu');
    if (!paletteBtn || !paletteMenu) return;

    function setMenuOpen(isOpen) {
        paletteMenu.hidden = !isOpen;
        paletteBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    function setActive(themeName) {
        var opts = document.querySelectorAll('.paletteOption');
        opts.forEach(function (b) {
            if (b.getAttribute('data-theme') === themeName) b.classList.add('isActive');
            else b.classList.remove('isActive');
        });
    }

    chrome.storage.sync.get({ selectedTheme: 'dark' }, function (items) {
        var t = (items.selectedTheme || 'dark');
        if (t === 'warm') t = 'tiedye';
        applyTheme(t);
        setActive(t);
    });

    paletteBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setMenuOpen(paletteMenu.hidden); // toggle
    });

    document.querySelectorAll('.paletteOption').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var t = btn.getAttribute('data-theme');
            applyTheme(t);
            setActive(t);
            chrome.storage.sync.set({ selectedTheme: t });
            setMenuOpen(false);
        });
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
        if (!paletteMenu.hidden) {
            var within = paletteMenu.contains(e.target) || paletteBtn.contains(e.target);
            if (!within) setMenuOpen(false);
        }
    });
});


// --- Site Options Button Logic (uses hidden <select id="salesforcesite"> for compatibility) ---
document.addEventListener('DOMContentLoaded', function () {
  var siteBtn = document.getElementById('siteBtn');
  var siteMenu = document.getElementById('siteMenu');
  var siteSelect = document.getElementById('salesforcesite');
  if (!siteBtn || !siteMenu || !siteSelect) return;

  function labelFor(val){
    return (val === 'government') ? 'zscalergov' : 'zscaler';
  }

  function setOpen(open){
    siteMenu.hidden = !open;
    siteBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) setActive(siteSelect.value);
  }

  function setActive(val){
    var opts = document.querySelectorAll('.siteOption');
    opts.forEach(function(b){
      if (b.getAttribute('data-site') === val) b.classList.add('isActive');
      else b.classList.remove('isActive');
    });
  }

  function setSite(val){
    siteSelect.value = val;
    // Button stays constant label (per UI spec)
    // Selection is shown by highlighting inside the menu when opened.
    chrome.storage.sync.set({ savedSite: val });
  }

  // Restore selection
  chrome.storage.sync.get({ savedSite: 'government' }, function(items){
    var v = items.savedSite || 'government';
    setSite(v);
    setActive(v);
  });

  siteBtn.addEventListener('click', function(e){
    e.preventDefault();
    setOpen(siteMenu.hidden);
  });

  document.querySelectorAll('.siteOption').forEach(function(btn){
    btn.addEventListener('click', function(){
      var v = btn.getAttribute('data-site') || 'government';
      setSite(v);
      setActive(v);
      setOpen(false);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', function(e){
    if (!siteMenu.hidden) {
      if (!siteMenu.contains(e.target) && !siteBtn.contains(e.target)) {
        setOpen(false);
      }
    }
  });
});


