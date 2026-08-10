# Salesforce Status Helper

A Chrome extension for Salesforce support engineers. It keeps your Omni-Channel status where it should be, keeps your Genesys Cloud queue in step with it, and puts your case load and SLA countdowns one click away.

**Install from the Chrome Web Store:**
https://chromewebstore.google.com/detail/salesforce-status-helper/pmffhgmpchebgcebnhaognkjfjbacobj

---

## What it does

### Omni-Channel status automation
- **Automated queue** — moves you Available → Backlog → Offline based on the shift and queue times you enter.
- **Manual status** — pick a status instead, and the extension holds you there until you change it.
- **Stay logged in** — every 15 seconds it confirms your status is what it should be and signs you back in if Omni-Channel drops you without warning.
- **End-of-shift preset** — if your queue window or shift ends while you're still on a web case, it sets Backlog (or Offline) right away. Salesforce keeps that status when the case closes, so you're never pulled back to Available after hours.

### Genesys Queue Sync
- Your Omni-Channel status drives the Genesys "On Queue" toggle: **Available → On Queue**, anything else → **Off Queue**.
- One-way by design — a Genesys call never changes your Omni-Channel status, because web cases take priority.
- Only the queue toggle is touched. Your Genesys presence is left alone.
- Works while the Genesys tab sits in the background, so you can stay in Salesforce and your queue still follows.
- **Manual override** — flip it to Manual and control the queue yourself, or switch the sync off entirely and the extension won't touch Genesys at all.

### My Cases dashboard
- A live count of your open cases by status, in a compact two-per-line grid.
- Statuses that need action (New, Re-open, Customer Note Added, Researching) are listed first and highlighted.
- Click a status to see its cases; click a case to open it as a console tab — no page reload, so your Omni-Channel session and current status survive.
- If the list view is only partly loaded, it tells you ("Showing X of Y") rather than quietly undercounting.

### Case milestone timers (SLA countdowns)
- Reads the Milestones countdown from a case whenever it's on screen and keeps counting down for you afterward.
- **30 minutes or less** — an amber heads-up.
- **10 minutes or less, or overdue** — a red alert plus an audible chime and a desktop notification, so a breach can't sneak up while you're heads-down elsewhere.
- Cases in New are tagged "1st resp" and sort first, since New carries the first-response SLA.
- **Pull Case Timers** reads every timer-bearing case in one pass — it opens each briefly, reads the timer, and closes it again. It never closes a tab you already had open, stops if a dialog appears so unsaved work is never disturbed, and returns you where you started.
- Click "Milestones tracked" to see every tracked case and its countdown. Each one's tooltip says when it was last read, so you always know how fresh it is.

### Themes
Several palettes are available under the **Palette** menu, including a couple made for very small clients with strong opinions about blue and pink.

---

## Notes

- While you're **On a Web Case**, the extension will not change your status — with one exception: the end-of-shift preset described above. Otherwise, change out of it yourself first.
- Omni-Channel automation works **only** on `.salesforce.com` and `.force.com` pages. Nothing happens anywhere else.
- The current build targets the **zscalergov** org. Commercial (zscaler) case load moved to Genesys Cloud, so the old site selector was removed.
- Genesys Queue Sync is scoped to this organization's Genesys Cloud domain, and needs a Genesys tab open to have anything to control.
- Milestone timers only cover cases the extension has actually seen — ones you've opened, or ones picked up by **Pull Case Timers**.

---

## Troubleshooting

Open Developer Tools with **F12** (or Settings → More Tools → Developer Tools) and type **SFSH** into the console filter box to isolate this extension's logs.

- For status or case issues, check the **Salesforce tab's** console.
- For Genesys sync issues, check **both** the Salesforce tab and the Genesys tab.
- If the chime plays but no desktop notification appears, the notification is being suppressed by the operating system — check Windows notification settings and Focus Assist for Chrome.

Please include those log lines when reporting an issue. They're there on purpose, and they usually name the problem outright.

---

<sub>Originally created by Drew Rutherford, who handed over the keys. The tool has been rebuilt and extended well past its original shape since then, but it started with him — thanks, Drew.</sub>
