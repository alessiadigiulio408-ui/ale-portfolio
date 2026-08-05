document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("chapters-root");
  const nav = document.getElementById("progress-nav");
  const tagline = document.getElementById("cover-tagline");
  tagline.textContent = coverTagline;

  let unlockedUpTo = -1; // -1 = only cover visible

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
      el.classList.remove("is-current", "is-done");
      el.disabled = i > unlockedUpTo;
      if (i === current) el.classList.add("is-current");
      else if (i <= unlockedUpTo) el.classList.add("is-done");
    });
  }

  // ---------- BUILD CHAPTER PHOTO GRID ----------
  function photoFilename(name) {
    return `
      <div class="polaroid">
        <img src="images/${name}" alt="" loading="lazy"
             onerror="this.parentElement.innerHTML='<div class=&quot;polaroid-placeholder&quot;>+ photo</div>'">
      </div>
    `;
  }

  function entryHtml(entry) {
    return `
      <div class="entry">
        <span class="entry-date">${entry.dateLabel}</span>
        <h3 class="entry-role">${entry.role}</h3>
        ${entry.org ? `<p class="entry-org">${entry.org}</p>` : ""}
        <p class="entry-text">${entry.text}</p>
        <div class="photo-grid">${entry.photos.map(photoFilename).join("")}</div>
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
    } else {
      section.innerHTML = `
        <div class="chapter-inner">
          <p class="chapter-kicker">${ch.kicker}</p>
          <div class="locator-map" id="locator-${ch.id}"></div>
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

  // ---------- LOCATOR MAPS (decorative, non-interactive) ----------
  journeyChapters.forEach((ch) => {
    if (ch.isFinal) return;
    const el = document.getElementById(`locator-${ch.id}`);
    if (!el) return;
    const map = L.map(el, {
      center: [ch.lat, ch.lng],
      zoom: 10,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      attributionControl: false
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      maxZoom: 14
    }).addTo(map);
    const icon = L.divIcon({
      className: "",
      html: `<div class="stamp-marker stamp-marker--small">${ch.destination.slice(0, 1)}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
    L.marker([ch.lat, ch.lng], { icon }).addTo(map);
  });

  // ---------- NAVIGATION LOGIC ----------
  function scrollToChapter(i) {
    const ch = journeyChapters[i];
    const el = document.getElementById(`chapter-${ch.id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      updateNav(i);
    }
  }

  function unlockChapter(i) {
    if (i >= journeyChapters.length) return;
    const ch = journeyChapters[i];
    const el = document.getElementById(`chapter-${ch.id}`);
    if (el) el.hidden = false;
    if (i > unlockedUpTo) unlockedUpTo = i;
    scrollToChapter(i);
  }

  document.getElementById("begin-journey").addEventListener("click", () => {
    unlockChapter(0);
  });

  root.addEventListener("click", (e) => {
    const btn = e.target.closest(".continue-btn");
    if (btn) {
      const i = Number(btn.dataset.index);
      unlockChapter(i + 1);
      return;
    }
    if (e.target.closest("#restart-journey")) {
      document.getElementById("cover").scrollIntoView({ behavior: "smooth" });
    }
  });
});
