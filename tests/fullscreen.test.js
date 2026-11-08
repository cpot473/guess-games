const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { fullscreenApi, fullscreenButton } = require("../engine/fullscreen.js");
const GAMES = require("../games/index.js");

const ROOT = path.join(__dirname, "..");

test("uses the standard full-screen calls when the browser has them", () => {
  const calls = [];
  const doc = {
    fullscreenEnabled: true, fullscreenElement: null,
    documentElement: { requestFullscreen: () => calls.push("enter"), webkitRequestFullscreen: () => calls.push("webkit") },
    exitFullscreen: () => calls.push("exit"),
  };
  const api = fullscreenApi(doc);
  assert.equal(api.event, "fullscreenchange");
  assert.equal(api.isOn(), false);
  api.enter();
  doc.fullscreenElement = doc.documentElement;
  assert.equal(api.isOn(), true);
  api.exit();
  assert.deepEqual(calls, ["enter", "exit"]);
});

test("falls back to the webkit-prefixed calls", () => {
  const calls = [];
  const doc = {
    webkitFullscreenEnabled: true, webkitFullscreenElement: null,
    documentElement: { webkitRequestFullscreen: () => calls.push("enter") },
    webkitExitFullscreen: () => calls.push("exit"),
  };
  const api = fullscreenApi(doc);
  assert.equal(api.event, "webkitfullscreenchange");
  api.enter();
  doc.webkitFullscreenElement = doc.documentElement;
  assert.equal(api.isOn(), true);
  api.exit();
  assert.deepEqual(calls, ["enter", "exit"]);
});

test("no button when full screen is unsupported or disabled", () => {
  assert.equal(fullscreenApi({ documentElement: {} }), null);
  assert.equal(fullscreenApi({ fullscreenEnabled: false, documentElement: { requestFullscreen() {} } }), null);
});

test("the button's label and icon follow the state", () => {
  const off = fullscreenButton(false), on = fullscreenButton(true);
  assert.equal(off.label, "Full screen");
  assert.equal(on.label, "Leave full screen");
  assert.notEqual(off.html, on.html);
  assert.match(off.html, /^<svg[^>]*aria-hidden="true"/);
});

test("the launcher and every game page load the full-screen button", () => {
  const pages = [["index.html", "engine/fullscreen.js"],
    ...GAMES.map(g => [`games/${g}/index.html`, "../../engine/fullscreen.js"])];
  for (const [page, src] of pages) {
    const html = fs.readFileSync(path.join(ROOT, page), "utf8");
    assert.ok(html.includes(`<script src="${src}"></script>`), `${page} should load ${src}`);
  }
});
