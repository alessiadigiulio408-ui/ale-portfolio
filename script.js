document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("journey-map", {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView([30, -30], 2);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 18
  }).addTo(map);

  // Draw the route arc connecting cities in story order
  const routeLatLngs = journeyStops.map(s => [s.lat, s.lng]);
  L.polyline(routeLatLngs, {
    color: "#A9843F",
    weight: 2,
    dashArray: "2 8",
    opacity: 0.8
  }).addTo(map);

  const bounds = [];

  journeyStops.forEach((stop) => {
    bounds.push([stop.lat, stop.lng]);

    const icon = L.divIcon({
      className: "",
      html: `<div class="stamp-marker">${stop.city.slice(0, 1)}</div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);

    const popupHtml = `
      <div class="popup-city">${stop.city}</div>
      <div class="popup-country">${stop.country}</div>
      <button class="popup-btn" data-stop="${stop.id}">Open page</button>
    `;
    marker.bindPopup(popupHtml);

    marker.on("popupopen", () => {
      const btn = document.querySelector(`.popup-btn[data-stop="${stop.id}"]`);
      if (btn) btn.addEventListener("click", () => openPassportPage(stop));
    });
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [40, 40] });
  }

  // ===== MODAL =====
  const overlay = document.getElementById("modal-overlay");
  const pageInner = document.getElementById("passport-page-inner");
  const closeBtn = document.getElementById("modal-close");

  function openPassportPage(stop) {
    const chaptersHtml = stop.chapters.map(ch => `
      <div class="chapter">
        <span class="chapter-date">${ch.dateLabel}</span>
        <h3 class="chapter-title">${ch.title}</h3>
        ${ch.org ? `<p class="chapter-org">${ch.org}</p>` : ""}
        <p class="chapter-text">${ch.text}</p>
        <div class="photo-grid">
          ${ch.photos.map(photoFilename).join("")}
        </div>
      </div>
    `).join("");

    pageInner.innerHTML = `
      <h2 class="modal-city-title" id="modal-city-title">${stop.city}</h2>
      <p class="modal-country">${stop.country}</p>
      ${chaptersHtml}
    `;

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function photoFilename(name) {
    const src = `images/${name}`;
    return `
      <div class="polaroid">
        <img src="${src}" alt="" loading="lazy"
             onerror="this.parentElement.innerHTML='<div class=&quot;polaroid-placeholder&quot;>+ photo</div>'">
      </div>
    `;
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
