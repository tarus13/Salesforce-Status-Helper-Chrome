# Changelog

## [5.0.0] - Unreleased

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

