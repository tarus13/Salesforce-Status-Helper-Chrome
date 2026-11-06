# Salesforce Status Helper

A Chrome extension for Salesforce support engineers. It keeps your Omni-Channel status where it should be, keeps your Genesys Cloud queue in step with it, and puts your case load and SLA countdowns one click away.

**Install from the Chrome Web Store:**
https://chromewebstore.google.com/detail/salesforce-status-helper/pmffhgmpchebgcebnhaognkjfjbacobj

---

## The popup

Everything you need at a glance is on the front: your live status, the deadline that matters most, and your cases. Everything you set once lives behind the **gear button** in the bottom corner. The first time you open this version, a note points to it and mentions the descriptions below; it goes away once you've opened Settings or dismissed it.

- **The top line** shows your live Omni-Channel status, whether Genesys is being held On or Off Queue, and when your shift ends — or "held manually" if the schedule is off, or "off today" with your next shift on a day you don't work. Click it to jump to Salesforce.
- **The countdown** beneath it is the most urgent deadline you have, shown as a clock.
- **Your cases** follow, one row per status.
- **Settings save the moment you change them.** There is no Apply button; "Saved" flashes beside the Settings title.
- **Hover over anything to see what it does.** Rest the mouse on any part of the popup for half a second and a short description appears; it fades after four seconds, or the moment the mouse moves. The ⓘ beside the version number is the reminder.

---

## What it does

### Omni-Channel status automation
- **Run schedule** — with the schedule switched on in Settings, the extension moves you Available → Backlog → Offline based on the shift and queue times you enter, at the minute each one starts or ends. Shifts can run overnight: a start later than its end carries on into the next morning. If a shift or queue window is longer than 12 hours, or starts as it ends, Settings flags it, since that's almost always an AM/PM slip. A queue only makes you Available during your shift hours, so if it runs past either end of the shift, Settings flags it and names the hours you'll actually be Available.
- **Shift days** — select the days you work, directly under the shift times in Settings. On an unselected day the schedule keeps you Offline and won't bring you up to Backlog or Available until your next working day. All seven days start selected, so nothing changes until you deselect one, and Saturday and Sunday are there for anyone who works weekends. A night shift belongs to the day it starts, so Monday's night shift runs into Tuesday morning even if Tuesday isn't selected. At least one day always stays selected; to stop the schedule altogether, switch off Run schedule.
- **Split queues** — click the word **Queue** to add a 2nd Queue time slot beneath it, for anyone who works two queue windows in a shift. The word turns bold in your theme's color while it's open; click it again to remove it.
- **Different hours on different days** — most engineers keep the same hours every day, and that's the default. If yours differ, click *Work different hours on different days?* just under the Schedule header (click *Work the same hours every day?* to go back). Each day then gets its own shift and queues. The first time, every day starts with your current hours, so you only change the days that differ. Click a day to select it, and click it again to turn it on or off; the hours beneath belong to the selected day. **Copy to every working day**, under the day's name, sends its hours to the rest of your week, and **This week** sums the whole week up. The two sets of hours are kept separately, so going back brings back exactly what you had. Going between them only shows their hours; it never changes your status. Each has its own **Run schedule** switch and only one can be on: switching it on hands your schedule to the hours on screen, and the other shows *Currently running* with the hours in control. Hours with a working day still missing a time can't take over, and say which day. Switch off the one that's on to stop the schedule.
- **Manual status** — switch the schedule off and an **Omni-Channel Status** card appears on the front with three choices. **Available** and **Backlog** are held until you change them. **Off** stops the extension holding a status at all; it does *not* set you Offline.
- **Holds your status** — every 15 seconds it confirms your status is what it should be and puts it back if it drifts. If Omni-Channel loses its connection, it tells you to refresh the page.
- **The toolbar icon** shows your status with a dot in its bottom corner: green for Available, orange for Backlog, grey for Offline, and red for any other status, such as On a Web Case. With Run schedule off it shows an empty ring, whatever your status. A red dot with a white **!** means Omni-Channel lost its connection; it clears once the page is refreshed and Omni-Channel answers again. With no Salesforce tab open, there is no dot.
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
- If a case you click can't be opened (here, in the countdown or in a notification), a desktop notification says so. Salesforce has usually stopped responding in that tab, and refreshing it fixes that.
- If the list view is only partly loaded, it tells you ("Showing X of Y") rather than quietly undercounting.

### Case milestone timers (SLA countdowns)
- Reads the Milestones countdown from a case whenever it's on screen and keeps counting down for you afterward.
- **The most urgent deadline sits on the front as a large clock**, with the case number, whether it's the first-response SLA, and when it's due. The next one is listed beneath it. When nothing is due within 30 minutes, the front simply names your next deadline instead.
- **30 minutes or less** — the countdown turns amber.
- **10 minutes or less, or overdue** — it turns red, so a breach can't sneak up while you're heads-down elsewhere.
- **Escalating chimes** at 10, 5 and 2 minutes, plus a desktop notification. The extension plays the chime itself, so it sounds even if nobody has touched the Salesforce tab — on a break, or after the page reloaded. Clicking the countdown in the popup opens the case and cancels its remaining chimes, even before the first one sounds — act once and you won't be nagged again.
- **Overdue never chimes.** A case a customer updated overnight greets you as a red countdown, not an alarm.
- **Days since last update** — open a status row in My Cases and each case shows how many of your working days (the days ticked under Schedule) have passed since it was last updated (Salesforce's *Last Modified Date*, read with the list): grey up to 2, highlighted at 3, red from 4. A dot on a status row shows its worst case, and a red note beside the case count says how many have gone 4+ days. No chime and no timer. It needs the *Last Modified Date* column in your My Cases list view.
- **Customer notes** — when a customer updates a case and it moves to *Customer Note Added*, a soft singing-bowl tone sounds (nothing like the SLA chime) and a notification names the case; click it to open the case. It's noticed whenever the extension reads your My Cases list.
- **Alert sound** — a switch in **Settings → Timers & alerts** for anyone working near colleagues. Turning it off silences everything except New cases, whose first-response SLA is too important to mute. It affects sound only; countdowns and notifications carry on.
- New cases carry the first-response SLA, so they are marked as such and sort first.
- **Timers are pulled automatically**, without reopening cases that haven't changed. Once a shift (every 12 hours) a full pull reads every case with a timer. After that, every 15 minutes the extension glances at your My Cases list (opening or refreshing the popup counts as a check and restarts the 15 minutes), and opens a case only when it is new to you or its status changed to one with a timer, a minute after the change so Salesforce has started the new milestone. Unchanged cases are never reopened; their deadlines are already known and keep counting down.
  - The glance and its reads wait until Salesforce is out of sight or you've been idle for a minute (no key, click, scroll or typing), and never run while a case is assigned to you or a dialog is open.
  - Cases in **New** are never closed by the extension, and normally never opened either: Omni opens a New case in its own tab the moment it's assigned, so its first-response countdown is read straight off the screen. The one exception is a New case assigned by hand, which arrives with no tab: once you're idle or away, it's opened once and left open, as Omni would have, so its countdown and SLA chimes work. Close it and it stays closed.
  - A case you open yourself has its timer read from the screen within about 10 seconds, so a status you change on an open case needs no pull at all.
  - A list that is only partly loaded is never compared, and a case that shows no timer after two reads is left to the next full pull.
  - A case whose milestones are all met (its Milestones panel shows no countdown, only Show More) is remembered, and never reopened while it keeps the same status, even if it stays New.
  - Turn it all off with **Auto pull** in Settings. **Pull timers now**, in the same section, runs a full pull straight away whenever you like.
- **A pull** reads every timer-bearing case in one pass (New, Re-open, Customer Close Request, Customer Note Added, Escalated to Engineering, Researching, Customer Callback Scheduled), New first — it opens each briefly, reads the timer, and closes it again. It never closes a tab you already had open, never closes a case assigned to you, stops if a dialog appears so unsaved work is never disturbed, and returns you to whatever you were reading when it finishes.
- Countdowns are read only from the case actually on screen, so a case can never inherit another case's timer, and a case without a milestone never shows a phantom one.
- Click **Milestones tracked** to see every tracked case and its countdown. Each one's tooltip says when it was last read, so you always know how fresh it is. The **×** beside one stops tracking it. The list shows 5 cases a page, soonest first; from the 6th case on, **« ‹ › »** at the bottom move between pages.

### Themes
Seven palettes under **Settings → Appearance → Theme**: **White** (the default), Legacy, Dark, Rainbow, Tie-Dye, Sonic Blue and Princess Pink — including a couple made for very small clients with strong opinions about blue and pink. **Legacy** wears the colors of Drew's original popup: grey and aqua, black headings, and his green, orange and red status buttons. Each theme has its own touches, too: Dark is brushed metal, Rainbow's switches and lit days carry a flowing rainbow, Tie-Dye's hold a little lava lamp, Sonic Blue takes Green Hill's colors with golden-ring switches and day chips drawn as item monitors, Princess Pink twinkles, and Legacy uses Drew's font as well as his colors.

### Animation
Small, quick movements that carry meaning: the countdown glows softly when it's under 10 minutes, the green dot breathes while you're Available, a status change slides in, a count pops when a case arrives, a case list drops open, a pull fills a bar under its row, and "Saved" slides in. Switches and day chips have a little spring. If Windows is set to reduce motion, none of it runs and every theme keeps a still look.

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

- [If Using Custom Dashboard Instructions.txt](https://github.com/user-attachments/files/32626503/If.Using.Custom.Dashboard.Instructions.txt)

---

## Troubleshooting

**Help & troubleshooting** in Settings brings you here.

Open Developer Tools with **F12** (or Settings → More Tools → Developer Tools) and type **SFSH** into the console filter box to isolate this extension's logs. Every pull reports what it read, what it couldn't, and why it is waiting, so a delayed or skipped pull can be traced from the log alone.

- For status or case issues, check the **Salesforce tab's** console.
- For chimes and their notifications, check the **extension's own** console: open `chrome://extensions` and click **service worker** under Salesforce Status Helper. The chime is decided there, not in the Salesforce tab.
- For Genesys sync issues, check **both** the Salesforce tab and the Genesys tab.
- If the chime plays but no desktop notification appears, the notification is being suppressed by the operating system — check Windows notification settings and Focus Assist for Chrome.
- If a chime doesn't sound when you expect one, turn on **Verbose** in that service worker console: the extension explains every chime it declines, and why.

Please include those log lines when reporting an issue. They're there on purpose, and they usually name the problem outright.

---

<sub>Originally created by Drew Rutherford, who handed over the keys. The tool has been rebuilt and extended well past its original shape since then, but it started with him — thanks, Drew.</sub>
