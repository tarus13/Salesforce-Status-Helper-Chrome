# Changelog

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
