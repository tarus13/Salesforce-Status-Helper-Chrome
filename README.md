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
- **10 minutes or less, or overdue** — a red alert, so a breach can't sneak up while you're heads-down elsewhere.
- **Escalating chimes** at 10, 5 and 2 minutes, plus a desktop notification. Opening the case acknowledges the warning and cancels the remaining chimes — act once and you won't be nagged again.
- **Overdue never chimes.** A case a customer updated overnight greets you as a red row, not an alarm.
- **Mute** — an "Alerts On / Alerts Muted" button for anyone working near colleagues. It silences everything except New cases, whose first-response SLA is too important to mute. Muting affects sound only; rows, countdowns, and notifications carry on.
- Cases in New are tagged "1st resp" and sort first, since New carries the first-response SLA.
- **Timers are pulled automatically** every two hours during your shift. It runs on the clock rather than on your status, and it doesn't matter which view or browser tab you have in front — including while you're away in Zoom or another tab, where the whole pull can happen unseen and put your view back before you return.
  - It will not run while a case is assigned to you, while a dialog is open, or while you're actively typing in the Salesforce tab. It waits, tries again, and says why in the console.
  - A pull that reads nothing doesn't count against the two-hour clock, so a failed attempt never costs you the window.
  - Turn it off with the toggle beside My Cases and a manual **Pull Case Timers** button appears in its place.
- **A pull** reads every timer-bearing case in one pass (New, Re-open, Customer Note Added, Escalated to Engineering, Researching, Customer Callback Scheduled), New first — it opens each briefly, reads the timer, and closes it again. It never closes a tab you already had open, never closes a case assigned to you, stops if a dialog appears so unsaved work is never disturbed, and returns you to whatever you were reading when it finishes.
- Countdowns are read only from the case on screen, so a case can never inherit another case's timer, and a case without a milestone never shows a phantom one.
- Click "Milestones tracked" to see every tracked case and its countdown. Each one's tooltip says when it was last read, so you always know how fresh it is.

### Themes
Several palettes are available under the **Palette** menu, including a couple made for very small clients with strong opinions about blue and pink.

---

## Notes

- While you're **On a Web Case**, the extension will not change your status — with one exception: the end-of-shift preset described above. Otherwise, change out of it yourself first.
- Omni-Channel automation works **only** on `.salesforce.com` and `.force.com` pages. Nothing happens anywhere else.
- The current build targets the **zscalergov** org. Commercial (zscaler) case load moved to Genesys Cloud, so the old site selector was removed.
- Genesys Queue Sync is scoped to this organization's Genesys Cloud domain, and needs a Genesys tab open to have anything to control.
- Milestone timers only cover cases the extension has actually seen — ones you've opened, or ones picked up by a pull.
- A pull that runs while the Salesforce tab is hidden may come back empty: Chrome does not draw a hidden tab, so a case can open without ever showing its Milestones panel. The extension notices, doesn't count the attempt, and tries again shortly.
- Muting silences the chime for every status except New. Those other statuses still carry real SLAs, so mute is a trade of audible warning for quiet, not a free setting.

---

## Troubleshooting

Open Developer Tools with **F12** (or Settings → More Tools → Developer Tools) and type **SFSH** into the console filter box to isolate this extension's logs. Every pull reports what it read, what it couldn't, and why it is waiting, so a delayed or skipped pull can be traced from the log alone.

- For status or case issues, check the **Salesforce tab's** console.
- For Genesys sync issues, check **both** the Salesforce tab and the Genesys tab.
- If the chime plays but no desktop notification appears, the notification is being suppressed by the operating system — check Windows notification settings and Focus Assist for Chrome.

Please include those log lines when reporting an issue. They're there on purpose, and they usually name the problem outright.

---

<sub>Originally created by Drew Rutherford, who handed over the keys. The tool has been rebuilt and extended well past its original shape since then, but it started with him. 
Thanks, Drew.</sub>
