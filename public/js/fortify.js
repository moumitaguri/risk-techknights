const startFortify = function(event) {
  const selectedTerritory = event.target;
  const territoryName = selectedTerritory.parentElement.id;
  fetch("/fortify", sendPostRequest({ territoryName }))
    .then(res => res.json())
    .then(fortifyingDetails => {
      selectedTerritory.style.opacity = "1.5";
      displayFortifySection(fortifyingDetails.sourceTerritory);
    });
};

const displayFortifySection = function(territory) {
  const unit = territory.militaryUnits - 1;
  document.getElementById("selectMilitaryUnit").style.display = "block";
  document.getElementById("number").innerText = unit;
  document.getElementById("hdnNumber").value = unit;
};

const increaseValue = function() {
  const maxValue = parseInt(document.getElementById("hdnNumber").value);
  let value = parseInt(document.getElementById("number").innerText);
  value++;
  value > maxValue ? --value : value;
  document.getElementById("number").innerText = value;
};

const decreaseValue = function() {
  let value = parseInt(document.getElementById("number").innerText);
  value--;
  value < 0 ? ++value : value;
  document.getElementById("number").innerText = value;
};
