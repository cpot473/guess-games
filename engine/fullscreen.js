// Full-screen toggle: a finger-sized button in the top-right corner of every page that loads this file.
// Browsers only allow full screen straight after a tap, and leave it when the page changes, so each
// page carries its own button. The part above the page code is pure and also loads in node for the tests.

// The full-screen calls this browser supports (standard, or the older webkit-prefixed ones), or null.
function fullscreenApi(doc) {
  const el = doc.documentElement;
  if (doc.fullscreenEnabled && el.requestFullscreen) {
    return { enter: () => el.requestFullscreen(), exit: () => doc.exitFullscreen(), isOn: () => !!doc.fullscreenElement, event: "fullscreenchange" };
  }
  if (doc.webkitFullscreenEnabled && el.webkitRequestFullscreen) {
    return { enter: () => el.webkitRequestFullscreen(), exit: () => doc.webkitExitFullscreen(), isOn: () => !!doc.webkitFullscreenElement, event: "webkitfullscreenchange" };
  }
  return null;
}

const FULLSCREEN_ICONS = {
  enter: '<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>',
  exit: '<path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5"/>',
};

// The button's label and icon for the current state.
function fullscreenButton(isOn) {
  const label = isOn ? "Leave full screen" : "Full screen";
  const icon = FULLSCREEN_ICONS[isOn ? "exit" : "enter"];
  return { label, html: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg>` };
}

if (typeof module !== "undefined") module.exports = { fullscreenApi, fullscreenButton };
else {
  const api = fullscreenApi(document);
  if (api) {
    const btn = document.createElement("button");
    btn.id = "fullscreen";
    btn.type = "button";
    const show = () => {
      const b = fullscreenButton(api.isOn());
      btn.innerHTML = b.html;
      btn.title = b.label;
      btn.setAttribute("aria-label", b.label);
    };
    btn.addEventListener("click", () => {
      const r = api.isOn() ? api.exit() : api.enter();
      if (r && r.catch) r.catch(() => {}); // refused (e.g. not allowed here): stay as we are
    });
    document.addEventListener(api.event, show);
    show();
    document.body.appendChild(btn);
  }
}
