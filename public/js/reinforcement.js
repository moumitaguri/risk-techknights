const startReinforcement = function(event) {
  const selectedTerritory = event.target;
  const territoryName = selectedTerritory.parentElement.id;
  fetch("/reinforcement", sendPostRequest({ territoryName }))
    .then(res => res.json())
    .then(reinforcementDetails => {
      selectedTerritory.style.opacity = "1.5";
      displayReinforceSection(reinforcementDetails.player);
    });
};

const displayReinforceSection = function(player) {
  const unit = player.militaryUnits;
  document.getElementById("selectMilitaryUnit").style.display = "block";
  document.getElementById("number").innerText = unit;
  document.getElementById("hdnNumber").value = unit;
};

const reinforcementComplete = function() {
  const militaryUnits = +document.getElementById("number").innerText;
  fetch("/reinforcementComplete", sendPostRequest({ militaryUnits }))
    .then(res => res.json())
    .then(player => {
      document.getElementById("selectMilitaryUnit").style.display = "none";
      if (player.militaryUnits < 1 && player.phase == 2) {
        changeTurnAndPhase();
      }
      if (player.militaryUnits < 1 && player.phase == 3) {
        changePlayerPhase();
      }
    });
};

const changeTurnAndPhase = function() {
  fetch("/changeTurnAndPhase");
};
