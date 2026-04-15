# Changelog

## [5.2.1]
### Bug Fixes
- **Fixed: Extension triggered dashboard list view menus** — `document.querySelector('lightning-button-menu button')` matched the first such element on the entire page, which on dashboard pages was the gear/settings icon for list views — not the Omni-Channel status dropdown. This caused "New/Clone/Rename/Select Fields to Display/Delete/Reset Column Sorting/Reset Column Widths" to pop up without user interaction every 15 seconds. All status-related selectors are now scoped to `omni-widget2-header.runtime_service_omnichannelStatus`.
- **Fixed: Initialization required manually opening the Omni-Channel dropdown** — `getInitialVariables()` required `lightning-menu-item` elements to exist before allowing startup, but Enhanced Omni-Channel only renders these elements while the dropdown is physically open. Initialization looped indefinitely until the user manually clicked the widget. The check was removed; menu items are now resolved dynamically at click time by `clickStatusMenuItem()`.
- **Fixed: Auto Queue did not activate without clicking the extension icon** — Consequence of the above two failures. `getInitialVariables()` never completed, so `allVariablesLoaded` was never sent to the background service worker and `enableAutoQueue` was never dispatched. The "Enabled with Automated Queue" banner would not appear until the user manually opened the popup.

### Internal / Maintenance
- **Two-Tier DOM Scoping** — Introduced `getOmniStatusHeader()` scoped to `omni-widget2-header.runtime_service_omnichannelStatus` for all status operations, and `getOmniWidget()` scoped to `div.runtime_service_omnichannelOmniWidget` for error checks. Status interactions are now fully isolated from the work list panel and any other `lightning-button-menu` elements on the page.
- **Removed Shadow DOM Fallback** — DOM capture confirmed Enhanced Omni-Channel uses light DOM exclusively. The `shadowRoot` probing in `clickStatusMenuItem()` was dead code and has been removed.

## [5.2.0]
### New Features & Improvements
- **Enhanced Omni-Channel Compatibility** — Rebuilt DOM interaction layer to support Salesforce Enhanced Omni-Channel. Standard Omni-Channel reaches End of Life in Summer '26; this version targets the `lightning-button-menu` and `lightning-menu-item` component structure used by Enhanced.
- **Title-Based Status Selectors** — Replaced class-based status selectors (`slds-dropdown__item awayStatus/onlineStatus/offlineStatus`) with title-attribute selectors (`lightning-menu-item[title="Available/Backlog/Offline"]`) for reliability across multi-status Enhanced environments where multiple statuses share the same class.
- **Shadow DOM Compatibility** — Added native shadow DOM and light DOM fallback logic for clicking menu items across LWC component boundaries.
- **Status Text Selector Updated** — Replaced hardcoded `span[2]` index for reading current status with stable `p.truncatedText` selector.
- **Maintainer Update** — Homepage URL updated to tarus13's repository.

### Bug Fixes
- **Fixed: Blocking alert() on initialization failure** — All `alert()` calls have been removed. Errors now route to the console only, preventing the page thread from locking and the popup from becoming inaccessible when initialization fails.
- **Fixed: ReferenceError cascade on SFSHStatusDiv** — All references to `SFSHStatusDiv` are now null-safe. Previously, if `getInitialVariables()` failed before creating the banner element, any subsequent event handler touching `SFSHStatusDiv` would throw a `ReferenceError` and spam the console.
 
## [5.1.1]

### Bug Fixes

- **Fixed: Auto Queue required clicking the extension icon to activate**
  A race condition in the popup caused `canEnableAutoQueue()` to run before the DOM was populated with saved values. This caused `savedEnableQueueCheckbox` to be incorrectly written as `false` to storage, so the background service worker would not send the `enableAutoQueue` command on page load. The restore logic was moved into `restore_options()` where the DOM is guaranteed to be fully populated before any validation runs.

- **Fixed: Unchecking Enable Auto Queue did not persist without clicking Apply Settings**
  Toggling the Enable Auto Queue checkbox now immediately saves the new state to storage. Previously the state was only saved when the user clicked "Apply Settings," which meant disabling the checkbox had no effect across sessions or page reloads.

- **Fixed: Auto Queue did not activate when page was loaded before shift start time**
  When the page was loaded before the configured shift start time (e.g., loading at 8:27 AM for an 8:30 AM shift), `autoQueueCheck()` would find no matching shift window and call `disableAutoQueue()`, permanently clearing the polling interval. The extension would then never detect when the shift start time arrived. The fix removes the automatic `disableAutoQueue()` call from `autoQueueCheck()`. The polling interval now runs continuously until the user explicitly disables it via the popup. Status is set to Offline during off-hours, and automatically transitions to Available or Backlog when the configured shift window begins.

## [5.0.0]

## Added

- **Optional Second Shift** — Second Shift can now be toggled on or off via a checkbox. Previously it was always active.
- **Theme Support** — Added a Palette selector in the footer with four themes: Legacy, Dark, Rainbow, and Tie-Dye.
- **Improved Site Selection UI** — Site Options now uses a custom button/dropdown instead of a plain `<select>` element, with active state highlighting.
- **Auto Queue Validation** — The Enable Auto Queue checkbox now requires Start/End Shift and First Shift times to be filled before it can be activated. A validation message is shown if fields are missing.
- **Auto Queue Field Monitoring** — If a required shift time field is cleared while Auto Queue is enabled, Auto Queue automatically disables and notifies the user.
- **Improved Injection Strategy** — Content script is now injected on browser startup, extension install/update, tab activation, and tab load completion. Previously only injected on active tab update.
- **Multi-Tab Support** — Extension now targets all matching Salesforce tabs, not just the currently active one.
