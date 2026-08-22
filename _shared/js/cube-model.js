// Shared: G9 Biology _shared/js/cube-model.js — keep in sync.
// A slider that grows a model cell and redraws surface area, volume and the ratio live,
// with the class time-to-clear data plotted beside it.

(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const store = window.G9Storage;
  const classData = ((window.__CONTENT__ && window.__CONTENT__.class_data) || []).map((row) => ({
    side: Number(row.side_cm),
    minutes: Number(row.minutes),
  }));

  const MIN_SIDE = 0.5;
  const MAX_SIDE = 10;
  const PLOT = { width: 320, height: 240, left: 46, right: 14, top: 14, bottom: 36 };

  function el(name, attrs, text) {
    const node = document.createElementNS(SVG_NS, name);
    Object.keys(attrs).forEach((k) => node.setAttribute(k, attrs[k]));
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function canvas(host, width, height, label) {
    host.textContent = "";
    const svg = el("svg", { viewBox: `0 0 ${width} ${height}`, role: "img" });
    svg.setAttribute("aria-label", label);
    host.appendChild(svg);
    return svg;
  }

  function show(value) {
    if (Number.isInteger(value)) return String(value);
    return value >= 100 ? value.toFixed(0) : value.toFixed(value >= 10 ? 1 : 2);
  }

  function measure(side) {
    const area = 6 * side * side;
    const volume = side * side * side;
    return { area, volume, ratio: area / volume };
  }

  function face(points, fill) {
    return el("polygon", { points, fill, stroke: "#0F3D3E", "stroke-width": "1.6" });
  }

  function drawCube(host, side) {
    // Drawn to a compressed scale, not to size. A 10 cm cube drawn true beside a 0.5 cm one
    // would leave the small one a dot, and the number beside it is what carries the meaning.
    const s = 30 + 130 * Math.sqrt((side - MIN_SIDE) / (MAX_SIDE - MIN_SIDE));
    const d = s * 0.45;
    const x = 110 - s / 2;
    const y = 190 - s;
    const svg = canvas(host, 220, 210, `A cube with side ${show(side)} centimeters`);
    svg.appendChild(face(`${x},${y + s} ${x + s},${y + s} ${x + s},${y} ${x},${y}`, "#FFFFFF"));
    svg.appendChild(face(`${x},${y} ${x + s},${y} ${x + s + d},${y - d} ${x + d},${y - d}`, "#EEF3F7"));
    svg.appendChild(face(`${x + s},${y + s} ${x + s + d},${y + s - d} ${x + s + d},${y - d} ${x + s},${y}`, "#D6DEE6"));
    svg.appendChild(el("text", { x: 110, y: 205, "text-anchor": "middle", "font-size": "13", fill: "#5E6F70" },
      `side ${show(side)} cm`));
  }

  function plotPoints() {
    const maxSide = Math.max(...classData.map((d) => d.side));
    const maxMinutes = Math.max(...classData.map((d) => d.minutes));
    const innerWidth = PLOT.width - PLOT.left - PLOT.right;
    const innerHeight = PLOT.height - PLOT.top - PLOT.bottom;
    return classData.map((d) => ({
      data: d,
      x: PLOT.left + (d.side / maxSide) * innerWidth,
      y: PLOT.top + innerHeight - (d.minutes / maxMinutes) * innerHeight,
    }));
  }

  function reading(d) {
    return `${d.side} cm took ${d.minutes} ${d.minutes === 1 ? "minute" : "minutes"}`;
  }

  function plotDescription() {
    const readings = classData.map(reading).join(", ");
    return `Time to clear against side of cube, from the class data: ${readings}. The curve rises more and more steeply.`;
  }

  function axes(svg) {
    const axisY = PLOT.height - PLOT.bottom;
    const stroke = { stroke: "#0F3D3E", "stroke-width": "1.6" };
    svg.appendChild(el("line", { x1: PLOT.left, y1: PLOT.top, x2: PLOT.left, y2: axisY, ...stroke }));
    svg.appendChild(el("line", { x1: PLOT.left, y1: axisY, x2: PLOT.width - PLOT.right, y2: axisY, ...stroke }));
    const midX = PLOT.left + (PLOT.width - PLOT.left - PLOT.right) / 2;
    svg.appendChild(el("text", { x: midX, y: PLOT.height - 4, "text-anchor": "middle", "font-size": "11", fill: "#1A2B2C" },
      "Side of cube (cm)"));
    // Anchored at the middle of the axis, not at its top, so the rotated label grows in both
    // directions from the center of the plot instead of running off the top of the box.
    const labelY = PLOT.top + (axisY - PLOT.top) / 2;
    svg.appendChild(el("text", { x: 14, y: labelY, "font-size": "11", fill: "#1A2B2C",
      "text-anchor": "middle", transform: `rotate(-90 14 ${labelY})` }, "Time to clear (min)"));
    const maxMinutes = Math.max(...classData.map((d) => d.minutes));
    [[0, axisY], [maxMinutes, PLOT.top]].forEach(([value, y]) => {
      svg.appendChild(el("text", { x: PLOT.left - 6, y: y + 4, "text-anchor": "end",
        "font-size": "10", fill: "#5E6F70" }, String(value)));
    });
    return axisY;
  }

  function drawPlot(host) {
    if (!classData.length) return;
    const svg = canvas(host, PLOT.width, PLOT.height, plotDescription());
    const axisY = axes(svg);
    const points = plotPoints();
    const path = points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
    svg.appendChild(el("path", { d: path, fill: "none", stroke: "#0F3D3E", "stroke-width": "1.6",
      "stroke-dasharray": "4 3" }));
    points.forEach((p) => {
      const dot = el("circle", { cx: p.x.toFixed(1), cy: p.y.toFixed(1), r: 4, fill: "#F2A65A",
        stroke: "#0F3D3E", "stroke-width": "1.4" });
      dot.appendChild(el("title", {}, reading(p.data)));
      svg.appendChild(dot);
      svg.appendChild(el("text", { x: p.x.toFixed(1), y: axisY + 15, "text-anchor": "middle",
        "font-size": "10", fill: "#5E6F70" }, String(p.data.side)));
    });
  }

  function verdict(ratio) {
    if (ratio >= 6) return "Plenty of surface for every unit of inside. Exchange keeps up easily.";
    if (ratio >= 3) return "Still workable, but the volume is catching up with the surface.";
    if (ratio >= 1) return "The volume is winning. The middle is waiting a long time now.";
    return "Less than one unit of surface for every unit of inside. No cell lives like this.";
  }

  function row(host, label, value, extraClass) {
    const p = document.createElement("p");
    p.className = "cube-model__row" + (extraClass ? " " + extraClass : "");
    const name = document.createElement("span");
    name.textContent = label;
    const strong = document.createElement("strong");
    strong.textContent = value;
    p.appendChild(name);
    p.appendChild(strong);
    host.appendChild(p);
  }

  function drawReadout(host, side) {
    const m = measure(side);
    host.textContent = "";
    row(host, "Side", `${show(side)} cm`);
    row(host, "Surface area, 6 x s x s", `${show(m.area)} cm²`);
    row(host, "Volume, s x s x s", `${show(m.volume)} cm³`);
    row(host, "Surface area : volume", `${show(m.ratio)} : 1`, "cube-model__row--ratio");
    const note = document.createElement("p");
    note.className = "cube-model__verdict";
    note.textContent = verdict(m.ratio);
    host.appendChild(note);
  }

  function mount() {
    const root = document.getElementById("cube-model");
    if (!root) return;
    const slider = root.querySelector("#cube-slider");
    const cubeHost = root.querySelector("#cube-figure");
    const readout = root.querySelector("#cube-readout");
    const saved = Number(store.read("cube-model.side"));
    slider.value = saved >= MIN_SIDE && saved <= MAX_SIDE ? saved : 1;
    function render() {
      const side = Number(slider.value);
      drawCube(cubeHost, side);
      drawReadout(readout, side);
      store.write("cube-model.side", side);
    }
    render();
    drawPlot(root.querySelector("#cube-plot"));
    slider.addEventListener("input", render);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
