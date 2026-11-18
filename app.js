(() => {
  const storageKey = "campus-stores.shift.v1";
  const root = document.getElementById("campus-stores");
  const q = (selector) => root.querySelector(selector);

  const TIME_SLOTS = [
    "Fri 3:00 pm",
    "Fri 3:45 pm",
    "Fri 4:00 pm",
    "Fri 5:00 pm",
    "Fri 7:00 pm",
    "Fri 7:30 pm",
    "Fri 8:00 pm",
    "Fri 8:05 pm",
    "Fri 8:15 pm",
    "Fri 9:00 pm",
    "Sat 8:45 am",
    "Sat 9:00 am",
    "Sat 9:05 am",
    "Sat 9:15 am",
    "Sat 9:30 am",
    "Sat 10:00 am",
    "Sat 10:15 am",
    "Sat 11:00 am",
    "Sat 11:30 am",
    "Sat 12:00 pm",
    "Sat 12:30 pm",
    "Sat 2:00 pm",
  ];

  const assets = [
    { id: "PR-04", type: "HDMI projector", model: "BenQ MH550", bin: "A2" },
    {
      id: "PR-06",
      type: "HDMI projector",
      model: "Epson EB-X49",
      bin: "Workshop",
      repair: true,
    },
    { id: "SP-02", type: "Portable speaker", model: "JBL Eon One", bin: "B1" },
    { id: "SP-05", type: "Portable speaker", model: "Bose S1", bin: "B2" },
    {
      id: "AD-12",
      type: "USB-C → HDMI adapter",
      model: "Belkin AVC002",
      bin: "C4",
    },
    {
      id: "AD-15",
      type: "USB-C → HDMI adapter",
      model: "Anker A8312",
      bin: "C4",
    },
    { id: "MI-09", type: "Wireless microphone", model: "Shure BLX", bin: "B3" },
    { id: "CA-03", type: "Digital camera", model: "Sony A6400", bin: "D2" },
  ];

  const EQUIPMENT_TYPES = [
    "HDMI projector",
    "Portable speaker",
    "USB-C → HDMI adapter",
    "Wireless microphone",
    "Digital camera",
  ];

  const people = [
    "Isha Rao",
    "Kabir Sen",
    "Leela Das",
    "Aarav Mehta",
    "Tara Shah",
    "Dev Menon",
  ];

  const shifts = [
    {
      time: "Friday · 3:45 pm",
      title: "Pickup at the counter",
      text: "Kabir is here for the Film Society screening. The film starts at four. Can he leave with everything he needs?",
      next: "Move to return time",
    },
    {
      time: "Friday · 7:30 pm",
      title: "The kit comes back in pieces",
      text: "Kabir has brought back the projector and speaker. “Leela still has the adapter. She’ll drop it off tomorrow at nine.” Take the return and hand over to the morning shift.",
      next: "Move to next morning",
    },
    {
      time: "Saturday · 9:00 am",
      title: "Morning shift",
      text: "You’ve just taken over. Leela walks in with an adapter. Work out what was outstanding from the screening and close the loan for the right item.",
    },
  ];

  const pages = [
    ["Requests", "clipboard-list"],
    ["Inventory", "package"],
    ["Loan register", "book-open"],
    ["Desk book", "messages-square"],
  ];

  const initialRequests = () => [
    {
      id: "RQ-214",
      club: "Film Society",
      event: "Courtyard screening",
      owner: "Isha Rao",
      collector: "Kabir Sen",
      pickup: "Fri 3:45 pm",
      eventStart: "Fri 4:00 pm",
      eventEnd: "Fri 7:00 pm",
      due: "Fri 8:00 pm",
      items: ["HDMI projector", "Portable speaker", "USB-C → HDMI adapter"],
      note: "Playback is from a USB-C-only laptop. The host will collect at 4 pm.",
      status: "approved",
      allocated: [],
      draftUnits: ["PR-04", "SP-02", "AD-12"],
      canMoveEvent: false,
      fee: "₹0 · Approved campus club",
    },
    {
      id: "RQ-218",
      club: "Design Guild",
      event: "Saturday morning studio critique",
      owner: "Aarav Mehta",
      collector: "Aarav Mehta",
      pickup: "Sat 9:05 am",
      eventStart: "Sat 9:30 am",
      eventEnd: "Sat 11:30 am",
      due: "Sat 12:00 pm",
      items: ["USB-C → HDMI adapter"],
      note: "Demo fixture: Confirmed Saturday 9:05 am pickup initially allocated to the same adapter that Film Society is due to return Friday evening.",
      isDemoFixture: true,
      status: "confirmed",
      allocated: ["AD-12"],
      draftUnits: ["AD-12"],
      syncWithFilmSociety: true,
      reassignedFrom: "",
      reassignedTo: "",
      reassignedAt: "",
      followUpFlagged: false,
      followUpNote: "",
      canMoveEvent: false,
      fee: "₹0 · Approved campus club",
    },
    {
      id: "RQ-209",
      club: "Debate Union",
      event: "Finals rehearsal",
      owner: "Tara Shah",
      collector: "Tara Shah",
      pickup: "Fri 3:00 pm",
      eventStart: "Fri 5:00 pm",
      eventEnd: "Fri 9:00 pm",
      due: "Sat 10:00 am",
      items: ["Wireless microphone"],
      note: "Rehearsal runs into the evening.",
      status: "confirmed",
      allocated: ["MI-09"],
      draftUnits: ["MI-09"],
      canMoveEvent: false,
      fee: "₹0 · Approved campus club",
    },
    {
      id: "RQ-217",
      club: "Photo Circle",
      event: "Street portrait walk",
      owner: "Dev Menon",
      collector: "Dev Menon",
      pickup: "Sat 9:30 am",
      eventStart: "Sat 10:00 am",
      eventEnd: "Sat 11:30 am",
      due: "Sat 12:00 pm",
      items: ["Digital camera"],
      note: "Collection on Saturday morning.",
      status: "approved",
      allocated: [],
      draftUnits: ["CA-03"],
      canMoveEvent: false,
      fee: "₹0 · Approved campus club",
    },
  ];

  const original = () => ({
    version: 2,
    tab: "Requests",
    phase: 0,
    selected: "",
    filter: "All items",
    bufferMins: 15,
    repairIds: ["PR-06"],
    requests: initialRequests(),
    loans: [
      {
        num: 401,
        req: "RQ-209",
        asset: "MI-09",
        who: "Tara Shah",
        due: "Sat 10:00 am",
        checkedOutAt: "Friday · 3:00 pm",
        checkedInAt: "",
        returnedBy: "",
        verifiedTag: "",
        back: false,
        handover: null,
      },
    ],
    notes: [],
    editing: false,
    onlyOpen: true,
    etaFormLoan: 0,
    verifyLoanNum: 0,
    tagError: null,
    notice: "Sample shift · All records are fictional.",
  });

  let s = original();

  function toMins(str) {
    if (!str) return 0;
    const clean = String(str).trim();
    const isSat = /^sat/i.test(clean);
    const dayBase = isSat ? 1440 : 0;
    if (/noon/i.test(clean)) return dayBase + 720;
    const m = clean.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
    if (!m) return dayBase;
    let h = Number(m[1]);
    const mins = Number(m[2] || 0);
    const ap = m[3].toLowerCase();
    if (ap === "pm" && h !== 12) h += 12;
    if (ap === "am" && h === 12) h = 0;
    return dayBase + h * 60 + mins;
  }

  function fmtClock(mins) {
    const inDay = ((mins % 1440) + 1440) % 1440;
    let h = Math.floor(inDay / 60);
    const m = inDay % 60;
    const ap = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return h + ":" + String(m).padStart(2, "0") + " " + ap;
  }

  function fmtDayTime(mins) {
    const day = mins >= 1440 ? "Sat" : "Fri";
    return day + " " + fmtClock(mins);
  }

  function fmtLongDayTime(mins) {
    const day = mins >= 1440 ? "Saturday" : "Friday";
    return day + " " + fmtClock(mins);
  }

  function currentClockMins() {
    return toMins(shifts[s.phase].time);
  }

  const getAsset = (id) => assets.find((x) => x.id === id);
  const getReq = (id) => s.requests.find((x) => x.id === id);
  const isRepair = (id) => s.repairIds.includes(id);
  const out = (id) => s.loans.find((l) => l.asset === id && !l.back);

  function activeInspectionLoan(assetId) {
    const now = currentClockMins();
    return s.loans.find((l) => {
      if (l.asset !== assetId || !l.back || !l.checkedInAt) return false;
      const inMins = toMins(l.checkedInAt);
      return now >= inMins && now < inMins + s.bufferMins;
    });
  }

  function reqLoans(reqId) {
    return s.loans.filter((l) => l.req === reqId);
  }

  const esc = (x) =>
    String(x ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

  const opts = (list, selectedVal = "") =>
    list
      .map(
        ([v, t]) =>
          '<option value="' +
          esc(v) +
          '"' +
          (String(v) === String(selectedVal) ? " selected" : "") +
          ">" +
          esc(t) +
          "</option>",
      )
      .join("");

  const btn = (label, act, val = "", style = "") =>
    '<button type="button" data-action="' +
    act +
    '" data-val="' +
    esc(val) +
    '" class="' +
    style +
    '">' +
    esc(label) +
    "</button>";

  const head = (title, sub, control = "") =>
    '<div class="sectionhead"><div><h2>' +
    title +
    "</h2><small>" +
    sub +
    "</small></div>" +
    control +
    "</div>";

  const row = (label, sub, right) =>
    '<div class="row"><div><strong>' +
    esc(label) +
    "</strong><small>" +
    esc(sub) +
    "</small></div><div>" +
    right +
    "</div></div>";

  const badge = (t, tone = "") =>
    '<span class="tag' + (tone ? " " + tone : "") + '">' + esc(t) + "</span>";

  const icon = (name) =>
    '<svg aria-hidden="true" class="store-icon"><use href="#icon-' +
    name +
    '"></use></svg>';

  const mono = (x) => '<span class="mono">' + esc(x) + "</span>";

  const caps = (x) => '<span class="caps">' + esc(x) + "</span>";

  // Percent position of `mins` on a [lo, hi] scale, clamped to 0–100.
  const pct = (mins, lo, hi) =>
    Math.max(0, Math.min(100, ((mins - lo) / Math.max(1, hi - lo)) * 100));

  function fmtDuration(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return ((h ? h + "h " : "") + (m || !h ? m + "m" : "")).trim();
  }

  function shortItemName(type) {
    if (/adapter/i.test(type)) return "Adapter";
    if (/projector/i.test(type)) return "Projector";
    if (/speaker/i.test(type)) return "Speaker";
    if (/microphone/i.test(type)) return "Microphone";
    if (/camera/i.test(type)) return "Camera";
    return type;
  }

  // Sync the demo Saturday 9:05 am reservation's initial adapter with Film Society's adapter choice
  // before any manual reassignment or edit occurs on RQ-218, ensuring the demo works seamlessly
  // whether Film Society chooses AD-12 or AD-15.
  function syncDemoFixtureWithFilmSociety(adapterId) {
    const rq218 = getReq("RQ-218");
    if (
      rq218 &&
      rq218.syncWithFilmSociety &&
      (adapterId === "AD-12" || adapterId === "AD-15")
    ) {
      rq218.allocated = [adapterId];
      rq218.draftUnits = [adapterId];
    }
  }

  // Check whether a physical unit is available across [startMins, endMins + s.bufferMins].
  function checkUnitAvailability(assetId, startMins, endMins, options = {}) {
    const unit = getAsset(assetId);
    if (!unit) {
      return {
        ok: false,
        kind: "missing",
        reason: "No unit selected.",
        untilMins: Infinity,
      };
    }
    const reqEndWithBuffer = endMins + s.bufferMins;

    // 1. Check repair status
    if (isRepair(assetId)) {
      return {
        ok: false,
        kind: "repair",
        reason:
          unit.id +
          " (" +
          unit.model +
          ") is in repair at " +
          unit.bin +
          " and cannot be allocated.",
        untilMins: Infinity,
      };
    }

    // 2. Check active open loans
    const activeLoan = out(assetId);
    if (activeLoan && activeLoan.req !== options.ignoreReqId) {
      const lStart = toMins(activeLoan.checkedOutAt || "Fri 3:00 pm");
      const hasEta =
        activeLoan.handover && activeLoan.handover.reportedEta
          ? toMins(activeLoan.handover.reportedEta)
          : null;
      const expectedReturn =
        hasEta !== null
          ? hasEta
          : Math.max(toMins(activeLoan.due), currentClockMins());
      const lReady = expectedReturn + s.bufferMins;

      if (lStart < reqEndWithBuffer && lReady > startMins) {
        if (expectedReturn <= startMins && lReady > startMins) {
          return {
            ok: false,
            kind: "inspection",
            reason:
              "Conflicting inspection buffer: " +
              unit.id +
              " (" +
              unit.model +
              ") is expected back on slip L-" +
              activeLoan.num +
              " at " +
              fmtDayTime(expectedReturn) +
              " and needs " +
              s.bufferMins +
              " min inspection (ready no earlier than " +
              fmtDayTime(lReady) +
              ").",
            untilMins: lReady,
            loan: activeLoan,
          };
        }
        return {
          ok: false,
          kind: "loan",
          reason:
            unit.id +
            " (" +
            unit.model +
            ") is on active loan L-" +
            activeLoan.num +
            " (" +
            activeLoan.req +
            " · " +
            activeLoan.who +
            ") until " +
            fmtDayTime(expectedReturn) +
            " + " +
            s.bufferMins +
            "m inspection (ready " +
            fmtDayTime(lReady) +
            ").",
          untilMins: lReady,
          loan: activeLoan,
        };
      }
    }

    // 3. Check recently returned loans still in post-return inspection buffer
    for (const l of s.loans) {
      if (l.asset !== assetId || !l.back || !l.checkedInAt) continue;
      const inMins = toMins(l.checkedInAt);
      const readyMins = inMins + s.bufferMins;
      if (inMins < reqEndWithBuffer && readyMins > startMins) {
        return {
          ok: false,
          kind: "inspection",
          reason:
            "Conflicting inspection buffer: " +
            unit.id +
            " (" +
            unit.model +
            ") was checked in at " +
            fmtDayTime(inMins) +
            " (slip L-" +
            l.num +
            ") and is held in post-return inspection for " +
            s.bufferMins +
            " mins (ready no earlier than " +
            fmtDayTime(readyMins) +
            ").",
          untilMins: readyMins,
          loan: l,
        };
      }
    }

    // 4. Check existing confirmed reservations (that have not already completed return)
    for (const r of s.requests) {
      if (r.id === options.ignoreReqId) continue;
      if (r.status !== "confirmed") continue;
      if (!(r.allocated || []).includes(assetId)) continue;
      // If a reservation's unit was already issued and returned, its actual loan handled it above
      const existingLoansForUnit = s.loans.filter(
        (l) => l.req === r.id && l.asset === assetId,
      );
      if (
        existingLoansForUnit.length > 0 &&
        existingLoansForUnit.every((l) => l.back)
      ) {
        continue;
      }

      const rStart = toMins(r.pickup);
      const rDue = toMins(r.due);
      const rReady = rDue + s.bufferMins;

      if (rStart < reqEndWithBuffer && rReady > startMins) {
        if (rDue <= startMins && rReady > startMins) {
          return {
            ok: false,
            kind: "inspection",
            reason:
              "Conflicting inspection buffer: " +
              unit.id +
              " (" +
              unit.model +
              ") is due back from " +
              r.id +
              " (" +
              r.club +
              ") at " +
              fmtDayTime(rDue) +
              " and needs " +
              s.bufferMins +
              " min inspection (ready no earlier than " +
              fmtDayTime(rReady) +
              ").",
            untilMins: rReady,
            req: r,
          };
        }
        if (endMins <= rStart && reqEndWithBuffer > rStart) {
          return {
            ok: false,
            kind: "inspection",
            reason:
              "Conflicting inspection buffer: Return at " +
              fmtDayTime(endMins) +
              " + " +
              s.bufferMins +
              " min inspection (ready " +
              fmtDayTime(reqEndWithBuffer) +
              ") overlaps confirmed pickup " +
              r.id +
              " (" +
              r.club +
              " at " +
              fmtDayTime(rStart) +
              ").",
            untilMins: rReady,
            req: r,
          };
        }
        return {
          ok: false,
          kind: "reservation",
          reason:
            "Overlapping confirmed reservation: " +
            unit.id +
            " (" +
            unit.model +
            ") is reserved for " +
            r.id +
            " (" +
            r.club +
            " · " +
            r.event +
            ", " +
            r.pickup +
            " – " +
            r.due +
            " + " +
            s.bufferMins +
            "m inspection).",
          untilMins: rReady,
          req: r,
        };
      }
    }

    return {
      ok: true,
      kind: "ok",
      reason:
        "Available for " +
        fmtDayTime(startMins) +
        " – " +
        fmtDayTime(endMins) +
        " (+ " +
        s.bufferMins +
        "m inspection until " +
        fmtDayTime(reqEndWithBuffer) +
        ").",
      untilMins: startMins,
    };
  }

  // Evaluate a complete kit for a request across [pickup, due + bufferMins]
  function evaluateKit(r) {
    const startMins = toMins(r.pickup);
    const evStartMins = toMins(r.eventStart);
    const evEndMins = toMins(r.eventEnd);
    const endMins = toMins(r.due);

    const scheduleErrors = [];
    if (startMins >= endMins) {
      scheduleErrors.push("Pickup time must be earlier than return deadline.");
    }
    if (evStartMins < startMins) {
      scheduleErrors.push("Event start cannot be earlier than pickup time.");
    }
    if (evEndMins < evStartMins) {
      scheduleErrors.push("Event end must be after event start.");
    }
    if (endMins < evEndMins) {
      scheduleErrors.push("Return deadline must be at or after event end.");
    }

    if (!Array.isArray(r.draftUnits)) r.draftUnits = [];
    const usedIds = new Set();

    const slots = r.items.map((itemType, idx) => {
      const candidatesOfType = assets.filter((a) => a.type === itemType);
      let chosenId = r.draftUnits[idx];
      if (
        !chosenId ||
        !candidatesOfType.some((a) => a.id === chosenId)
      ) {
        const firstAvail = candidatesOfType.find(
          (a) =>
            !usedIds.has(a.id) &&
            checkUnitAvailability(a.id, startMins, endMins, {
              ignoreReqId: r.id,
            }).ok,
        );
        chosenId = firstAvail
          ? firstAvail.id
          : candidatesOfType[0]
            ? candidatesOfType[0].id
            : "";
        r.draftUnits[idx] = chosenId;
      }

      let check;
      if (usedIds.has(chosenId)) {
        check = {
          ok: false,
          kind: "duplicate",
          reason:
            chosenId + " is already selected for another slot in this kit.",
          untilMins: Infinity,
        };
      } else {
        check = checkUnitAvailability(chosenId, startMins, endMins, {
          ignoreReqId: r.id,
        });
      }
      if (check.ok) usedIds.add(chosenId);

      const substitutes = candidatesOfType.filter(
        (a) =>
          a.id !== chosenId &&
          !usedIds.has(a.id) &&
          checkUnitAvailability(a.id, startMins, endMins, {
            ignoreReqId: r.id,
          }).ok,
      );

      // If no substitute is available, determine earliest time any unit of this type frees up
      let earliestReadyMins = Infinity;
      const allTypeReasons = [];
      for (const a of candidatesOfType) {
        const c = checkUnitAvailability(a.id, startMins, endMins, {
          ignoreReqId: r.id,
        });
        if (!c.ok) {
          allTypeReasons.push(c.reason);
          if (c.untilMins < earliestReadyMins) earliestReadyMins = c.untilMins;
        }
      }

      let suggestedWindow = null;
      if (!check.ok && substitutes.length === 0 && earliestReadyMins < Infinity) {
        const duration = Math.max(60, endMins - startMins);
        const evOffset = Math.max(15, evStartMins - startMins);
        const evLen = Math.max(60, evEndMins - evStartMins);
        const newPickup = earliestReadyMins;
        const newEvStart = newPickup + evOffset;
        const newEvEnd = newEvStart + evLen;
        const newDue = Math.max(newPickup + duration, newEvEnd + 30);
        suggestedWindow = {
          pickup: fmtDayTime(newPickup),
          eventStart: fmtDayTime(newEvStart),
          eventEnd: fmtDayTime(newEvEnd),
          due: fmtDayTime(newDue),
        };
      }

      return {
        idx,
        itemType,
        chosenId,
        unit: getAsset(chosenId),
        candidatesOfType,
        check,
        substitutes,
        allTypeReasons,
        suggestedWindow,
      };
    });

    const allSlotsOk =
      scheduleErrors.length === 0 && slots.every((sl) => sl.check.ok);

    return {
      startMins,
      evStartMins,
      evEndMins,
      endMins,
      scheduleErrors,
      slots,
      allSlotsOk,
    };
  }

  // Detect any confirmed upcoming reservation put at risk by an open loan slip's delayed return / overdue status
  // or a recently returned unit still held in post-return inspection past the next pickup time.
  function computeAtRiskList() {
    const risks = [];
    const now = currentClockMins();

    for (const l of s.loans) {
      const unit = getAsset(l.asset);
      if (!unit) continue;

      let etaMins = 0;
      if (!l.back) {
        const hasReportedEta = Boolean(l.handover && l.handover.reportedEta);
        const dueMins = toMins(l.due);
        const isOverdueNow = now > dueMins;
        if (!hasReportedEta && !isOverdueNow) continue;
        etaMins = hasReportedEta
          ? toMins(l.handover.reportedEta)
          : Math.max(dueMins, now);
      } else if (l.checkedInAt) {
        etaMins = toMins(l.checkedInAt);
      } else {
        continue;
      }

      const readyMins = etaMins + s.bufferMins;

      for (const r of s.requests) {
        if (r.status !== "confirmed") continue;
        // Skip reservations already checked out
        if (reqLoans(r.id).length > 0) continue;
        if (!(r.allocated || []).includes(l.asset)) continue;

        const pickupMins = toMins(r.pickup);
        const rDueMins = toMins(r.due);

        if (readyMins > pickupMins && etaMins < rDueMins + s.bufferMins) {
          const itemLabel = shortItemName(unit.type);
          const headline =
            fmtLongDayTime(pickupMins) +
            " pickup at risk. " +
            itemLabel +
            " expected at " +
            fmtClock(etaMins) +
            ", ready no earlier than " +
            fmtClock(readyMins) +
            ".";

          // Look for compatible available spares for r's full window [r.pickup, r.due + buffer]
          const candidates = assets.filter(
            (a) => a.type === unit.type && a.id !== l.asset,
          );
          const spares = [];
          const blockedSpares = [];
          for (const cand of candidates) {
            const c = checkUnitAvailability(cand.id, pickupMins, rDueMins, {
              ignoreReqId: r.id,
            });
            if (c.ok) spares.push(cand);
            else blockedSpares.push({ unit: cand, reason: c.reason });
          }

          risks.push({
            loan: l,
            unit,
            req: r,
            etaMins,
            readyMins,
            pickupMins,
            headline,
            spares,
            blockedSpares,
          });
        }
      }
    }
    return risks;
  }

  // Render the persistent single-place Counter Handover & Schedule Risk Board
  function renderOpsBar() {
    const fsLoans = reqLoans("RQ-214");
    const returnedSlips = s.loans.filter((l) => l.back);
    const openSlips = s.loans.filter((l) => !l.back);
    const risks = computeAtRiskList();
    const rq218 = getReq("RQ-218");

    let html =
      '<div class="opshead"><div><strong>Counter Handover &amp; Schedule Monitor</strong> ' +
      badge("Inspection buffer: " + s.bufferMins + " min", "info") +
      " " +
      badge("Club policy: ₹0 · Approved campus club", "good") +
      '</div><div class="inline-actions"><label class="checkline"><span>Inspection buffer</span><select data-buffer>' +
      opts(
        [
          [0, "0 min"],
          [15, "15 min (demo default)"],
          [30, "30 min"],
          [60, "60 min"],
        ],
        s.bufferMins,
      ) +
      "</select></label></div></div>";

    html += '<div class="opsgrid">';

    // Column 1: What came back
    html += '<div class="opscard"><strong>1. What came back</strong>';
    if (!returnedSlips.length) {
      html += "<small>No equipment checked in during this shift yet.</small>";
    } else {
      for (const l of returnedSlips) {
        const u = getAsset(l.asset);
        const inInspection = activeInspectionLoan(l.asset);
        const readyTime = l.checkedInAt
          ? fmtDayTime(toMins(l.checkedInAt) + s.bufferMins)
          : "";
        html +=
          "<small><b>" +
          esc(l.asset) +
          " · " +
          esc(u ? u.type : "") +
          "</b> (L-" +
          l.num +
          ") · Checked in " +
          esc(l.checkedInAt || "earlier") +
          (inInspection
            ? " · " + badge("In inspection until " + readyTime, "memo")
            : " · Bin " + esc(u ? u.bin : "")) +
          "</small>";
      }
    }
    html += "</div>";

    // Column 2: What is still out
    html += '<div class="opscard"><strong>2. What is still out</strong>';
    if (!openSlips.length) {
      html += "<small>All issued loan slips are checked in.</small>";
    } else {
      for (const l of openSlips) {
        const u = getAsset(l.asset);
        html +=
          "<small><b>L-" +
          l.num +
          " · " +
          esc(l.asset) +
          " (" +
          esc(u ? u.model : "") +
          ")</b> · " +
          esc(l.req) +
          " · Collector: <b>" +
          esc(l.who) +
          "</b> · Due " +
          esc(l.due) +
          (l.handover
            ? "<br/><span>Reported ETA: <b>" +
              esc(l.handover.returningWho) +
              " at " +
              esc(l.handover.reportedEta) +
              "</b></span>"
            : "") +
          "</small>";
      }
    }
    html += "</div>";

    // Column 3: Which pickup is affected
    if (risks.length > 0) {
      const rk = risks[0];
      html +=
        '<div class="opscard risk"><strong>3. Affected pickup</strong>' +
        "<b>" +
        esc(rk.headline) +
        "</b><small>Impacts <b>" +
        esc(rk.req.id) +
        " · " +
        esc(rk.req.club) +
        "</b> (" +
        esc(rk.req.event) +
        " · Pickup " +
        esc(rk.req.pickup) +
        ") allocated to <b>" +
        esc(rk.loan.asset) +
        "</b>.</small></div>";
    } else if (rq218 && rq218.reassignedTo) {
      const sp = getAsset(rq218.reassignedTo);
      html +=
        '<div class="opscard okcard"><strong>3. Affected pickup resolved</strong>' +
        "<b>Saturday 9:05 am pickup (" +
        esc(rq218.id) +
        " · " +
        esc(rq218.club) +
        ") protected</b><small>Reassigned from late unit <b>" +
        esc(rq218.reassignedFrom) +
        "</b> to compatible spare <b>" +
        esc(rq218.reassignedTo) +
        " (" +
        esc(sp ? sp.model : "") +
        " · Bin " +
        esc(sp ? sp.bin : "") +
        ')</b>.</small><div class="inline-actions">' +
        btn("Undo reassignment", "undo-reassign", rq218.id) +
        "</div></div>";
    } else if (rq218 && rq218.followUpFlagged) {
      html +=
        '<div class="opscard risk"><strong>3. Affected pickup (Follow-up required)</strong>' +
        "<b>" +
        esc(rq218.id) +
        " · " +
        esc(rq218.club) +
        " (Sat 9:05 am)</b><small>" +
        esc(rq218.followUpNote) +
        "</small></div>";
    } else {
      html +=
        '<div class="opscard"><strong>3. Upcoming pickups</strong><small>' +
        (rq218
          ? esc(rq218.id) +
            " · " +
            esc(rq218.club) +
            " (" +
            esc(rq218.pickup) +
            ") allocated to <b>" +
            esc((rq218.allocated || [])[0] || "AD-12") +
            "</b> — On schedule."
          : "No upcoming reservation conflicts detected.") +
        "</small></div>";
    }

    // Column 4: Next action
    html += '<div class="opscard"><strong>4. Next counter action</strong>';
    if (s.phase === 0) {
      const rq214 = getReq("RQ-214");
      if (rq214 && rq214.status !== "confirmed") {
        html +=
          "<small>Confirm Film Society’s complete kit reservation (RQ-214) for Fri 3:45 pm – 8:00 pm, then issue the 3 unit slips to Kabir Sen.</small>" +
          '<div class="inline-actions">' +
          btn("Open RQ-214 (Film Society)", "open-req", "RQ-214", "primary") +
          "</div>";
      } else if (fsLoans.length < 3) {
        html +=
          "<small>RQ-214 reservation confirmed (" +
          esc((rq214.allocated || []).join(", ")) +
          "). Check out the kit to Kabir Sen to create one slip per physical unit.</small>" +
          '<div class="inline-actions">' +
          btn("Check out RQ-214 kit to Kabir Sen", "checkout-kit", "RQ-214", "primary") +
          "</div>";
      } else {
        html +=
          "<small>All 3 Film Society units issued on slips " +
          fsLoans.map((l) => "L-" + l.num).join(", ") +
          ". Advance the shift clock to Friday 7:30 pm return time.</small>";
      }
    } else if (s.phase === 1) {
      const openFs = fsLoans.filter((l) => !l.back);
      const adapterLoan = fsLoans.find((l) => {
        const u = getAsset(l.asset);
        return u && /adapter/i.test(u.type);
      });
      if (openFs.length > 1) {
        html +=
          "<small>Check in the returned projector and speaker from Kabir Sen, while leaving the outstanding adapter slip open.</small>" +
          '<div class="inline-actions">' +
          btn("Go to Loan register", "tab", "Loan register", "primary") +
          "</div>";
      } else if (adapterLoan && !adapterLoan.back && !adapterLoan.handover) {
        html +=
          "<small>Projector and speaker checked in. Record Kabir’s report that Leela Das will return adapter <b>" +
          esc(adapterLoan.asset) +
          "</b> Saturday at 9:00 am.</small>" +
          '<div class="inline-actions">' +
          btn(
            "Record Leela’s Sat 9:00 am ETA on L-" + adapterLoan.num,
            "quick-eta",
            String(adapterLoan.num),
            "primary",
          ) +
          "</div>";
      } else if (risks.length > 0) {
        const rk = risks[0];
        if (rk.spares.length > 0) {
          const sp = rk.spares[0];
          html +=
            "<small>Resolve the Saturday 9:05 am conflict by reassigning compatible spare <b>" +
            esc(sp.id) +
            " (" +
            esc(sp.model) +
            ")</b> while keeping L-" +
            rk.loan.num +
            " open.</small>" +
            '<div class="inline-actions">' +
            btn(
              "Reassign spare " + sp.id + " to " + rk.req.id,
              "reassign-spare",
              rk.req.id + ":" + rk.loan.asset + ":" + sp.id,
              "primary",
            ) +
            "</div>";
        } else {
          html +=
            "<small>No compatible spare adapter available (" +
            esc(
              rk.blockedSpares.map((b) => b.reason).join(" ") ||
                "all spares unavailable",
            ) +
            "). Flag <b>" +
            esc(rk.req.id) +
            " (" +
            esc(rk.req.club) +
            ")</b> for organizer follow-up.</small>" +
            '<div class="inline-actions">' +
            btn(
              "Flag " + rk.req.id + " for follow-up",
              "flag-followup",
              rk.req.id + ":" + rk.loan.num,
              "primary",
            ) +
            "</div>";
        }
      } else {
        html +=
          "<small>Handover logged and Saturday 9:05 am pickup addressed. Advance clock to Saturday 9:00 am morning shift.</small>";
      }
    } else if (s.phase === 2) {
      const openAdapter = s.loans.find((l) => {
        if (l.back) return false;
        const u = getAsset(l.asset);
        return (l.req === "RQ-214") || (u && /adapter/i.test(u.type));
      });
      if (openAdapter) {
        html +=
          "<small>Leela Das is at the counter. Verify the asset tag on the adapter she brings against slip <b>L-" +
          openAdapter.num +
          " (" +
          esc(openAdapter.asset) +
          ")</b> before closing the loan.</small>" +
          '<div class="inline-actions">' +
          btn(
            "Verify tag & check in L-" + openAdapter.num,
            "open-verify",
            String(openAdapter.num),
            "primary",
          ) +
          "</div>";
      } else {
        html +=
          "<small>Leela’s adapter is checked in and held in post-return inspection for " +
          s.bufferMins +
          " mins (until Sat 9:15 am). Saturday 9:05 am pickup (" +
          esc(rq218 ? rq218.id : "RQ-218") +
          ") is ready on " +
          esc(rq218 ? (rq218.allocated || [])[0] : "") +
          ".</small>";
      }
    }
    html += "</div></div>";

    return html;
  }

  // ---------------------------------------------------------------------------
  // Stitch-derived components. Everything below renders from live state only.
  // ---------------------------------------------------------------------------

  const telRow = (label, n, tone) =>
    '<div class="telrow"><span>' +
    esc(label) +
    '</span><b class="mono ' +
    tone +
    '">' +
    n +
    "</b></div>";

  function renderNav() {
    const now = currentClockMins();
    const openLoans = s.loans.filter((l) => !l.back);
    const toReserve = s.requests.filter((r) => r.status !== "confirmed").length;
    const ready = assets.filter(
      (a) => !isRepair(a.id) && !out(a.id) && !activeInspectionLoan(a.id),
    ).length;
    const deskEntries = 2 + (s.phase >= 1 ? 1 : 0) + s.notes.length;
    const counts = {
      Requests: [toReserve ? String(toReserve) : "", "warn", "approved, not yet reserved"],
      Inventory: [ready + "/" + assets.length, "", "units ready on shelf"],
      "Loan register": [openLoans.length + " open", "ok", "open loan slips"],
      "Desk book": [String(deskEntries), "", "desk book entries"],
    };
    const overdue = openLoans.filter((l) => now > toMins(l.due)).length;
    const returned = s.loans.filter((l) => l.back).length;
    const atRisk = computeAtRiskList().length;

    let html =
      '<div class="navgroup"><span class="caps navcaption">Desk records</span>';
    html += pages
      .map(([n, ic]) => {
        const [c, tone, title] = counts[n] || ["", "", ""];
        return (
          '<button type="button" data-action="tab" data-val="' +
          n +
          '" aria-pressed="' +
          (s.tab === n) +
          '">' +
          icon(ic) +
          '<span class="navlabel">' +
          n +
          "</span>" +
          (c
            ? '<span class="navcount ' +
              tone +
              '" title="' +
              esc(title) +
              '">' +
              esc(c) +
              "</span>"
            : "") +
          "</button>"
        );
      })
      .join("");
    html += "</div>";
    html +=
      '<div class="telemetry"><div class="telemetryhead">' +
      caps("Shift telemetry") +
      "</div>" +
      telRow("Active loans", openLoans.length, "") +
      telRow("Checked in", returned, "ok") +
      telRow("Overdue", overdue, overdue ? "bad" : "") +
      telRow("Pickups at risk", atRisk, atRisk ? "warn" : "") +
      "</div>";
    return html;
  }

  function bookingStrip(r) {
    const p = toMins(r.pickup);
    const es = toMins(r.eventStart);
    const ee = toMins(r.eventEnd);
    const d = toMins(r.due);
    const rd = d + s.bufferMins;
    const day = (m) => (m >= 1440 ? "Sat" : "Fri");
    const stage = (n, tag, time, title, sub, tone) =>
      '<div class="stage ' +
      tone +
      '"><div class="stagehead">' +
      caps("Stage 0" + n) +
      '<span class="stagetag">' +
      esc(tag) +
      '</span></div><div class="stagetime mono">' +
      esc(time) +
      "</div><b>" +
      esc(title) +
      "</b><small>" +
      esc(sub) +
      "</small></div>";
    return (
      '<div class="strip"><div class="striphead">' +
      icon("calendar") +
      "<b>Booking window</b>" +
      '<span class="chip mono">' +
      esc(fmtDuration(Math.max(0, rd - p))) +
      " incl. inspection</span></div><div class=\"stages\">" +
      stage(1, day(p), fmtClock(p), "Pickup", "Checkout to " + (r.collector || r.owner), "pickup") +
      stage(2, day(es), fmtClock(es) + " – " + fmtClock(ee), "Event", r.event, "event") +
      stage(3, day(d), fmtClock(d), "Return due", "Back at the desk", "due") +
      stage(4, "+" + s.bufferMins + " min", fmtClock(rd), "Ready again", "After inspection", "ready") +
      "</div></div>"
    );
  }

  function conflictCard(rk) {
    const r = rk.req;
    const l = rk.loan;
    const u = rk.unit;
    const sp = rk.spares[0];
    const via = l.back
      ? "checked in " + (l.checkedInAt || "")
      : "via " + (l.handover ? l.handover.returningWho : l.who);
    const gap = rk.readyMins - rk.pickupMins;
    const lo = Math.min(rk.etaMins, rk.pickupMins) - 10;
    const hi = Math.max(rk.readyMins, rk.pickupMins) + 15;
    const at = (m) => pct(m, lo, hi).toFixed(1);
    const mark = (m, label, tone) =>
      '<span class="tlmark ' +
      tone +
      '" style="left:' +
      at(m) +
      '%"><i></i><small class="mono">' +
      esc(fmtClock(m)) +
      " · " +
      esc(label) +
      "</small></span>";
    const box = (label, time, sub, tone) =>
      '<div class="tbox ' +
      tone +
      '">' +
      caps(label) +
      '<span class="tboxtime mono">' +
      esc(fmtClock(time)) +
      "</span><small>" +
      esc(sub) +
      "</small></div>";

    const spareUnit = assets.find((a) => a.type === u.type && a.id !== l.asset);
    const demoToggle = spareUnit
      ? btn(
          isRepair(spareUnit.id)
            ? "Restore spare " + spareUnit.id + " from repair"
            : "Simulate no spare (send " + spareUnit.id + " to repair)",
          "toggle-repair",
          spareUnit.id,
          "ghost",
        )
      : "";

    let action;
    if (sp) {
      action =
        '<div class="proposal"><div class="proposalhead">' +
        caps("Proposed unit") +
        badge("Same type", "good") +
        '</div><div class="unitline">' +
        icon("swap") +
        "<div><b>" +
        esc(sp.id + " · Compatible spare") +
        "</b><small>" +
        esc(sp.type + " · " + sp.model) +
        '</small></div></div><div class="factgrid"><div>' +
        caps("Shelf") +
        '<b class="mono">Bin ' +
        esc(sp.bin) +
        "</b></div><div>" +
        caps("Window check") +
        '<b class="oktxt">Clear</b></div></div><p class="qualified">' +
        icon("check") +
        "<span>Free for " +
        esc(r.pickup + " – " + r.due) +
        " plus " +
        s.bufferMins +
        " min inspection, rechecked against loans, repairs and reservations.</span></p>" +
        btn(
          "Reassign compatible spare " +
            sp.id +
            " (" +
            sp.model +
            " · Bin " +
            sp.bin +
            ") to " +
            r.id,
          "reassign-spare",
          r.id + ":" + l.asset + ":" + sp.id,
          "primary big",
        ) +
        "</div>";
    } else {
      action =
        '<div class="proposal none"><div class="proposalhead">' +
        caps("No compatible spare") +
        badge("Follow-up", "bad") +
        "</div><p><b>No spare available:</b> " +
        esc(
          rk.blockedSpares.map((b) => b.reason).join(" ") ||
            "All compatible units are busy or in repair.",
        ) +
        "</p><p>Booking needing follow-up: <b>" +
        esc(r.id) +
        " (" +
        esc(r.club) +
        " · " +
        esc(r.owner) +
        ")</b></p>" +
        (r.followUpFlagged
          ? badge("Flagged for organizer follow-up", "warn")
          : btn(
              "Flag " + r.id + " for organizer follow-up",
              "flag-followup",
              r.id + ":" + l.num,
              "danger big",
            )) +
        "</div>";
    }

    return (
      '<div class="conflict"><div class="conflicthead"><div class="conflicticon">' +
      icon("alert") +
      '</div><div class="conflicttitles"><div class="conflictchips">' +
      '<span class="tag solidwarn">Conflict detected</span>' +
      caps("Turnaround gap: " + gap + " min") +
      '</div><strong class="conflict-title">' +
      esc(rk.headline) +
      "</strong><small>Reservation " +
      mono(r.id) +
      " · " +
      esc(r.club + " · " + r.event + " (" + r.owner + ")") +
      '</small></div></div><div class="conflictgrid"><div class="conflictwhy">' +
      caps("1. Which pickup is affected?") +
      '<div class="affected">' +
      icon("calendar") +
      "<div><b>" +
      esc(r.id + " · " + r.club + " (" + fmtClock(rk.pickupMins) + " pickup)") +
      "</b><small>Allocated to " +
      mono(l.asset) +
      " · " +
      esc(u.model) +
      "</small></div></div>" +
      caps("2. Why? Timeline collision") +
      '<div class="tboxes">' +
      box("Expected return", rk.etaMins, l.asset + " " + via, "") +
      box("Earliest ready", rk.readyMins, "+" + s.bufferMins + " min inspection", "info") +
      box("Scheduled pickup", rk.pickupMins, r.id + " · " + r.owner, "hot") +
      '</div><p class="gapline">' +
      icon("clock") +
      "<span>The " +
      esc(shortItemName(u.type).toLowerCase()) +
      " is expected to be ready " +
      gap +
      " minute" +
      (gap === 1 ? "" : "s") +
      " after pickup.</span></p>" +
      '<div class="timeline" role="img" aria-label="' +
      esc(
        "Return " +
          fmtClock(rk.etaMins) +
          ", pickup " +
          fmtClock(rk.pickupMins) +
          ", ready " +
          fmtClock(rk.readyMins),
      ) +
      '"><div class="tltrack"><span class="tlseg base" style="left:0;width:' +
      at(rk.pickupMins) +
      '%"></span><span class="tlseg gap" style="left:' +
      at(rk.pickupMins) +
      "%;width:" +
      (at(rk.readyMins) - at(rk.pickupMins)).toFixed(1) +
      '%"></span><span class="tlseg ready" style="left:' +
      at(rk.readyMins) +
      '%;right:0"></span></div>' +
      mark(rk.etaMins, "Return", "ret below") +
      mark(rk.pickupMins, "Pickup", "pick above") +
      mark(rk.readyMins, "Ready", "rdy below") +
      '</div></div><div class="conflictfix">' +
      caps("3. What can I do about it?") +
      action +
      "</div></div>" +
      '<div class="conflictfoot"><small>Friday loan ' +
      mono("L-" + l.num) +
      " stays open either way.</small>" +
      demoToggle +
      "</div></div>"
    );
  }

  function kitProgress(r) {
    const loans = reqLoans(r.id);
    if (loans.length < 2) return "";
    const back = loans.filter((l) => l.back).length;
    const outLoans = loans.filter((l) => !l.back);
    const p = Math.round((back / loans.length) * 100);
    return (
      '<div class="kitprogress' +
      (outLoans.length ? "" : " done") +
      '"><div class="kpicon">' +
      icon("package") +
      '</div><div class="kpbody"><div class="kptitle"><b>' +
      back +
      " of " +
      loans.length +
      " units checked in</b>" +
      '<span class="chip mono">' +
      esc(r.id + " · " + r.club) +
      "</span></div><small>" +
      (outLoans.length
        ? esc(
            outLoans.length +
              " still out: " +
              outLoans.map((l) => l.asset + " (L-" + l.num + ")").join(", "),
          )
        : "Whole kit back at the desk.") +
      '</small></div><div class="kpbar"><div class="kplabels"><small class="mono oktxt">' +
      back +
      " restocked</small>" +
      (outLoans.length
        ? '<small class="mono badtxt">' + outLoans.length + " outstanding</small>"
        : "") +
      '</div><div class="bar"><span style="width:' +
      p +
      '%"></span></div></div></div>'
    );
  }

  function inspectBar(l) {
    const inM = toMins(l.checkedInAt);
    const rdy = inM + s.bufferMins;
    const now = currentClockMins();
    const p = s.bufferMins ? pct(now, inM, rdy) : 100;
    return (
      '<div class="inspect"><div class="inspecthead">' +
      caps("Inspection buffer") +
      '<span class="mono primarytxt">+' +
      s.bufferMins +
      ' min</span></div><div class="bar thin"><span style="width:' +
      p.toFixed(0) +
      '%"></span></div><div class="inspectfoot mono"><span>Scanned ' +
      esc(fmtClock(inM)) +
      "</span><span>Ready " +
      esc(fmtClock(rdy)) +
      "</span></div></div>"
    );
  }

  function requestStatusBadge(r) {
    const loans = reqLoans(r.id);
    const openLoans = loans.filter((l) => !l.back);
    if (loans.length > 0 && openLoans.length === 0) {
      return badge("Completed (" + loans.length + " returned)", "good");
    }
    if (loans.length > 0 && openLoans.length < loans.length) {
      return badge(
        "Partially returned (" + openLoans.length + " still out)",
        "warn",
      );
    }
    if (openLoans.length > 0) {
      return badge(
        "Checked out (" + openLoans.map((l) => l.asset).join(", ") + ")",
        "info",
      );
    }
    if (r.status === "confirmed") {
      return badge(
        "Confirmed reservation (" + (r.allocated || []).join(", ") + ")",
        "good",
      );
    }
    return badge("Approved request (Unreserved)", "memo");
  }

  function requestPage() {
    let html = head(
      "Approved requests &amp; reservations",
      "Distinguish SAO approved requests from confirmed complete-kit reservations",
    );

    if (s.selected) {
      const r = getReq(s.selected);
      if (!r) {
        s.selected = "";
        return requestPage();
      }
      const ev = evaluateKit(r);
      const loans = reqLoans(r.id);
      const openLoans = loans.filter((l) => !l.back);
      const riesgos = computeAtRiskList().filter((rk) => rk.req.id === r.id);

      html +=
        '<div class="inline-actions">' +
        btn("Back to list", "close") +
        " " +
        requestStatusBadge(r) +
        (r.isDemoFixture
          ? " " + badge("Demo fixture · Sat 9:05 am pickup", "info")
          : "") +
        "</div>";

      html +=
        '<div class="record"><small>' +
        esc(r.id) +
        " · " +
        (r.status === "confirmed"
          ? "Confirmed reservation (Whole kit allocated)"
          : "Approved request (Awaiting kit reservation)") +
        "</small><h3>" +
        esc(r.event) +
        "</h3><p><b>" +
        esc(r.club) +
        "</b> · Filed by " +
        esc(r.owner) +
        (r.collector && r.collector !== r.owner
          ? " · Authorized collector: <b>" + esc(r.collector) + "</b>"
          : "") +
        "</p><p>" +
        esc(r.note) +
        "</p>";

      if (r.id === "RQ-214") {
        html +=
          '<div class="infobanner"><small><b>Linked Desk book authorization (Friday · 3:20 pm · Isha Rao):</b> “Kabir Sen is picking up our whole screening kit. Please issue it in his name. I’m setting up in the courtyard.”</small></div>';
      }

      if (riesgos.length > 0) {
        html += conflictCard(riesgos[0]);
      } else if (r.reassignedTo) {
        const sp = getAsset(r.reassignedTo);
        html +=
          '<div class="okbanner"><strong>Reservation protected via spare reassignment</strong><small>Reassigned from late unit <b>' +
          esc(r.reassignedFrom) +
          "</b> to compatible spare <b>" +
          esc(r.reassignedTo) +
          " (" +
          esc(sp ? sp.model : "") +
          " · Bin " +
          esc(sp ? sp.bin : "") +
          ")</b> at " +
          esc(r.reassignedAt) +
          '.</small><div class="inline-actions">' +
          btn("Undo reassignment", "undo-reassign", r.id) +
          "</div></div>";
      } else if (r.followUpFlagged) {
        html +=
          '<div class="riskbanner"><strong>Booking flagged for organizer follow-up</strong><small>' +
          esc(r.followUpNote) +
          "</small></div>";
      }

      // Pricing policy banner before and after confirmation
      html +=
        '<div class="pricebar"><span>Pricing &amp; eligibility: <strong>' +
        esc(r.fee || "₹0 · Approved campus club") +
        "</strong></span><small>Demo policy assumption: approved campus clubs pay ₹0 rental fee</small></div>";

      // Schedule & Window Configuration
      const readyAfterReturn = fmtDayTime(ev.endMins + s.bufferMins);
      html +=
        '<div class="subform"><strong>1. Event &amp; Reservation Window (Pickup through Return + ' +
        s.bufferMins +
        " min inspection)</strong>" +
        bookingStrip(r) +
        '<div class="form">' +
        "<label><span>Planned pickup</span><select data-req-time=\"pickup\" data-req-id=\"" +
        esc(r.id) +
        '">' +
        opts(
          TIME_SLOTS.map((t) => [t, t]),
          r.pickup,
        ) +
        "</select></label>" +
        "<label><span>Planned event start</span><select data-req-time=\"eventStart\" data-req-id=\"" +
        esc(r.id) +
        '">' +
        opts(
          TIME_SLOTS.map((t) => [t, t]),
          r.eventStart,
        ) +
        "</select></label>" +
        "<label><span>Planned event end</span><select data-req-time=\"eventEnd\" data-req-id=\"" +
        esc(r.id) +
        '">' +
        opts(
          TIME_SLOTS.map((t) => [t, t]),
          r.eventEnd,
        ) +
        "</select></label>" +
        "<label><span>Return deadline</span><select data-req-time=\"due\" data-req-id=\"" +
        esc(r.id) +
        '">' +
        opts(
          TIME_SLOTS.map((t) => [t, t]),
          r.due,
        ) +
        "</select></label>" +
        "</div>" +
        "<small>Full availability window checked: <b>" +
        esc(r.pickup) +
        "</b> through <b>" +
        esc(r.due) +
        "</b> + <b>" +
        s.bufferMins +
        " min inspection buffer</b> (units held until <b>" +
        esc(readyAfterReturn) +
        "</b>).</small>" +
        '<label class="checkline"><input type="checkbox" data-can-move="' +
        esc(r.id) +
        '"' +
        (r.canMoveEvent ? " checked" : "") +
        " /><span>Organizer can move the event if no compatible unit is available in this window</span></label>";

      if (ev.scheduleErrors.length > 0) {
        html +=
          '<div class="riskbanner"><strong>Invalid window</strong><small>' +
          ev.scheduleErrors.map(esc).join(" ") +
          "</small></div>";
      }
      html += "</div>";

      // Complete-Kit Physical Unit Allocation & Compatibility Checks
      html +=
        '<div class="subform" style="margin-top:10px"><strong>2. Complete-Kit Physical Unit Allocation (' +
        r.items.length +
        " required item" +
        (r.items.length === 1 ? "" : "s") +
        ")</strong><div class=\"slotlist\">";

      for (const sl of ev.slots) {
        html +=
          '<div class="slotcard' +
          (sl.check.ok ? "" : " blocked") +
          '"><div class="sectionhead" style="margin-bottom:4px"><div><b>Slot ' +
          (sl.idx + 1) +
          ": " +
          esc(sl.itemType) +
          "</b></div>" +
          (sl.check.ok
            ? badge("Compatible & available", "good")
            : badge("Blocking booking", "warn")) +
          "</div>";

        const unitOptions = sl.candidatesOfType.map((a) => {
          const c = checkUnitAvailability(a.id, ev.startMins, ev.endMins, {
            ignoreReqId: r.id,
          });
          const statusTag = isRepair(a.id)
            ? "In repair"
            : c.ok
              ? "Available"
              : "Unavailable";
          return [
            a.id,
            a.id +
              " · " +
              a.model +
              " (Bin " +
              a.bin +
              ") — " +
              statusTag,
          ];
        });

        html +=
          '<label><span>Assigned physical unit</span><select data-slot-unit="' +
          esc(r.id) +
          ":" +
          sl.idx +
          '">' +
          opts(unitOptions, sl.chosenId) +
          "</select></label>";

        if (sl.check.ok) {
          html += "<small>" + esc(sl.check.reason) + "</small>";
        } else {
          html +=
            "<small><b>Why this item blocks the booking:</b> " +
            esc(sl.check.reason) +
            "</small>";
          if (sl.substitutes.length > 0) {
            html += '<div class="inline-actions">';
            for (const sub of sl.substitutes) {
              html += btn(
                "Use compatible substitute: " +
                  sub.id +
                  " (" +
                  sub.model +
                  " · Bin " +
                  sub.bin +
                  ")",
                "use-substitute",
                r.id + ":" + sl.idx + ":" + sub.id,
                "primary",
              );
            }
            html += "</div>";
          } else {
            html +=
              "<small><b>No compatible substitute available for this window.</b></small>";
            if (r.canMoveEvent && sl.suggestedWindow) {
              const sw = sl.suggestedWindow;
              html +=
                '<div class="infobanner"><small><b>Organizer can move event — Suggested time window:</b> Pickup <b>' +
                esc(sw.pickup) +
                "</b> · Event <b>" +
                esc(sw.eventStart) +
                " – " +
                esc(sw.eventEnd) +
                "</b> · Return by <b>" +
                esc(sw.due) +
                "</b></small><div class=\"inline-actions\">" +
                btn(
                  "Apply suggested time (" + sw.pickup + " – " + sw.due + ")",
                  "apply-suggested-time",
                  r.id +
                    "|" +
                    sw.pickup +
                    "|" +
                    sw.eventStart +
                    "|" +
                    sw.eventEnd +
                    "|" +
                    sw.due,
                  "primary",
                ) +
                "</div></div>";
            } else {
              html +=
                "<small><i>Event time is fixed. Only suggest a different time if the organizer confirms they can move the event (check box above).</i></small>";
            }
          }
        }
        html += "</div>";
      }
      html += "</div>";

      // Optional: allow adding/removing an extra item to test multi-item / no-spare blocking scenarios
      html +=
        '<div class="inline-actions"><label class="checkline"><span>Add required equipment to test availability:</span><select data-add-item-select="' +
        esc(r.id) +
        '">' +
        opts(EQUIPMENT_TYPES.map((t) => [t, t])) +
        "</select></label>" +
        btn("Add item to kit", "add-req-item", r.id) +
        (r.items.length > 1
          ? " " + btn("Remove last item", "remove-req-item", r.id)
          : "") +
        "</div>";

      // Confirm whole allocation button
      html +=
        '<div class="inline-actions" style="margin-top:8px">' +
        btn(
          r.status === "confirmed"
            ? "Recheck & update confirmed reservation (" +
                r.items.length +
                " units)"
            : "Confirm complete-kit reservation (" +
                r.items.length +
                " units · ₹0)",
          "confirm-reservation",
          r.id,
          "primary",
        ) +
        "</div></div>";

      // Step 3: Checkout & Unit Loan Slips section
      html +=
        '<div class="subform" style="margin-top:10px"><strong>3. Counter Checkout &amp; Unit Loan Slips (One slip per physical unit)</strong>' +
        kitProgress(r);
      if (loans.length > 0) {
        html +=
          "<small>Issued unit slips for " +
          esc(r.id) +
          ":</small>";
        for (const l of loans) {
          const u = getAsset(l.asset);
          html += row(
            "L-" +
              l.num +
              " · " +
              l.asset +
              " · " +
              (u ? u.type + " (" + u.model + " · Bin " + u.bin + ")" : ""),
            "Collected by " +
              l.who +
              " · Checked out " +
              (l.checkedOutAt || "—") +
              " · Due " +
              l.due +
              (l.checkedInAt ? " · Checked in " + l.checkedInAt : "") +
              (l.handover
                ? " · Reported ETA: " +
                  l.handover.returningWho +
                  " at " +
                  l.handover.reportedEta
                : ""),
            l.back
              ? badge("Returned · " + (l.checkedInAt || ""), "good")
              : badge("On loan", "info"),
          );
        }
      } else if (r.status === "confirmed") {
        html +=
          "<small>Reservation confirmed for units: <b>" +
          esc((r.allocated || []).join(", ")) +
          "</b>. Issue physical loan slips at pickup time (records current desk clock <b>" +
          esc(shifts[s.phase].time) +
          "</b>).</small>" +
          '<div class="inline-actions"><label class="checkline"><span>Collected by</span><select data-collector-select="' +
          esc(r.id) +
          '">' +
          opts(
            people.map((p) => [p, p]),
            r.collector || r.owner,
          ) +
          "</select></label>" +
          btn(
            "Check out confirmed kit (" +
              (r.allocated || []).length +
              " unit slips)",
            "checkout-kit",
            r.id,
            "primary",
          ) +
          "</div>";
      } else {
        html +=
          "<small>Confirm the complete-kit reservation above first to lock physical units before checkout.</small>";
      }
      html += "</div></div>";
    } else {
      for (const r of s.requests) {
        const risks = computeAtRiskList().filter((rk) => rk.req.id === r.id);
        const subline =
          r.id +
          " · " +
          r.club +
          " · Pickup " +
          r.pickup +
          " · Event " +
          r.eventStart +
          "–" +
          r.eventEnd +
          " · Due " +
          r.due +
          " · " +
          (r.fee || "₹0");
        const badges =
          (r.isDemoFixture
            ? badge("Demo fixture · Sat 9:05 am", "info") + " "
            : "") +
          (risks.length > 0 ? badge("At risk", "warn") + " " : "") +
          requestStatusBadge(r) +
          " " +
          btn(
            r.status === "confirmed" ? "View reservation" : "Reserve / view",
            "request",
            r.id,
          );
        html += row(r.event, subline, badges);
      }
    }
    return html;
  }

  function inventory() {
    let html = head(
      "Inventory",
      "Physical units · home shelf, post-return inspection holds, and repair status",
    );
    html +=
      '<div class="buttons"><label>Show <select data-filter>' +
      opts(
        [
          "All items",
          "On shelf",
          "On loan",
          "In inspection",
          "Reserved",
          "In repair",
        ].map((f) => [f, f]),
        s.filter,
      ) +
      "</select></label></div>";

    for (const a of assets) {
      const activeLoan = out(a.id);
      const inspectLoan = activeInspectionLoan(a.id);
      const repair = isRepair(a.id);
      const reservedReqs = s.requests.filter(
        (r) =>
          r.status === "confirmed" &&
          (r.allocated || []).includes(a.id) &&
          !s.loans.some((l) => l.req === r.id && l.asset === a.id && l.back),
      );

      let status = "On shelf";
      let tone = "good";
      let detail = a.model + " · Bin " + a.bin;

      if (repair) {
        status = "In repair";
        tone = "warn";
        detail += " · Workshop hold";
      } else if (activeLoan) {
        status = "On loan";
        tone = "info";
        detail +=
          " · Slip L-" +
          activeLoan.num +
          " (" +
          activeLoan.req +
          " · " +
          activeLoan.who +
          " · Due " +
          activeLoan.due +
          (activeLoan.handover
            ? " · ETA " + activeLoan.handover.reportedEta
            : "") +
          ")";
      } else if (inspectLoan) {
        const readyAt = fmtDayTime(
          toMins(inspectLoan.checkedInAt) + s.bufferMins,
        );
        status = "In inspection";
        tone = "memo";
        detail +=
          " · Checked in " +
          inspectLoan.checkedInAt +
          " (" +
          s.bufferMins +
          "m inspection · Ready " +
          readyAt +
          ")";
      } else if (reservedReqs.length > 0) {
        detail +=
          " · Allocated to " +
          reservedReqs.map((r) => r.id + " (" + r.pickup + ")").join(", ");
      }

      if (s.filter !== "All items") {
        if (s.filter === "Reserved" && reservedReqs.length === 0) continue;
        else if (s.filter !== "Reserved" && s.filter !== status) continue;
      }

      const actions =
        badge(
          inspectLoan
            ? "In inspection · Ready " +
                fmtDayTime(toMins(inspectLoan.checkedInAt) + s.bufferMins)
            : status,
          tone,
        ) +
        (reservedReqs.length > 0 && status === "On shelf"
          ? " " +
            badge(
              "Reserved: " + reservedReqs.map((r) => r.id).join(", "),
              "info",
            )
          : "") +
        (!activeLoan
          ? " " +
            btn(
              repair ? "Return from repair" : "Send to repair",
              "toggle-repair",
              a.id,
            )
          : "");

      html += row(a.id + " · " + a.type, detail, actions);
    }
    return html;
  }

  function register() {
    let html = head(
      "Loan register",
      "One slip per physical unit · enriched with model, bin, handover ETA, and tag check-in",
      s.editing
        ? btn("Cancel", "cancel")
        : btn("New issue slip", "new", "", "primary"),
    );

    if (s.editing) {
      const available = assets.filter(
        (a) => !isRepair(a.id) && !out(a.id) && !activeInspectionLoan(a.id),
      );
      const select = (label, key, options) =>
        "<label><span>" +
        label +
        '</span><select name="' +
        key +
        '" required><option value="">Select…</option>' +
        opts(options) +
        "</select></label>";
      return (
        html +
        '<form data-issue><div class="form">' +
        select(
          "Approved request / reservation",
          "req",
          s.requests.map((r) => [
            r.id,
            r.id +
              " · " +
              r.club +
              " (" +
              (r.status === "confirmed"
                ? "Confirmed: " + (r.allocated || []).join(", ")
                : "Approved") +
              ")",
          ]),
        ) +
        select(
          "Unit leaving the desk (excludes repair, active loans & inspection holds)",
          "asset",
          available.map((a) => [
            a.id,
            a.id + " · " + a.type + " (" + a.model + " · Bin " + a.bin + ")",
          ]),
        ) +
        select(
          "Collected by",
          "who",
          people.map((p) => [p, p]),
        ) +
        select(
          "Return by",
          "due",
          TIME_SLOTS.map((d) => [d, d]),
        ) +
        '</div><button type="submit" class="primary">Save issue slip</button></form>'
      );
    }

    html +=
      '<div class="buttons">' +
      ["Outstanding", "All slips"]
        .map(
          (v, i) =>
            '<button type="button" data-action="scope" data-val="' +
            i +
            '" aria-pressed="' +
            (s.onlyOpen === (i === 0)) +
            '">' +
            v +
            "</button>",
        )
        .join("") +
      "</div>";

    const risks = computeAtRiskList();
    const rq214 = getReq("RQ-214");
    if (rq214 && reqLoans("RQ-214").length >= 2) {
      html += kitProgress(rq214);
    }
    const shown = s.loans
      .filter((l) => !s.onlyOpen || !l.back)
      .slice()
      .reverse();

    if (!shown.length) html += "<p>No outstanding slips.</p>";

    for (const l of shown) {
      const u = getAsset(l.asset);
      const r = getReq(l.req);
      const slipRisk = risks.find((rk) => rk.loan.num === l.num);
      const inInspection = activeInspectionLoan(l.asset);
      const needsTagVerify =
        !l.back &&
        (s.phase === 2 || Boolean(l.handover) || s.verifyLoanNum === l.num);

      html += '<div class="slipbox"><div class="slipmain"><div>';
      html +=
        "<strong>L-" +
        l.num +
        " · " +
        esc(l.asset) +
        " · " +
        esc(u ? u.type : "") +
        " (" +
        esc(u ? u.model : "") +
        " · Bin " +
        esc(u ? u.bin : "") +
        ")</strong>";
      html +=
        "<small>" +
        esc(l.req) +
        (r ? " (" + esc(r.club) + ")" : "") +
        " · Original collector: <b>" +
        esc(l.who) +
        "</b> · Checked out: <b>" +
        esc(l.checkedOutAt || "Friday · 3:45 pm") +
        "</b> · Original due: <b>" +
        esc(l.due) +
        "</b>" +
        (l.checkedInAt
          ? " · Checked in: <b>" +
            esc(l.checkedInAt) +
            "</b>" +
            (l.returnedBy ? " (by " + esc(l.returnedBy) + ")" : "") +
            (l.verifiedTag ? " · Verified tag: " + esc(l.verifiedTag) : "")
          : "") +
        "</small>";

      if (l.handover) {
        html +=
          '<div class="infobanner"><small><b>Handover &amp; reported ETA (' +
          esc(l.handover.loggedAt) +
          "):</b> Returning with <b>" +
          esc(l.handover.returningWho) +
          "</b> · Reported ETA: <b>" +
          esc(l.handover.reportedEta) +
          "</b> (+ " +
          s.bufferMins +
          "m inspection → ready no earlier than <b>" +
          esc(fmtClock(toMins(l.handover.reportedEta) + s.bufferMins)) +
          "</b>).<br/>Note: “" +
          esc(l.handover.note) +
          "”</small></div>";
      }

      if (slipRisk) {
        html += conflictCard(slipRisk);
      }

      if (l.back && inInspection) {
        html += inspectBar(l);
      }

      html += "</div><div class=\"inline-actions\">";
      if (l.back) {
        html += badge("Returned", "good");
        if (inInspection) {
          html +=
            " " +
            badge(
              "In inspection until " +
                fmtDayTime(toMins(l.checkedInAt) + s.bufferMins),
              "memo",
            );
        }
      } else {
        if (!needsTagVerify) {
          html += btn("Record return", "return", String(l.num), "primary");
        }
        html +=
          " " +
          btn(
            l.handover ? "Update ETA / handover" : "Report delayed return / ETA",
            "toggle-eta",
            String(l.num),
          ) +
          " " +
          btn(
            "Verify tag & return",
            "open-verify",
            String(l.num),
            needsTagVerify ? "primary" : "",
          );
      }
      html += "</div></div>";

      // Inline Delayed Return / Handover ETA Form
      if (!l.back && s.etaFormLoan === l.num) {
        const defWho = l.handover ? l.handover.returningWho : "Leela Das";
        const defEta = l.handover ? l.handover.reportedEta : "Sat 9:00 am";
        const defNote = l.handover
          ? l.handover.note
          : "Kabir returned projector and speaker. Leela Das still has the adapter and will drop it off Saturday at 9:00 am.";
        html +=
          '<form data-eta-form="' +
          l.num +
          '" class="subform"><strong>Report delayed return / handover ETA for L-' +
          l.num +
          " (" +
          esc(l.asset) +
          ")</strong><small>Preserves <b>" +
          esc(l.who) +
          "</b> as original collector and <b>" +
          esc(l.due) +
          "</b> as original due time. Treats expected return as a reported ETA and checks impact on Saturday pickups.</small>" +
          '<div class="form">' +
          '<label><span>Person bringing item back</span><select name="returningWho">' +
          opts(
            people.map((p) => [p, p]),
            defWho,
          ) +
          "</select></label>" +
          '<label><span>Reported return ETA</span><select name="reportedEta">' +
          opts(
            TIME_SLOTS.map((t) => [t, t]),
            defEta,
          ) +
          "</select></label>" +
          '<label class="full"><span>Handover note (linked to slip &amp; Desk book)</span><textarea name="note" rows="2" required>' +
          esc(defNote) +
          "</textarea></label></div>" +
          '<div class="inline-actions"><button type="submit" class="primary">Save reported ETA &amp; check schedule risk</button> ' +
          btn("Cancel", "close-eta") +
          "</div></form>";
      }

      // Inline Asset Tag Verification Control (always shown when verifying on Saturday or opened)
      if (!l.back && (s.verifyLoanNum === l.num || s.phase === 2)) {
        const returningPerson =
          (l.handover && l.handover.returningWho) || l.who;
        const wrongAdapter = l.asset === "AD-12" ? "AD-15" : "AD-12";
        html +=
          '<form data-verify-form="' +
          l.num +
          '" class="subform"><strong>Verify physical asset tag to close slip L-' +
          l.num +
          " (Expected: " +
          esc(l.asset) +
          " · " +
          esc(u ? u.model : "") +
          ")</strong><small>Verify the asset tag on the item " +
          esc(returningPerson) +
          " presents at the counter. A mismatch leaves the loan open; a match records the return at " +
          esc(shifts[s.phase].time) +
          " and starts the " +
          s.bufferMins +
          "-minute post-return inspection hold.</small>";

        if (s.tagError && s.tagError.num === l.num) {
          html +=
            '<div class="riskbanner"><strong>Tag verification failed — Loan L-' +
            l.num +
            " remains open</strong><small>" +
            esc(s.tagError.msg) +
            "</small></div>";
        }

        html +=
          '<div class="scanrow"><span class="scanprefix mono">' +
          icon("scan") +
          ' TAG:</span><select name="tag" class="mono">' +
          opts(
            assets.map((a) => [
              a.id,
              a.id + " · " + a.type + " (" + a.model + ")",
            ]),
            l.asset,
          ) +
          '</select><button type="submit" class="primary">Verify tag &amp; record return</button></div>' +
          '<div class="inline-actions">' +
          btn(
            "Test wrong tag (" + wrongAdapter + ")",
            "verify-tag-direct",
            l.num + ":" + wrongAdapter,
          ) +
          " " +
          btn(
            "Verify matching tag (" + l.asset + ")",
            "verify-tag-direct",
            l.num + ":" + l.asset,
            "primary",
          ) +
          "</div></form>";
      }

      html += "</div>";
    }
    return html;
  }

  function deskbook() {
    let html = head(
      "Desk book",
      "Messages from clubs and loan-linked handover notes for the next shift",
    );
    const entries = [
      [
        "Friday · 3:20 pm",
        "Isha Rao · Film Society (RQ-214)",
        "Kabir Sen is picking up our whole screening kit. Please issue it in his name. I’m setting up in the courtyard.",
      ],
      [
        "Friday · 3:30 pm",
        "Tara Shah · Debate Union (RQ-209 · L-401)",
        "Our microphone stays with me overnight. I’ll return it by 10 am Saturday.",
      ],
    ];
    if (s.phase >= 1)
      entries.push([
        "Friday · 7:30 pm",
        "Kabir Sen · Film Society (RQ-214)",
        "I brought the projector and speaker. Leela Das has our adapter. She’ll be at the counter at 9 am tomorrow.",
      ]);
    for (const n of s.notes)
      entries.push([
        shifts[n.phase] ? shifts[n.phase].time : "Shift note",
        n.author || "Counter handover",
        n.text,
      ]);
    for (const [t, author, body] of entries.slice().reverse())
      html +=
        '<article class="record"><small>' +
        esc(t) +
        "</small><h3>" +
        esc(author) +
        "</h3><p>" +
        esc(body) +
        "</p></article>";
    return (
      html +
      '<form data-note><div class="form"><label class="full"><span>Note for the next shift</span><textarea name="note" rows="2" maxlength="400" required></textarea></label></div><button type="submit">Add handover note</button></form>'
    );
  }

  const screens = {
    Requests: requestPage,
    Inventory: inventory,
    "Loan register": register,
    "Desk book": deskbook,
  };

  function paint() {
    const phase = shifts[s.phase];
    q("[data-clock]").textContent = phase.time;
    q("[data-shift-title]").textContent = phase.title;
    q("[data-shift]").textContent = phase.text;
    const advance = q('[data-action="advance"]');
    advance.hidden = !phase.next;
    advance.textContent = phase.next || "";
    if (q("[data-ops]")) q("[data-ops]").innerHTML = renderOpsBar();
    q("[data-nav]").innerHTML = renderNav();
    q("[data-page]").innerHTML = screens[s.tab]();
    if (q("[data-filter]")) q("[data-filter]").value = s.filter;
    q("[data-status]").textContent = s.notice;
  }

  function commit(msg) {
    if (msg) s.notice = msg;
    paint();
    try {
      localStorage.setItem(storageKey, JSON.stringify(s));
    } catch {
      q("[data-status]").textContent +=
        " Browser storage is unavailable. Progress lasts for this visit.";
    }
  }

  function recordDelayedEta(loanNum, returningWho, reportedEta, noteText) {
    const l = s.loans.find((x) => x.num === Number(loanNum));
    if (!l || l.back) return;
    const u = getAsset(l.asset);
    l.handover = {
      returningWho,
      reportedEta,
      note: noteText,
      loggedAt: shifts[s.phase].time,
    };
    s.etaFormLoan = 0;

    // Calculate immediate risk on Saturday reservation
    const risks = computeAtRiskList().filter((rk) => rk.loan.num === l.num);
    const riskSummary =
      risks.length > 0
        ? " " + risks[0].headline
        : " No upcoming reservation conflict.";

    s.notes.push({
      phase: s.phase,
      author:
        "Counter handover · L-" +
        l.num +
        " · " +
        l.asset +
        " (" +
        (u ? u.model : "") +
        " · " +
        l.req +
        ")",
      text:
        noteText +
        " [Original collector: " +
        l.who +
        " · Original due: " +
        l.due +
        " · Reported ETA: " +
        returningWho +
        " at " +
        reportedEta +
        "]." +
        riskSummary,
    });

    commit(
      "Recorded reported ETA (" +
        returningWho +
        " · " +
        reportedEta +
        ") on L-" +
        l.num +
        " (" +
        l.asset +
        ")." +
        riskSummary,
    );
  }

  function verifyTagAndReturn(loanNum, enteredTag) {
    const l = s.loans.find((x) => x.num === Number(loanNum));
    if (!l || l.back) return;
    const u = getAsset(l.asset);
    const cleanTag = String(enteredTag || "").trim().toUpperCase();
    if (cleanTag !== l.asset) {
      const wrongUnit = getAsset(cleanTag);
      const msg =
        "Asset tag mismatch: Slip L-" +
        l.num +
        " is for " +
        l.asset +
        " (" +
        (u ? u.model : "") +
        "), but tag " +
        (cleanTag || "blank") +
        (wrongUnit ? " (" + wrongUnit.model + ")" : "") +
        " was scanned. Loan L-" +
        l.num +
        " remains open.";
      s.tagError = {
        num: l.num,
        expected: l.asset,
        actual: cleanTag,
        msg,
      };
      commit(msg);
      return;
    }

    s.tagError = null;
    s.verifyLoanNum = 0;
    l.back = true;
    l.checkedInAt = shifts[s.phase].time;
    l.returnedBy = (l.handover && l.handover.returningWho) || l.who;
    l.verifiedTag = l.asset;
    const readyTime = fmtDayTime(currentClockMins() + s.bufferMins);

    s.notes.push({
      phase: s.phase,
      author:
        "Return & inspection · L-" +
        l.num +
        " · " +
        l.asset +
        " (" +
        l.req +
        ")",
      text:
        "Verified tag " +
        l.asset +
        " returned by " +
        l.returnedBy +
        " at " +
        l.checkedInAt +
        ". Held in post-return inspection for " +
        s.bufferMins +
        " mins (ready no earlier than " +
        readyTime +
        "; Bin " +
        (u ? u.bin : "") +
        ").",
    });

    commit(
      "Verified tag " +
        l.asset +
        " from " +
        l.returnedBy +
        ". Slip L-" +
        l.num +
        " closed at " +
        l.checkedInAt +
        ". Held in inspection until " +
        readyTime +
        ".",
    );
  }

  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-action]");
    if (!b) return;
    const v = b.dataset.val;
    switch (b.dataset.action) {
      case "restart":
        s = original();
        break;
      case "advance":
        if (s.phase < 2) s.phase++;
        s.tagError = null;
        s.notice = "Shift time updated to " + shifts[s.phase].time + ".";
        break;
      case "tab":
        s.tab = v;
        s.editing = false;
        break;
      case "close":
        s.selected = "";
        break;
      case "request":
        s.selected = v;
        break;
      case "open-req":
        s.tab = "Requests";
        s.selected = v;
        break;
      case "new":
        s.editing = true;
        break;
      case "cancel":
        s.editing = false;
        break;
      case "scope":
        s.onlyOpen = v === "0";
        break;
      case "toggle-repair": {
        const asset = getAsset(v);
        if (!asset || out(v)) return;
        if (isRepair(v)) {
          s.repairIds = s.repairIds.filter((id) => id !== v);
          s.notice = v + " (" + asset.model + ") returned from repair to Bin " + asset.bin + ".";
        } else {
          s.repairIds.push(v);
          s.notice = v + " (" + asset.model + ") marked In repair at Workshop.";
        }
        break;
      }
      case "use-substitute": {
        const [reqId, slotIdxStr, subId] = v.split(":");
        const r = getReq(reqId);
        if (!r) return;
        const idx = Number(slotIdxStr);
        r.draftUnits[idx] = subId;
        if (r.id === "RQ-214" && /adapter/i.test(r.items[idx])) {
          syncDemoFixtureWithFilmSociety(subId);
        }
        s.notice =
          "Selected compatible substitute " +
          subId +
          " for " +
          r.id +
          " (" +
          r.items[idx] +
          ").";
        break;
      }
      case "apply-suggested-time": {
        const [reqId, pickup, evStart, evEnd, due] = v.split("|");
        const r = getReq(reqId);
        if (!r) return;
        r.pickup = pickup;
        r.eventStart = evStart;
        r.eventEnd = evEnd;
        r.due = due;
        // Refresh draft units for the new window
        r.draftUnits = [];
        evaluateKit(r);
        s.notice =
          "Updated " +
          r.id +
          " window to " +
          pickup +
          " – " +
          due +
          " (event moved by organizer).";
        break;
      }
      case "add-req-item": {
        const r = getReq(v);
        const sel = q('[data-add-item-select="' + v + '"]');
        if (!r || !sel) return;
        r.items.push(sel.value);
        r.status = "approved";
        s.notice = "Added " + sel.value + " to " + r.id + " kit requirements.";
        break;
      }
      case "remove-req-item": {
        const r = getReq(v);
        if (!r || r.items.length <= 1) return;
        const removed = r.items.pop();
        r.draftUnits.pop();
        s.notice = "Removed " + removed + " from " + r.id + ".";
        break;
      }
      case "confirm-reservation": {
        const r = getReq(v);
        if (!r) return;
        // Recheck entire kit allocation together before saving
        const ev = evaluateKit(r);
        if (!ev.allSlotsOk) {
          const firstBlocked = ev.slots.find((sl) => !sl.check.ok);
          const msg =
            ev.scheduleErrors[0] ||
            (firstBlocked
              ? "Cannot confirm reservation: " + firstBlocked.check.reason
              : "Kit unavailable for requested window.");
          s.notice = msg;
          break;
        }
        r.allocated = ev.slots.map((sl) => sl.chosenId);
        r.draftUnits = [...r.allocated];
        r.status = "confirmed";
        if (r.id === "RQ-214") {
          const adapterId = r.allocated.find((id) => /^AD-/i.test(id));
          if (adapterId) syncDemoFixtureWithFilmSociety(adapterId);
        }
        s.notice =
          "Confirmed complete-kit reservation for " +
          r.id +
          " (" +
          r.club +
          "): " +
          r.allocated.join(", ") +
          " locked for " +
          r.pickup +
          " – " +
          r.due +
          " (+" +
          s.bufferMins +
          "m inspection) · " +
          (r.fee || "₹0 · Approved campus club") +
          ".";
        break;
      }
      case "checkout-kit": {
        const r = getReq(v);
        if (!r) return;
        if (r.status !== "confirmed" || !r.allocated || !r.allocated.length) {
          const ev = evaluateKit(r);
          if (!ev.allSlotsOk) {
            s.notice = "Confirm a valid complete-kit reservation before checkout.";
            break;
          }
          r.allocated = ev.slots.map((sl) => sl.chosenId);
          r.status = "confirmed";
        }
        const collectorSel = q('[data-collector-select="' + r.id + '"]');
        const collector = collectorSel
          ? collectorSel.value
          : r.collector || r.owner;
        r.collector = collector;

        if (r.id === "RQ-214") {
          const adapterId = r.allocated.find((id) => /^AD-/i.test(id));
          if (adapterId) syncDemoFixtureWithFilmSociety(adapterId);
        }

        // Recheck physical availability at checkout
        const blockedUnit = r.allocated.find(
          (id) => isRepair(id) || out(id) || activeInspectionLoan(id),
        );
        if (blockedUnit) {
          s.notice =
            "Cannot check out kit: " +
            blockedUnit +
            " is currently unavailable (in repair, on loan, or in inspection).";
          break;
        }

        const createdSlips = [];
        for (const assetId of r.allocated) {
          if (s.loans.some((l) => l.req === r.id && l.asset === assetId && !l.back))
            continue;
          const num = Math.max(400, ...s.loans.map((l) => l.num)) + 1;
          s.loans.push({
            num,
            req: r.id,
            asset: assetId,
            who: collector,
            due: r.due,
            checkedOutAt: shifts[s.phase].time,
            checkedInAt: "",
            returnedBy: "",
            verifiedTag: "",
            back: false,
            handover: null,
          });
          createdSlips.push("L-" + num + " (" + assetId + ")");
        }
        s.tab = "Loan register";
        s.notice =
          "Checked out " +
          r.id +
          " kit to " +
          collector +
          " at " +
          shifts[s.phase].time +
          ": " +
          createdSlips.join(", ") +
          ".";
        break;
      }
      case "return": {
        const l = s.loans.find((l) => l.num === Number(v));
        if (!l || l.back) return;
        const u = getAsset(l.asset);
        l.back = true;
        l.checkedInAt = shifts[s.phase].time;
        l.returnedBy = (l.handover && l.handover.returningWho) || l.who;
        l.verifiedTag = l.asset;
        const readyTime = fmtDayTime(currentClockMins() + s.bufferMins);
        s.notice =
          l.asset +
          " (" +
          (u ? u.model : "") +
          ") checked in at " +
          l.checkedInAt +
          " (Bin " +
          (u ? u.bin : "") +
          "). Slip L-" +
          l.num +
          " closed. Inspection buffer until " +
          readyTime +
          ".";
        break;
      }
      case "toggle-eta": {
        const num = Number(v);
        s.etaFormLoan = s.etaFormLoan === num ? 0 : num;
        break;
      }
      case "close-eta":
        s.etaFormLoan = 0;
        break;
      case "quick-eta": {
        s.tab = "Loan register";
        recordDelayedEta(
          Number(v),
          "Leela Das",
          "Sat 9:00 am",
          "Kabir returned projector and speaker. Leela Das still has the adapter and will drop it off Saturday at 9:00 am.",
        );
        return;
      }
      case "reassign-spare": {
        const [reqId, oldAssetId, spareId] = v.split(":");
        const r = getReq(reqId);
        const spare = getAsset(spareId);
        if (!r || !spare) return;
        // Recheck spare's full reservation window
        const check = checkUnitAvailability(
          spareId,
          toMins(r.pickup),
          toMins(r.due),
          { ignoreReqId: r.id },
        );
        if (!check.ok) {
          s.notice = "Cannot reassign spare " + spareId + ": " + check.reason;
          break;
        }
        r.allocated = (r.allocated || []).map((id) =>
          id === oldAssetId ? spareId : id,
        );
        r.draftUnits = [...r.allocated];
        r.syncWithFilmSociety = false;
        r.reassignedFrom = oldAssetId;
        r.reassignedTo = spareId;
        r.reassignedAt = shifts[s.phase].time;
        r.followUpFlagged = false;
        r.followUpNote = "";

        s.notes.push({
          phase: s.phase,
          author:
            "Schedule conflict resolved · " + r.id + " (" + r.club + ")",
          text:
            "Reassigned " +
            r.pickup +
            " pickup (" +
            r.id +
            " · " +
            r.event +
            ") from delayed unit " +
            oldAssetId +
            " to compatible spare " +
            spareId +
            " (" +
            spare.model +
            " · Bin " +
            spare.bin +
            ") after rechecking full window (" +
            r.pickup +
            " – " +
            r.due +
            " + " +
            s.bufferMins +
            "m inspection). Friday loan for " +
            oldAssetId +
            " remains open.",
        });

        s.notice =
          "Reassigned " +
          r.id +
          " (" +
          r.pickup +
          " pickup) from " +
          oldAssetId +
          " to compatible spare " +
          spareId +
          " (" +
          spare.model +
          " · Bin " +
          spare.bin +
          "). Friday loan remains open.";
        break;
      }
      case "undo-reassign": {
        const r = getReq(v);
        if (!r || !r.reassignedFrom) return;
        const origId = r.reassignedFrom;
        r.allocated = [origId];
        r.draftUnits = [origId];
        r.reassignedFrom = "";
        r.reassignedTo = "";
        r.reassignedAt = "";
        r.followUpFlagged = false;
        r.followUpNote = "";
        s.notice =
          "Reverted " +
          r.id +
          " allocation back to " +
          origId +
          " to test conflict/spare scenarios.";
        break;
      }
      case "flag-followup": {
        const [reqId, loanNumStr] = v.split(":");
        const r = getReq(reqId);
        const l = s.loans.find((x) => x.num === Number(loanNumStr));
        if (!r) return;
        const etaStr =
          l && l.handover && l.handover.reportedEta
            ? l.handover.reportedEta
            : "Sat 9:00 am";
        const readyStr = fmtClock(toMins(etaStr) + s.bufferMins);
        r.followUpFlagged = true;
        r.followUpNote =
          "No compatible spare available. Follow up with " +
          r.owner +
          " (" +
          r.club +
          ", pickup " +
          r.pickup +
          "): " +
          (l ? l.asset : "adapter") +
          " expected at " +
          fmtClock(toMins(etaStr)) +
          ", ready no earlier than " +
          readyStr +
          ".";
        s.notes.push({
          phase: s.phase,
          author: "Follow-up required · " + r.id + " (" + r.club + ")",
          text:
            r.followUpNote +
            (l ? " Friday loan L-" + l.num + " remains open." : ""),
        });
        s.notice =
          "Flagged " +
          r.id +
          " (" +
          r.club +
          ") for organizer follow-up. Friday loan remains open.";
        break;
      }
      case "open-verify": {
        s.tab = "Loan register";
        s.verifyLoanNum = Number(v);
        s.tagError = null;
        break;
      }
      case "verify-tag-direct": {
        const [loanNumStr, tagStr] = v.split(":");
        verifyTagAndReturn(Number(loanNumStr), tagStr);
        return;
      }
    }
    commit();
  });

  root.addEventListener("change", (e) => {
    const t = e.target;
    if (t.matches("[data-filter]")) {
      s.filter = t.value;
      commit();
      return;
    }
    if (t.matches("[data-buffer]")) {
      s.bufferMins = Number(t.value);
      commit(
        "Inspection buffer updated to " +
          s.bufferMins +
          " minutes. Schedule checks recalculated.",
      );
      return;
    }
    if (t.matches("[data-req-time]")) {
      const reqId = t.dataset.reqId;
      const field = t.dataset.reqTime;
      const r = getReq(reqId);
      if (!r) return;
      r[field] = t.value;
      if (r.id === "RQ-218") r.syncWithFilmSociety = false;
      commit("Updated " + r.id + " " + field + " to " + t.value + ".");
      return;
    }
    if (t.matches("[data-can-move]")) {
      const r = getReq(t.dataset.canMove);
      if (!r) return;
      r.canMoveEvent = t.checked;
      commit(
        r.canMoveEvent
          ? "Organizer marked able to move event time if blocked."
          : "Organizer event time marked fixed.",
      );
      return;
    }
    if (t.matches("[data-slot-unit]")) {
      const [reqId, idxStr] = t.dataset.slotUnit.split(":");
      const r = getReq(reqId);
      if (!r) return;
      const idx = Number(idxStr);
      r.draftUnits[idx] = t.value;
      if (r.id === "RQ-218") {
        r.syncWithFilmSociety = false;
      } else if (r.id === "RQ-214" && /adapter/i.test(r.items[idx])) {
        syncDemoFixtureWithFilmSociety(t.value);
      }
      commit("Selected unit " + t.value + " for " + r.id + " slot " + (idx + 1) + ".");
      return;
    }
  });

  root.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const form = new FormData(f);

    if (f.matches("[data-note]")) {
      const text = String(form.get("note")).trim();
      if (!text) return;
      s.notes.push({ phase: s.phase, author: "Counter handover", text });
      commit("Handover note saved.");
      return;
    }

    if (f.matches("[data-eta-form]")) {
      const loanNum = Number(f.dataset.etaForm);
      const returningWho = String(form.get("returningWho") || "Leela Das");
      const reportedEta = String(form.get("reportedEta") || "Sat 9:00 am");
      const note = String(form.get("note") || "").trim();
      if (!note) return;
      recordDelayedEta(loanNum, returningWho, reportedEta, note);
      return;
    }

    if (f.matches("[data-verify-form]")) {
      const loanNum = Number(f.dataset.verifyForm);
      const tag = String(form.get("tag") || "");
      verifyTagAndReturn(loanNum, tag);
      return;
    }

    if (!f.matches("[data-issue]")) return;
    const [req, asset, who, due] = ["req", "asset", "who", "due"].map((k) =>
      form.get(k),
    );
    const unit = getAsset(asset),
      r = getReq(req);
    if (
      !r ||
      !unit ||
      isRepair(asset) ||
      out(asset) ||
      activeInspectionLoan(asset) ||
      !people.includes(who)
    )
      return;
    if (!r.items.includes(unit.type)) {
      q("[data-status]").textContent =
        "This equipment type is outside the approved request. Choose an approved unit.";
      return;
    }
    const allowedCount = r.items.filter((x) => x === unit.type).length;
    const activeCount = s.loans.filter(
      (l) => l.req === req && !l.back && getAsset(l.asset).type === unit.type,
    ).length;
    if (activeCount >= allowedCount) {
      q("[data-status]").textContent =
        "The approved quantity of this equipment type is already on loan.";
      return;
    }

    if (r.id === "RQ-214" && /^AD-/i.test(asset)) {
      syncDemoFixtureWithFilmSociety(asset);
    }

    const num = Math.max(400, ...s.loans.map((l) => l.num)) + 1;
    s.loans.push({
      num,
      req,
      asset,
      who,
      due,
      checkedOutAt: shifts[s.phase].time,
      checkedInAt: "",
      returnedBy: "",
      verifiedTag: "",
      back: false,
      handover: null,
    });
    s.editing = false;
    commit(
      "Issued " +
        asset +
        " (" +
        unit.model +
        ") to " +
        who +
        " on slip L-" +
        num +
        " at " +
        shifts[s.phase].time +
        ".",
    );
  });

  function restore(d) {
    if (
      !d ||
      d.version !== 2 ||
      !Object.hasOwn(screens, d.tab) ||
      !shifts[d.phase] ||
      !Array.isArray(d.requests) ||
      !Array.isArray(d.notes) ||
      !Array.isArray(d.loans) ||
      !d.loans.length
    )
      return;
    s = {
      ...original(),
      ...d,
      requests: d.requests.map((r) => ({
        ...r,
        items: [...(r.items || [])],
        allocated: [...(r.allocated || [])],
        draftUnits: [...(r.draftUnits || [])],
      })),
      loans: d.loans.map((l) => ({
        ...l,
        handover: l.handover ? { ...l.handover } : null,
      })),
      notes: d.notes.map((n) => ({ ...n })),
    };
    paint();
  }

  paint();
  try {
    restore(JSON.parse(localStorage.getItem(storageKey)));
  } catch {
    // Keep the fresh shift when storage is unavailable or the saved data is invalid.
  }
})();
