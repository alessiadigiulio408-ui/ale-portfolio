document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("chapters-root");
  const nav = document.getElementById("progress-nav");
  const tagline = document.getElementById("cover-tagline");
  tagline.textContent = coverTagline;

  const stops = journeyChapters.filter((ch) => !ch.isFinal); // the 5 flyable stops
  const finalChapter = journeyChapters.find((ch) => ch.isFinal);
  const PHANTOM_START = { lat: 5, lng: -80 }; // "off the map" starting point, southwest of Caracas

  let unlockedUpTo = -1; // index into journeyChapters; -1 = only cover visible
  let flying = false;

  // ---------- BUILD PROGRESS NAV ----------
  journeyChapters.forEach((ch, i) => {
    const stamp = document.createElement("button");
    stamp.className = "nav-stamp";
    stamp.type = "button";
    stamp.textContent = ch.number;
    stamp.title = ch.destination || ch.title;
    stamp.dataset.index = i;
    stamp.disabled = true;
    stamp.addEventListener("click", () => {
      if (i <= unlockedUpTo) scrollToChapter(i);
    });
    nav.appendChild(stamp);
  });

  function updateNav(current) {
    document.querySelectorAll(".nav-stamp").forEach((el) => {
      const i = Number(el.dataset.index);
      const ch = journeyChapters[i];
      el.classList.remove("is-current", "is-done");
      el.disabled = i > unlockedUpTo;
      if (ch.accent) el.style.setProperty("--accent", ch.accent);
      if (i === current) el.classList.add("is-current");
      else if (i <= unlockedUpTo) el.classList.add("is-done");
    });
  }

  // ---------- SPREAD PHOTO HELPER (illustrated two-page chapters) ----------
  function spreadPhotoHtml(photo) {
    const decoIcons = {
      paperclip: `<span class="photo-deco photo-deco--paperclip"><svg viewBox="0 0 24 40" width="16" height="28"><path d="M6 6 L6 30 A6 6 0 0 0 18 30 L18 10 A3 3 0 0 0 12 10 L12 26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></span>`,
      pin: `<span class="photo-deco photo-deco--pin"></span>`,
      tape: `<span class="photo-deco photo-deco--tape"></span>`,
      "stamp-edge": ""
    };
    const tilt = photo.tilt || 0;
    const ratio = photo.ratio || "1/1";
    const frameClass = photo.deco ? ` photo-frame--${photo.deco}` : "";
    const sizeClass = ` photo-frame--${photo.size || "secondary"}`;
    return `
      <div class="photo-frame${frameClass}${sizeClass}" style="--tilt:${tilt}deg; aspect-ratio:${ratio};">
        ${decoIcons[photo.deco] || ""}
        <img src="images/${photo.file}" alt="" loading="lazy"
             onerror="this.parentElement.classList.add('photo-frame--empty'); this.remove();">
        ${photo.annotation ? `
          <div class="photo-annotation" style="left:${photo.annotation.left}; top:${photo.annotation.top};">
            <span class="annotation-text">${photo.annotation.text}</span>
            <span class="annotation-arrow">${photo.annotation.arrow || "↓"}</span>
          </div>
        ` : ""}
      </div>
    `;
  }

  function spreadHtml(ch, i) {
    return `
      <div class="spread">
        <div class="spread-page spread-page--left">
          <img class="spread-bg" src="${ch.bgLeft}" alt="" loading="lazy">
          <div class="page-content">
            <div class="text-panel">
              <p class="spread-label">${ch.label}</p>
              <h2 class="spread-title">${ch.title}</h2>
              <div class="spread-intro">${ch.leftIntro || ""}</div>
              ${ch.leftReflection ? `<p class="spread-reflection">${ch.leftReflection}</p>` : ""}
            </div>
            ${ch.leftPhotos && ch.leftPhotos.length ? `<div class="spread-photos ${ch.leftPhotosClass || ""}">${ch.leftPhotos.map(spreadPhotoHtml).join("")}</div>` : ""}
            ${ch.leftSubNote ? `
              <div class="spread-subnote">
                <p class="subnote-label">${ch.leftSubNote.label}</p>
                <p class="subnote-text">${ch.leftSubNote.text}</p>
              </div>
            ` : ""}
            <span class="page-number">${ch.pageNumber}</span>
          </div>
        </div>
        <div class="spread-seam" aria-hidden="true"></div>
        <div class="spread-page spread-page--right">
          <img class="spread-bg" src="${ch.bgRight}" alt="" loading="lazy">
          <div class="page-content">
            ${ch.stamp ? `
              <div class="spread-stamp">
                <svg viewBox="0 0 80 80" class="stamp-ring"><circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" stroke-width="1.25" stroke-dasharray="2 3"/></svg>
                <span class="stamp-text">${ch.stamp}</span>
              </div>
            ` : ""}
            ${ch.rightCaption ? `<p class="spread-caption">${ch.rightCaption}</p>` : ""}
            ${ch.rightIntro ? `<div class="text-panel text-panel--right"><div class="spread-intro spread-intro--right">${ch.rightIntro}</div></div>` : ""}
            ${ch.rightPhotos && ch.rightPhotos.length ? `<div class="spread-photos ${ch.rightPhotosClass || ""}">${ch.rightPhotos.map(spreadPhotoHtml).join("")}</div>` : ""}
            ${ch.tornNote ? `<span class="torn-note">${ch.tornNote}</span>` : ""}
            <button class="ticket-cta" data-index="${i}">
              <span class="ticket-label">Continue the Journey</span>
              <span class="ticket-next">${ch.ctaNext || "Next Chapter"} <span class="arrow">→</span></span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ---------- CHAPTER CONTENT HELPERS (legacy polaroid template) ----------
  function photoFilename(name, annotation) {
    return `
      <div class="polaroid">
        <div class="polaroid-photo-wrap">
          <img src="images/${name}" alt="" loading="lazy"
               onerror="this.parentElement.innerHTML='<div class=&quot;polaroid-placeholder&quot;>+ photo</div>'">
          ${annotation ? `
            <div class="photo-annotation" style="left:${annotation.left}; top:${annotation.top};">
              <span class="annotation-text">${annotation.text}</span>
              <span class="annotation-arrow">${annotation.arrow || "↓"}</span>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }

  function entryHtml(entry) {
    const annotations = entry.photoAnnotations || {};
    return `
      <div class="entry">
        <span class="entry-date">${entry.dateLabel}</span>
        <h3 class="entry-role">${entry.role}</h3>
        ${entry.org ? `<p class="entry-org">${entry.org}</p>` : ""}
        <div class="entry-text">${entry.text}</div>
        <div class="photo-grid">${entry.photos.map((p) => photoFilename(p, annotations[p])).join("")}</div>
      </div>
    `;
  }

  function asideHtml(aside) {
    if (!aside) return "";
    return `
      <div class="postcard">
        <div class="postcard-stamp">✉</div>
        <div class="postcard-body">
          <p class="postcard-kicker">${aside.label}</p>
          <h4>${aside.title}</h4>
          <p class="postcard-org">${aside.org}</p>
          <p class="postcard-text">${aside.text}</p>
        </div>
      </div>
    `;
  }

  // ---------- RENDER CHAPTERS ----------
  journeyChapters.forEach((ch, i) => {
    const section = document.createElement("section");
    section.className = "chapter";
    section.id = `chapter-${ch.id}`;
    section.hidden = true;
    if (ch.accent) {
      section.style.setProperty("--accent", ch.accent);
      section.style.setProperty("--accent-soft", ch.accentSoft);
    }

    if (ch.isFinal) {
      section.innerHTML = `
        <div class="chapter-inner chapter-inner--final">
          <p class="chapter-kicker">${ch.kicker}</p>
          <h2 class="chapter-title chapter-title--final">${ch.title}</h2>
          <p class="closing-text">${ch.closingText}</p>
          <div class="final-ctas">
            <a class="final-cta final-cta--primary" href="mailto:${ch.email}">Get in Touch</a>
            <a class="final-cta" href="${ch.linkedin}" target="_blank" rel="noopener">View LinkedIn</a>
          </div>
          <button class="restart-link" id="restart-journey" type="button">↺ Revisit the Journey</button>
        </div>
      `;
    } else if (ch.template === "spread") {
      section.classList.add("chapter--spread");
      section.innerHTML = spreadHtml(ch, i);
    } else {
      section.innerHTML = `
        <div class="chapter-inner">
          <span class="chapter-sticker">${ch.emoji || ""}</span>
          <p class="chapter-kicker">${ch.kicker}</p>
          <p class="chapter-destination">${ch.destination}</p>
          <h2 class="chapter-title">${ch.title}</h2>
          ${ch.entries.map(entryHtml).join("")}
          ${asideHtml(ch.aside)}
          <button class="continue-btn" data-index="${i}">Continue the Journey <span class="arrow">→</span></button>
        </div>
      `;
    }

    root.appendChild(section);
  });

  // ---------- FLIGHT MAP (persistent, shows all stops + route) ----------
  const mapEl = document.getElementById("flight-map");
  const bounds = stops.map((s) => [s.lat, s.lng]);
  const map = L.map(mapEl, {
    scrollWheelZoom: false,
    zoomControl: true
  });
  map.fitBounds(bounds, { padding: [36, 36] });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    maxZoom: 18
  }).addTo(map);

  L.polyline(bounds, {
    color: "#A9843F",
    weight: 2,
    dashArray: "2 8",
    opacity: 0.85
  }).addTo(map);

  const stopMarkers = {};
  stops.forEach((ch, i) => {
    const icon = L.divIcon({
      className: "",
      html: `<div class="stamp-marker stamp-marker--map" data-state="locked" style="--accent:${ch.accent || "#9C3B2C"}">${ch.number}</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });
    const marker = L.marker([ch.lat, ch.lng], { icon }).addTo(map);
    marker.on("click", () => {
      const chapterIndex = journeyChapters.indexOf(ch);
      if (chapterIndex <= unlockedUpTo) scrollToChapter(chapterIndex);
    });
    stopMarkers[ch.id] = marker;
  });

  function updateMapMarkerStates(currentStopIndex) {
    stops.forEach((ch, i) => {
      const el = stopMarkers[ch.id].getElement();
      if (!el) return;
      const stampEl = el.querySelector(".stamp-marker");
      if (!stampEl) return;
      stampEl.dataset.state = i < currentStopIndex ? "done" : i === currentStopIndex ? "current" : "locked";
    });
  }

  // Plane marker
  const planeIcon = L.divIcon({
    className: "",
    html: `<div class="plane-marker" id="plane-icon">✈</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
  const planeMarker = L.marker([PHANTOM_START.lat, PHANTOM_START.lng], {
    icon: planeIcon,
    interactive: false
  });

  // ---------- FLIGHT ANIMATION ----------
  function flyPlaneTo(from, to, duration, onDone) {
    if (!planeMarker._map) planeMarker.addTo(map);
    const start = performance.now();
    const dLat = to.lat - from.lat;
    const dLng = to.lng - from.lng;
    const dist = Math.hypot(dLat, dLng) || 0.0001;
    const perpLat = -dLng / dist;
    const perpLng = dLat / dist;
    const arcHeight = Math.min(dist * 0.28, 6);
    const angle = (Math.atan2(dLng, dLat) * 180) / Math.PI;
    const planeEl = document.getElementById("plane-icon");
    if (planeEl) planeEl.style.transform = `rotate(${angle}deg)`;

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const lat = from.lat + dLat * eased + perpLat * Math.sin(Math.PI * t) * arcHeight;
      const lng = from.lng + dLng * eased + perpLng * Math.sin(Math.PI * t) * arcHeight;
      planeMarker.setLatLng([lat, lng]);
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        onDone();
      }
    }
    requestAnimationFrame(frame);
  }

  // ---------- NAVIGATION LOGIC ----------
  function scrollToChapter(i) {
    const ch = journeyChapters[i];
    const el = document.getElementById(`chapter-${ch.id}`);
    if (el) {
      try {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (err) {
        console.warn("scrollIntoView failed:", err);
      }
      updateNav(i);
    }
  }

  function revealChapter(i) {
    if (i >= journeyChapters.length) return;
    const ch = journeyChapters[i];
    const el = document.getElementById(`chapter-${ch.id}`);
    if (el) el.hidden = false;
    if (i > unlockedUpTo) unlockedUpTo = i;
    updateAdvanceButton();
  }

  function updateAdvanceButton() {
    const dock = document.getElementById("flight-dock");
    const label = document.getElementById("advance-label");
    const nextIndex = unlockedUpTo + 1;
    if (nextIndex >= journeyChapters.length) {
      dock.hidden = true;
      return;
    }
    dock.hidden = false;
    const nextCh = journeyChapters[nextIndex];
    label.textContent = nextCh.isFinal ? "Finish" : `Fly to ${nextCh.destination.split(",")[0]}`;
  }

  function advanceJourney() {
    if (flying) return;
    const nextIndex = unlockedUpTo + 1;
    if (nextIndex >= journeyChapters.length) return;
    const nextCh = journeyChapters[nextIndex];

    if (nextCh.isFinal) {
      revealChapter(nextIndex);
      scrollToChapter(nextIndex);
      return;
    }

    flying = true;
    const advanceBtn = document.getElementById("advance-btn");
    advanceBtn.disabled = true;

    const finish = () => {
      flying = false;
      advanceBtn.disabled = false;
    };

    const stopIndex = stops.indexOf(nextCh);
    const from = stopIndex === 0
      ? PHANTOM_START
      : { lat: stops[stopIndex - 1].lat, lng: stops[stopIndex - 1].lng };
    const to = { lat: nextCh.lat, lng: nextCh.lng };

    try {
      document.getElementById("flight-section").scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      console.warn("Scroll to map failed, continuing anyway:", err);
    }

    // Give the scroll a beat before starting the flight animation.
    setTimeout(() => {
      const land = () => {
        updateMapMarkerStates(stopIndex + 1);
        revealChapter(nextIndex);
        finish();
        setTimeout(() => scrollToChapter(nextIndex), 350);
      };
      try {
        flyPlaneTo(from, to, 1400, land);
      } catch (err) {
        // If the flight animation fails for any reason, never leave the
        // journey stuck — reveal the chapter immediately instead.
        console.warn("Flight animation failed, revealing chapter directly:", err);
        land();
      }
    }, 450);
  }

  const passportCover = document.getElementById("passport-cover");
  passportCover.addEventListener("click", () => {
    passportCover.classList.add("is-open");
  });

  document.getElementById("begin-journey").addEventListener("click", () => {
    document.body.classList.add("journey-started");
    advanceJourney();
  });

  document.getElementById("advance-btn").addEventListener("click", advanceJourney);

  root.addEventListener("click", (e) => {
    const btn = e.target.closest(".continue-btn, .ticket-cta");
    if (btn) {
      advanceJourney();
      return;
    }
    if (e.target.closest("#restart-journey")) {
      document.getElementById("cover").scrollIntoView({ behavior: "smooth" });
    }
  });
});
