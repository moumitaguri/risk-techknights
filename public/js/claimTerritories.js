const getParentElement = function (element) {
  if (element.tagName == "a") return element.id;
  return element.parentElement.id;
};

const sendTerritoryAndValidate = function (event) {
  let territoryName = getParentElement(event.target);
  fetch("/claimTerritory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ territoryName })
  })
    .then(res => res.json())
    .then(territoryDetails => {
      const {
        color,
        isValidTerritory,
        territoryMilitaryUnits,
        nextPlayer
      } = territoryDetails;
      if (isValidTerritory) {
        changeColorAndMilitaryUnits(
          territoryName,
          color,
          territoryMilitaryUnits
        );
        updatePlayerDetails(nextPlayer);
      }
    });
};

const updatePlayerDetails = function (militaryUnits) {
  document.getElementById(
    "militaryUnits"
  ).innerText = `Remaining Military Units: ${militaryUnits}`;
};

const updateInstruction = function (instruction) {
  document.getElementById("instruction").innerText = instruction;
};

const updateCurrentPlayer = function ({ name, color, militaryUnits }) {
  playerNameDiv = document.getElementById("playerName");
  playerNameDiv.innerText = `${name}'s Turn`;
  playerNameDiv.style.backgroundColor = color;
}

const updateCurrentPhase = function () {
  document.getElementById('1').className = 'btn';
  document.getElementById('2').className = 'btn';
  document.getElementById('3').className = 'btn';
  document.getElementById('4').className = 'btn';
}

const highlightPhase = function (phase) {
  updateCurrentPhase();
  document.getElementById(phase).className = 'highlight btn';
  document.getElementById('currentPhase').value = phase + ' Done'
}


const initializeGamePage = function () {
  fetch("/initializeGamePage")
    .then(res => res.json())
    .then(playerDetails => {
      const { currentPlayer, territories, instruction, highlight, phase } = playerDetails;
      renderOldTerritories(territories, highlight);
      updateCurrentPlayer(currentPlayer);
      updateInstruction(instruction);
      updatePlayerDetails(currentPlayer.militaryUnits);
      highlightPhase(phase);
    });
};


const blurTerritories = function (territoryName) {
  document.getElementById(territoryName).getElementsByTagName("path")[0].style.opacity = "0.5";
};


const renderOldTerritories = function (territories, highlight) {

  const renderTerritories = Object.keys(territories).filter(territory => !highlight.includes(territory));
  renderTerritories.forEach(territoryName => {
    const territory = territories[territoryName];
    const ruler = territory.ruler;
    if (ruler) {
      changeColorAndMilitaryUnits(territoryName, ruler.color, territory.militaryUnits);
      blurTerritories(territoryName);
    }
  });
};

setInterval(initializeGamePage, 1000);
