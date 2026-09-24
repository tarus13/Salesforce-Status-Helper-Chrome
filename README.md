# Salesforce Status Helper

A Chrome extension for Salesforce support engineers. It keeps your Omni-Channel status where it should be, keeps your Genesys Cloud queue in step with it, and puts your case load and SLA countdowns one click away.

**Install from the Chrome Web Store:**
https://chromewebstore.google.com/detail/salesforce-status-helper/pmffhgmpchebgcebnhaognkjfjbacobj

---

## The popup

Everything you need at a glance is on the front: your live status, the deadline that matters most, and your cases. Everything you set once lives behind the **gear button** in the bottom corner. The first time you open this version, a note points to it; it goes away once you've opened Settings or dismissed it.

- **The top line** shows your live Omni-Channel status, whether Genesys is being held On or Off Queue, and when your shift ends — or "held manually" if the schedule is off, or "off today" with your next shift on a day you don't work. Click it to jump to Salesforce.
- **The countdown** beneath it is the most urgent deadline you have, shown as a clock.
- **Your cases** follow, one row per status.
- **Settings save the moment you change them.** There is no Apply button.

---

## What it does

### Omni-Channel status automation
- **Run schedule** — with the schedule switched on in Settings, the extension moves you Available → Backlog → Offline based on the shift and queue times you enter.
- **Shift days** — tick the days you work, directly under the shift times in Settings. On an unticked day the schedule keeps you Offline and won't bring you up to Backlog or Available until your next working day. All seven days start ticked, so nothing changes until you untick one, and Saturday and Sunday are there for anyone who works weekends. At least one day always stays ticked; to stop the schedule altogether, switch off Run schedule.
- **Manual status** — switch the schedule off and an **Omni-Channel Status** card appears on the front with three choices. **Available** and **Backlog** are held until you change them. **Off** stops the extension holding a status at all; it does *not* set you Offline.
- **Stay logged in** — every 15 seconds it confirms your status is what it should be and signs you back in if Omni-Channel drops you without warning.
- **End-of-shift preset** — if your queue window or shift ends while you're still on a web case, it sets Backlog (or Offline) right away. Salesforce keeps that status when the case closes, so you're never pulled back to Available after hours.
- The schedule settings are always reachable in Settings, whichever mode you're in.

### Genesys Queue Sync
- Your Omni-Channel status drives the Genesys "On Queue" toggle: **Available → On Queue**, anything else → **Off Queue**.
- One-way by design — a Genesys call never changes your Omni-Channel status, because web cases take priority.
- Only the queue toggle is touched. Your Genesys presence is left alone.
- Works while the Genesys tab sits in the background, so you can stay in Salesforce and your queue still follows.
- In **Settings → Genesys**, switch **Sync with Omni** on or off. Choose **Auto** to follow Omni-Channel, or **Manual** to set the queue yourself with the **Manual Queue** switch that appears.
- Click the **Genesys** heading in Settings to jump to your Genesys tab, or open one if none exists.

### My Cases
- A live count of your open cases by status, one row each, with the total and how fresh it is above them. Click the total to refresh.
- Statuses that need action (New, Re-open, Customer Note Added, Researching) are listed first and highlighted.
- Click a row and its cases open directly beneath it; click a case to open it as a console tab — no page reload, so your Omni-Channel session and current status survive.
- If the list view is only partly loaded, it tells you ("Showing X of Y") rather than quietly undercounting.

### Case milestone timers (SLA countdowns)
- Reads the Milestones countdown from a case whenever it's on screen and keeps counting down for you afterward.
- **The most urgent deadline sits on the front as a large clock**, with the case number, whether it's the first-response SLA, and when it's due. The next one is listed beneath it. When nothing is due within 30 minutes, the front simply names your next deadline instead.
- **30 minutes or less** — the countdown turns amber.
- **10 minutes or less, or overdue** — it turns red, so a breach can't sneak up while you're heads-down elsewhere.
- **Escalating chimes** at 10, 5 and 2 minutes, plus a desktop notification. Opening the case acknowledges the warning and cancels the remaining chimes — act once and you won't be nagged again.
- **Overdue never chimes.** A case a customer updated overnight greets you as a red countdown, not an alarm.
- **Alert sound** — a switch in **Settings → Timers & alerts** for anyone working near colleagues. Turning it off silences everything except New cases, whose first-response SLA is too important to mute. It affects sound only; countdowns and notifications carry on.
- New cases carry the first-response SLA, so they are marked as such and sort first.
- **Timers are pulled automatically** every two hours for as long as a Salesforce tab is open — before, during and after your shift, overnight included. It runs on the clock rather than on your status, and it doesn't matter which view or browser tab you have in front — including while you're away in Zoom or another tab, where the whole pull can happen unseen and put your view back before you return.
  - It will not run while a case is assigned to you, while a dialog is open, or while you're actively typing in the Salesforce tab. It waits, tries again, and says why in the console.
  - A pull that reads nothing doesn't count against the two-hour clock, so a failed attempt never costs you the window.
  - Turn it off with **Auto timers** in Settings. **Pull timers now**, in the same section, runs one straight away whenever you like.
- **A pull** reads every timer-bearing case in one pass (New, Re-open, Customer Note Added, Escalated to Engineering, Researching, Customer Callback Scheduled), New first — it opens each briefly, reads the timer, and closes it again. It never closes a tab you already had open, never closes a case assigned to you, stops if a dialog appears so unsaved work is never disturbed, and returns you to whatever you were reading when it finishes.
- Countdowns are read only from the case actually on screen, so a case can never inherit another case's timer, and a case without a milestone never shows a phantom one.
- Click **Milestones tracked** to see every tracked case and its countdown. Each one's tooltip says when it was last read, so you always know how fresh it is. The **×** beside one stops tracking it.

### Themes
Seven palettes under **Settings → Appearance → Theme**: **White** (the default), Legacy, Dark, Rainbow, Tie-Dye, Sonic Blue and Princess Pink — including a couple made for very small clients with strong opinions about blue and pink.

---

## Notes

- While you're **On a Web Case**, the extension will not change your status — with one exception: the end-of-shift preset described above. Otherwise, change out of it yourself first.
- Omni-Channel automation works **only** on `.salesforce.com` and `.force.com` pages. Nothing happens anywhere else.
- The current build targets the **zscalergov** org. Commercial (zscaler) case load moved to Genesys Cloud, so the old site selector was removed.
- Genesys Queue Sync is scoped to this organization's Genesys Cloud domain, and needs a Genesys tab open to have anything to control. During your shift, an orange notice under the top line tells you if one isn't — click it to open one.
- The Genesys state shown at the top of the popup is what the extension is instructing Genesys to do. The popup can't see into Genesys itself.
- Milestone timers only cover cases the extension has actually seen — ones you've opened, or ones picked up by a pull.
- Pulls that run while the Salesforce tab is hidden read timers normally. Now and then Chrome fails to draw a case in a hidden tab; that case is simply read on the next pass.
- Every completed pull is recorded — when it ran, whether the tab was hidden, how long it took and how many timers it read — keeping the most recent fifty.
- Turning off Alert sound silences the chime for every status except New. Those other statuses still carry real SLAs, so it's a trade of audible warning for quiet, not a free setting.

---

## Troubleshooting

**Help & troubleshooting** in Settings brings you here.

Open Developer Tools with **F12** (or Settings → More Tools → Developer Tools) and type **SFSH** into the console filter box to isolate this extension's logs. Every pull reports what it read, what it couldn't, and why it is waiting, so a delayed or skipped pull can be traced from the log alone.

- For status or case issues, check the **Salesforce tab's** console.
- For Genesys sync issues, check **both** the Salesforce tab and the Genesys tab.
- If the chime plays but no desktop notification appears, the notification is being suppressed by the operating system — check Windows notification settings and Focus Assist for Chrome.
- If a chime doesn't sound when you expect one, turn on the console's **Verbose** level: the extension explains every chime it declines, and why.

Please include those log lines when reporting an issue. They're there on purpose, and they usually name the problem outright.

---

<sub>Originally created by Drew Rutherford, who handed over the keys. The tool has been rebuilt and extended well past its original shape since then, but it started with him — thanks, Drew.</sub>
