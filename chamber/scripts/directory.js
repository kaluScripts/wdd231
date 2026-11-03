const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

const levelNames = { 1: "Member", 2: "Silver Member", 3: "Gold Member" };

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Could not load members:", error);
    membersContainer.innerHTML = "<p>Sorry, the member directory could not be loaded right now.</p>";
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-header">
        <h2>${member.name}</h2>
        <p class="tagline">${member.tagline}</p>
      </div>
      <div class="card-body">
        <img src="images/${member.image}" alt="${member.name} logo" width="240" height="240" loading="lazy">
        <div class="details">
          <p class="level level-${member.membership}">${levelNames[member.membership]}</p>
          <p><span class="label">Address:</span> ${member.address}</p>
          <p><span class="label">Phone:</span> ${member.phone}</p>
          <p><span class="label">Email:</span> <a href="mailto:${member.email}">${member.email.replace("@", "@<wbr>")}</a></p>
          
          <p><span class="label">URL:</span> <a href="${member.website}">${member.website.replace(/^https?:\/\//, "")}</a></p>
        </div>
      </div>
    `;
    membersContainer.appendChild(card);
  });
}

function setView(view) {
  const isGrid = view === "grid";
  membersContainer.classList.toggle("grid", isGrid);
  membersContainer.classList.toggle("list", !isGrid);
  gridButton.classList.toggle("active", isGrid);
  listButton.classList.toggle("active", !isGrid);
  gridButton.setAttribute("aria-pressed", isGrid);
  listButton.setAttribute("aria-pressed", !isGrid);
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

getMembers();