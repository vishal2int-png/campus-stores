# Campus Stores

Campus Stores is a Product Engineer work sample set at a fictional campus media equipment desk. Work through a club’s screening, from equipment pickup to a partial return and the next morning’s handover. Open **Candidate brief** in the app for the assignment.

## Product Engineering Brief & Design Decision

### Product Promise
**The complete, compatible kit will be ready when the event needs it.**

### Would You Keep This Product?
**Keep the unit-level loan engine and offline counter speed, but connect unit loans to event reservation windows and shift handovers.**

1. **What the original product handles well (and what we kept):**
   - **One loan slip per physical unit (`Loan register`):** Every physical asset (`PR-04`, `SP-02`, `AD-12`) is tracked on its own slip (`L-402`, `L-403`, `L-404`) rather than locking a multi-item request into a single all-or-nothing boolean.
   - **Concrete evidence from the shift:** At **`Friday · 7:30 pm`**, Kabir Sen brings back only the projector (`PR-04`) and speaker (`SP-02`) from the Film Society screening while Leela Das still has the adapter (`AD-12`). Because each physical unit has its own loan slip, the desk worker can immediately check in the projector (`L-402`) and speaker (`L-403`) while leaving the adapter slip (`L-404`) open.
   - We also kept the sample shift clock, `localStorage` persistence, and zero-dependency offline operation in the vanilla app ([index.html](index.html), [styles.css](styles.css), [app.js](app.js)).

2. **What we changed (and the one design decision):**
   - **Concrete evidence of the gap in the original product:** At **`Friday · 7:30 pm`**, when Kabir reports *“Leela still has the adapter. She’ll drop it off tomorrow at nine,”* the original app only allows typing an unlinked free-text note in `Desk book`. It cannot record a reported return ETA on the open adapter slip, nor can it see that returning the adapter at **`Saturday · 9:00 am`** plus a **15-minute inspection buffer** means the adapter is ready no earlier than **`9:15 am`**, putting a confirmed **`Saturday · 9:05 am`** pickup at risk.
   - **Our design decision — Connect whole-kit reservation windows to loan-linked handover ETAs and spare reassignment:**
     - **Approved requests vs. confirmed reservations:** Requests now capture planned **pickup**, **event start**, **event end**, and **return deadline**, and check a configurable **post-return inspection buffer** (`15 min` default). Before confirming, the system verifies a complete set of compatible physical units across `[pickup, return + inspection buffer]` against repair status, active loans, post-return inspection holds, and confirmed reservations, displays **`₹0 · Approved campus club`**, rechecks on submit, and saves the whole kit allocation together.
     - **Downstream schedule risk & spare reassignment on delayed returns:** Recording Leela’s `Sat 9:00 am` reported return on the open adapter slip preserves `Kabir Sen` as the original collector and `Fri 8:00 pm` as the original due time, links the note to `Desk book`, and computes the exact downstream schedule impact:
       > **“Saturday 9:05 am pickup at risk. Adapter expected at 9:00 am, ready no earlier than 9:15 am.”**
     - From that alert (and the unified **Counter Handover & Schedule Monitor** at the top of the desk), the worker can **reassign a compatible, available spare** (`AD-15`, or `AD-12` if Film Society took `AD-15`) after rechecking its full window—or flag the Saturday booking (`RQ-218`) for organizer follow-up if no spare is available—while keeping Friday’s loan slip open.
     - **Physical tag verification & post-return inspection hold on Saturday check-in:** At **`Saturday · 9:00 am`**, checking in the adapter Leela returns requires verifying its physical asset tag. A mismatched tag is rejected and leaves the loan open; a matching tag records the return at `Saturday · 9:00 am` and holds the returned adapter in **post-return inspection until `Sat 9:15 am`** so it cannot be issued to another pickup until the buffer elapses.

### Real-Counter Observation
> **Observation at a real counter:** *When told about a delayed return, can the outgoing worker identify the affected pickup and assign a valid spare before the next borrower arrives?*
>
> In the original product, the outgoing evening worker leaves a free-text note in `Desk book` without realizing Saturday’s `9:05 am` pickup is allocated to that same adapter; the collision is only discovered Saturday morning when the next borrower is already standing at the counter. With this upgrade, the moment the outgoing worker logs the `9:00 am` ETA on Friday evening, the system surfaces the `9:05 am` conflict caused by the `15-minute` inspection buffer and lets the worker reassign the spare unit (`AD-15` / `AD-12`) in one click before ending their shift.

---

## Exact Steps to Replay the Demo

1. **Start fresh (`Friday · 3:45 pm` — Pickup at the counter):**
   - Open [index.html](index.html) in your browser and click **Restart sample shift** in the bottom status bar.
   - Note the top **Counter Handover & Schedule Monitor** (one place showing *1. What came back*, *2. What is still out*, *3. Affected pickup / Upcoming pickups*, and *4. Next counter action*) and the `Requests` list distinguishing **Approved request (Unreserved)** (`RQ-214`, `RQ-217`) from **Confirmed reservation** (`RQ-218 · Demo fixture · Sat 9:05 am`, `RQ-209`).
2. **Confirm & check out Film Society’s complete kit (`RQ-214`):**
   - Click **Reserve / view** on **`RQ-214 · Film Society`** (*Courtyard screening*).
   - Verify the schedule window (**Planned pickup:** `Fri 3:45 pm`, **Planned event start:** `Fri 4:00 pm`, **Planned event end:** `Fri 7:00 pm`, **Return deadline:** `Fri 8:00 pm`, **Inspection buffer:** `15 min` → held until `Fri 8:15 pm`) and the pricing banner (**`₹0 · Approved campus club`**).
   - *(Optional check — Unit in repair & compatible substitute):* In **Slot 1: HDMI projector**, change the dropdown from `PR-04` to `PR-06 · Epson EB-X49 (Bin Workshop) — In repair`. Observe the blocking explanation and click **Use compatible substitute: PR-04 (BenQ MH550 · Bin A2)**.
   - *(Optional check — AD-15 vs. AD-12):* You can keep **`AD-12`** in **Slot 3: USB-C → HDMI adapter** or switch it to **`AD-15`**. The entire walkthrough dynamically builds warnings, spare offers, and tag checks from the actual slips and reservations.
   - Click **Confirm complete-kit reservation (3 units · ₹0)**, then click **Check out confirmed kit (3 unit slips)** (pre-filled with authorized collector **Kabir Sen** from Isha Rao’s linked Desk book message).
   - Verify three unit-level slips (`L-402`, `L-403`, `L-404`) are created with actual checkout time **`Friday · 3:45 pm`**.
3. **Partial return, delayed ETA & Saturday risk resolution (`Friday · 7:30 pm`):**
   - Click **Move to return time** in the yellow shift banner to advance the clock to **`Friday · 7:30 pm`**.
   - In **Loan register**, click **Record return** on **`L-402 · PR-04`** (projector) and **`L-403 · SP-02`** (speaker). Both record check-in time `Friday · 7:30 pm`, while **`L-404`** (adapter) stays open.
   - Click **Record Leela’s Sat 9:00 am ETA on L-404** in the top monitor (or click **Report delayed return / ETA** on `L-404` and submit).
   - Verify on `L-404`:
     - **Original collector** remains **`Kabir Sen`** and **Original due** remains **`Fri 8:00 pm`**.
     - **Reported ETA** shows **`Leela Das`** at **`Sat 9:00 am`**.
     - A linked entry is automatically added to **Desk book**.
     - The risk banner displays:
       **`Saturday 9:05 am pickup at risk. Adapter expected at 9:00 am, ready no earlier than 9:15 am.`**
   - **Test reassignment without an available spare:** On `L-404`’s risk banner, click **Simulate no spare (send AD-15 to repair)** (or toggle repair in `Inventory`). Verify the banner states no spare is available, identifies **`RQ-218 (Design Guild · Aarav Mehta)`** as the booking needing follow-up, and lets you click **Flag RQ-218 for organizer follow-up** while keeping `L-404` open. Click **Restore spare AD-15 from repair**.
   - **Test reassignment with an available spare:** Click **Reassign compatible spare AD-15 (Anker A8312 · Bin C4) to RQ-218** (or `AD-12` if Film Society took `AD-15`). Verify `RQ-218` is reassigned after rechecking its full `Sat 9:05 am – Sat 12:00 pm (+ 15m)` window, while Friday loan `L-404` remains open.
4. **Morning handover, tag verification & inspection hold (`Saturday · 9:00 am`):**
   - Click **Move to next morning** to advance the clock to **`Saturday · 9:00 am`**.
   - Review the **Counter Handover & Schedule Monitor** showing what came back Friday evening (`PR-04`, `SP-02`), what is still out (`L-404`), the protected Saturday `9:05 am` pickup (`RQ-218`), and the next action.
   - On **`L-404`**, click **Test wrong tag (AD-15)** (or select a non-matching tag and submit). Verify the mismatch error rejects check-in and **leaves `L-404` open**.
   - Click **Verify matching tag (AD-12)** (or `AD-15` if `AD-15` was checked out). Verify `L-404` closes with actual check-in time **`Saturday · 9:00 am`** and places the returned adapter into **`In inspection until Sat 9:15 am`**.
   - Open **Inventory** (or click **New issue slip** in **Loan register**) to verify the returned adapter is held in **`In inspection · Ready Sat 9:15 am`** and cannot be issued to another pickup until the 15-minute buffer elapses, while the reassigned spare is ready on shelf for `RQ-218`.
5. **Additional edge cases to verify:**
   - **Reload persistence:** Refresh the browser page (`F5` / `Ctrl+R`) at any step and verify state restores from `localStorage`.
   - **Conflicting inspection buffer & fixed vs. movable event time:** In `Requests`, open `RQ-217` (Photo Circle), add `Wireless microphone` (on active loan `L-401` until `Sat 10:00 am` + `15m` inspection = ready `Sat 10:15 am`), and verify the system only suggests moving the pickup to `Sat 10:15 am` when **“Organizer can move the event if no compatible unit is available in this window”** is checked.

---

## Existing Behavior vs. Demo Fixtures & Assumptions

| Category | Details |
| :--- | :--- |
| **Existing behavior preserved** | • One loan slip per physical unit (`L-401`, `L-402`, …) allowing partial kit returns.<br>• Original inventory assets (`PR-04`, `PR-06` in repair, `SP-02`, `SP-05`, `AD-12`, `AD-15`, `MI-09`, `CA-03`), shelf bins, requests (`RQ-214`, `RQ-209`, `RQ-217`), and Desk book messages.<br>• Three-phase sample shift clock (`Friday · 3:45 pm`, `Friday · 7:30 pm`, `Saturday · 9:00 am`), `localStorage` persistence, and offline vanilla HTML/CSS/JS execution. |
| **Demo fixtures added** | • **`RQ-218` (`Design Guild · Saturday morning studio critique`):** Clearly badged `Demo fixture · Sat 9:05 am pickup` (`Pickup Sat 9:05 am`, `Event Sat 9:30 am – 11:30 am`, `Return Sat 12:00 pm`), initially confirmed on the same adapter Film Society is due to return Friday evening.<br>• **Film Society (`RQ-214`) event timings:** `Fri 3:45 pm` pickup, `Fri 4:00 pm` screening start, `Fri 7:00 pm` demo event end, and `Fri 8:00 pm` return deadline.<br>• **Inspection buffer:** Configurable post-return inspection buffer defaulting to **`15 minutes`** for the demo. |
| **Policy assumptions** | • **`₹0 · Approved campus club`:** Displayed prior to reservation confirmation as a prototype pricing assumption that approved student club events carry no equipment rental fee. |
| **Single-desk prototype architecture** | • This repository is a single-desk browser prototype persisting state in `localStorage`.<br>• A multi-desk or organizer-facing shared deployment would require **server-side availability/conflict checks** and an **atomic database transaction (`SELECT ... FOR UPDATE` / serializable reservation write)** when confirming kits or reassigning spares to prevent concurrent double-booking across terminals. |

---

## Verification status

- **Automated (done):** A Node script loaded `index.html` + `app.js` into a small fake DOM and replayed the shift through the app's own click/change/submit handlers. All 14 checks passed: complete-kit confirmation, unit in repair, an overlapping reservation, a conflicting inspection buffer, an unavailable item type with and without a movable event, the partial return, the delayed ETA warning, reassignment with and without a spare, wrong and matching asset tags, the AD-15 variant, and state after reload.
- **Not yet done:** Replaying the shift by hand in a real browser. The fake DOM checks logic and generated markup only. It does not cover CSS rendering, layout, or real browser events. Before submitting, follow the replay steps above in Chrome or Edge.

---

## Run the app

Open `index.html` in a modern browser. The app includes its scripts, styles, and icons and can run offline.

To serve it over local HTTP, run this from the repository folder and visit `http://localhost:8000`.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Each browser stores its own sample shift locally when browser storage is available. **Restart sample shift** restores the fictional starting records.

## Source

- `index.html` contains the desk layout, candidate brief, and bundled icons.
- `app.js` contains the sample records and interactions.
- `styles.css` defines the desktop and mobile layouts.

Icon license notices are in [third-party/lucide-LICENSE.txt](third-party/lucide-LICENSE.txt).


## Submit your work

1. [Fork Campus Stores](https://github.com/virinchi-healthcare/campus-stores/fork) into your GitHub account. Complete the candidate brief and push your changes to your public fork. In your README, point reviewers to your work and explain the decision you made.
2. In your fork, open **Commits**, select the final commit you want reviewed, and copy the page URL. It should look like `https://github.com/YOUR-USERNAME/campus-stores/commit/COMMIT-SHA`.
3. [Submit your work through the Google Form](https://docs.google.com/forms/d/e/1FAIpQLScvzoh1R4WS-SkiwAVBQbMvniieJYSoOEfLMyVo5CyjOvYUgQ/viewform). Your **roll number**, **email ID**, and **final commit link from your public fork** are required. Enter your roll number and email ID in the form only.
