const users = [
  {
    name: "Ava Patel",
    title: "Product Manager",
    email: "ava.patel@example.com",
    location: "Seattle, WA",
    skills: ["Roadmaps", "User research", "Backlog"],
    status: "Online",
  },
  {
    name: "Jonas Lee",
    title: "Frontend Engineer",
    email: "jonas.lee@example.com",
    location: "Austin, TX",
    skills: ["React", "Animations", "Accessibility"],
    status: "Online",
  },
  {
    name: "Camila Duarte",
    title: "Data Scientist",
    email: "camila.duarte@example.com",
    location: "New York, NY",
    skills: ["Python", "ML Ops", "Storytelling"],
    status: "Away",
  },
  {
    name: "Omar Farouk",
    title: "Design Lead",
    email: "omar.farouk@example.com",
    location: "Denver, CO",
    skills: ["Design systems", "Prototyping", "Facilitation"],
    status: "Online",
  },
  {
    name: "Sofia Rossi",
    title: "QA Analyst",
    email: "sofia.rossi@example.com",
    location: "Remote · EU",
    skills: ["Automation", "Playwright", "Regression"],
    status: "Away",
  },
  {
    name: "Mateo Navarro",
    title: "DevOps Engineer",
    email: "mateo.navarro@example.com",
    location: "San Diego, CA",
    skills: ["Kubernetes", "CI/CD", "Observability"],
    status: "Online",
  },
];

function initialsFromName(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function createTag(label, muted = false) {
  const tag = document.createElement("span");
  tag.className = muted ? "tag muted" : "tag";
  tag.textContent = label;
  return tag;
}

function createCard(user) {
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${user.name}, ${user.title}`);

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = initialsFromName(user.name);

  const body = document.createElement("div");

  const name = document.createElement("h2");
  name.textContent = user.name;

  const title = document.createElement("p");
  title.className = "meta";
  title.textContent = user.title;

  const location = document.createElement("p");
  location.className = "meta";
  location.textContent = user.location;

  const status = document.createElement("p");
  status.className = "status";
  const statusDot = document.createElement("span");
  statusDot.className = "status-dot";
  status.appendChild(statusDot);
  status.append(user.status);

  const tags = document.createElement("div");
  tags.className = "tags";
  tags.append(createTag(user.email, true));
  user.skills.forEach((skill) => tags.appendChild(createTag(skill)));

  body.append(name, title, location, status, tags);
  card.append(avatar, body);

  return card;
}

function renderGrid() {
  const grid = document.getElementById("user-grid");
  grid.replaceChildren(...users.map(createCard));

  const count = document.getElementById("user-count");
  count.textContent = users.length;
}

renderGrid();

// Color platelet experience
const canvas = document.getElementById("color-canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const hexValue = document.getElementById("hex-value");
const rgbValue = document.getElementById("rgb-value");
const activeSwatch = document.getElementById("active-swatch");
const manualColor = document.getElementById("manual-color");
const platelets = document.getElementById("color-plates");

function hslToHex(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function drawColorSpace() {
  const width = canvas.width;
  const height = canvas.height;

  const hueGradient = ctx.createLinearGradient(0, 0, width, 0);
  for (let i = 0; i <= 360; i += 10) {
    hueGradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
  }
  ctx.fillStyle = hueGradient;
  ctx.fillRect(0, 0, width, height);

  const whiteGradient = ctx.createLinearGradient(0, 0, 0, height);
  whiteGradient.addColorStop(0, "rgba(255,255,255,1)");
  whiteGradient.addColorStop(0.5, "rgba(255,255,255,0)");
  whiteGradient.addColorStop(1, "rgba(0,0,0,0.85)");
  ctx.fillStyle = whiteGradient;
  ctx.fillRect(0, 0, width, height);
}

function updateReadout({ r, g, b }) {
  const hex = `#${[r, g, b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")}`.toUpperCase();
  hexValue.textContent = hex;
  rgbValue.textContent = `rgb(${r}, ${g}, ${b})`;
  activeSwatch.style.background = hex;
  manualColor.value = hex.toLowerCase();
  renderPlatelets(hex);
}

function pickColorFromCanvas(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const { data } = ctx.getImageData(x, y, 1, 1);
  updateReadout({ r: data[0], g: data[1], b: data[2] });
}

function createPlatelet(hex, label) {
  const platelet = document.createElement("button");
  platelet.className = "platelet";
  platelet.type = "button";
  platelet.title = `${label} — ${hex}`;
  platelet.setAttribute("aria-label", `${label} platelet ${hex}`);

  const overlay = document.createElement("span");
  overlay.style.background = hex;

  const gradient = document.createElement("span");
  gradient.style.background = `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.25))`;

  const labelEl = document.createElement("span");
  labelEl.className = "label";
  labelEl.textContent = hex;

  platelet.append(overlay, gradient, labelEl);
  platelet.addEventListener("click", () => {
    const rgb = hexToRgb(hex);
    updateReadout(rgb);
  });

  return platelet;
}

function renderPlatelets(baseHex) {
  const hues = Array.from({ length: 12 }, (_, i) => i * 30);
  platelets.replaceChildren();

  hues.forEach((hue) => {
    const row = document.createElement("div");
    row.className = "platelet-row";

    const lightnessLevels = [0.98, 0.85, 0.7, 0.55, 0.4, 0.25];
    lightnessLevels.forEach((lightness) => {
      const color = hslToHex(hue, 0.72, lightness);
      row.appendChild(createPlatelet(color, `Hue ${hue}°`));
    });

    platelets.appendChild(row);
  });

  if (baseHex) {
    const customRow = document.createElement("div");
    customRow.className = "platelet-row";

    const { r, g, b } = hexToRgb(baseHex);
    const weightings = [1, 0.85, 0.7, 0.55, 0.4, 0.25];
    weightings.forEach((weight, index) => {
      const color = `rgb(${Math.round(r * weight)}, ${Math.round(g * weight)}, ${Math.round(
        b * weight
      )})`;
      customRow.appendChild(createPlatelet(color, index === 0 ? "Active" : "Shade"));
    });

    platelets.prepend(customRow);
  }
}

function handleManualColor(event) {
  const value = event.target.value;
  const rgb = hexToRgb(value);
  updateReadout(rgb);
}

drawColorSpace();
canvas.addEventListener("click", pickColorFromCanvas);
manualColor.addEventListener("input", handleManualColor);

// Seed UI with initial value from manual input
handleManualColor({ target: manualColor });
