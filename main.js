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
