const spotlightContainer = document.querySelector("#spotlights");

const levelNames = { 2: "Silver Member", 3: "Gold Member" };

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const members = await response.json();
    const eligible = members.filter((member) => member.membership === 2 || member.membership === 3);
    const picks = shuffle(eligible).slice(0, 3);
    displaySpotlights(picks);
  } catch (error) {
    console.error("Could not load spotlights:", error);
    spotlightContainer.innerHTML = "<p>Sorry, the member spotlights could not be loaded right now.</p>";
  }
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-header">
        <h3>${member.name}</h3>
        <p class="tagline">${member.tagline}</p>
      </div>
      <div class="card-body">
        <img src="images/${member.image}" alt="${member.name} logo" width="240" height="240" loading="lazy">
        <div class="details">
          <p class="level level-${member.membership}">${levelNames[member.membership]}</p>
          <p><span class="label">Address:</span> ${member.address}</p>
          <p><span class="label">Phone:</span> ${member.phone}</p>
          <p><span class="label">URL:</span> <a href="${member.website}">${member.website.replace(/^https?:\/\//, "")}</a></p>
        </div>
      </div>
    `;
    spotlightContainer.appendChild(card);
  });
}

getSpotlights();