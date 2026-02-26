# Changelog

## [5.0.0]

> Note: This release is a major UI/UX modernization of the extension popup, plus validation hardening for Auto Queue.  
> Compared against production `master.zip` (manifest version observed as 4.6.3 in that ZIP).

### Added
- Palette system with multiple themes selectable from the popup (button-driven menu UI).
- Unified “button + submenu” interaction pattern for **Palette** and **Site Options**.

### Changed
- Default popup theme now loads as **Dark** (instead of Legacy).
- “Total Work Hours” renamed to **“Start / End Shift”**.
- “First Shift Hours” renamed to **“First Shift”**.
- “Second Shift Hours” renamed to **“Second Shift”**.
- Footer layout updated: version display, Palette button placement, and help link positioning refined.

### Fixed
- Auto Queue “Enable” validation hardened:
  - Prevent enabling Auto Queue unless required shift fields are populated.
  - If required fields are cleared while enabled, Auto Queue is automatically disabled and a message is shown.
- Help/Repo link updated to new maintainer repository:
  - `github.com/tarus13/Salesforce-Status-Helper-Chrome`
- Site Options control styling corrected (no longer “invisible until hover” behavior).

### Internal / Maintenance
- Popup UI refactor: theme classes and styling reorganized for maintainability across palettes.
- Background URL matching logic adjusted for correctness (site matching behavior updated).

## [5.1.1] - 2026-02-26

### Fixed 
-Auto-activation on browser startup — Extension now automatically injects into open Salesforce tabs when Chrome launches. Previously, the extension would not activate unless the user manually clicked the extension icon to open the popup.
-Activation on tab switch — Content script now injects when a user switches to a Salesforce tab, ensuring the helper is always running without manual intervention.
-Activation on install/update — Content script is now injected into all matching open tabs immediately upon extension install or update.
-Tab update listener scoping — The onUpdated listener is now correctly scoped to changeInfo.status === "complete", preventing premature injection attempts before the page has fully loaded.

### Changed
-Refactored tab injection logic into a shared injectIntoMatchingTabs() helper function to reduce code duplication across listeners.

