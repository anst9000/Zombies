const headerText = document.getElementById("header-text");
const allHouses = document.getElementsByClassName("house");
const epidemicsText = document.getElementById("epidemics");
const roundsPerEpidemicText = document.getElementById("rounds-per-epidemic");
const roundsText = document.getElementById("rounds");
const body = document.body;
const totalHouses = 100;
let nrOfZombies = 1;
let newZombies = 0;
let buttonClicks = 0;
let allAreZombies = false;
let storeRounds = false;
let totalRounds = 0;
let epidemics = 0;

epidemics = parseInt(localStorage.getItem("epidemics") || 0);
totalRounds = parseInt(localStorage.getItem("rounds") || 0);

epidemicsText.textContent = "Epidemics: " + epidemics;
if (epidemics == 0) {
  roundsPerEpidemicText.textContent = "Rounds/Epidemic: 0.0";
} else {
  roundsPerEpidemicText.textContent =
    "Rounds/Epidemic: " + Math.round((totalRounds / epidemics) * 10) / 10;
}
roundsText.textContent = "Rounds: " + buttonClicks;

const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

const printTotalZombies = (zombies) => {
  if (zombies != 1) {
    headerText.textContent = `${zombies} zombies`;
  } else {
    headerText.textContent = `${zombies} zombie`;
  }
};

let houses = [];

const createHouses = (totalHouses) => {
  for (let house = 0; house < totalHouses; house++) {
    houses.push({ healthy: true });
  }
};

const infectHouse = (nr) => {
  houses[nr].healthy = false;
  allHouses[nr].classList.add("infected");
  allHouses[nr].classList.remove("healthy");
};

const visitHouse = () => {
  const nr = Math.floor(Math.random() * 100) + 0;

  infectHouse(nr);
};

const countInfectedHouses = () => {
  const infectedHouses = houses.filter((v) => !v.healthy).length;

  return infectedHouses;
};

$.fn.redraw = function () {
  $(this).each(function () {
    var redraw = this.offsetHeight;
  });
};

createHouses(totalHouses);
// console.log(`total houses are ${houses.length}`);

$("#update").click(function () {
  epidemics = parseInt(localStorage.getItem("epidemics") || 0);

  if (epidemics == 10) {
    localStorage.removeItem("epidemics");
    localStorage.removeItem("rounds");
    epidemicsText.textContent = "Epidemics: 0";
    roundsPerEpidemicText.textContent = "Rounds/Epidemic: 0.0";
    roundsText.textContent = "Rounds: 0";
  }

  totalInfectedHouses = countInfectedHouses();
  nrOfZombies = totalInfectedHouses + 1;
  printTotalZombies(nrOfZombies);

  if (nrOfZombies < 101) {
    buttonClicks++;
    roundsText.textContent = "Rounds: " + buttonClicks;
    console.log(buttonClicks);
  } else if (!storeRounds) {
    allAreZombies = true;
    totalRounds = parseInt(localStorage.getItem("rounds") || 0);
    localStorage.setItem("rounds", totalRounds + buttonClicks);
    epidemics = parseInt(localStorage.getItem("epidemics") || 0) + 1;
    localStorage.setItem("epidemics", epidemics);
    storeRounds = true;
  }

  if (allAreZombies && storeRounds) {
    console.log("all are zombies and stored...");
    epidemicsText.textContent = "Epidemics: " + epidemics;
    totalRounds = parseInt(localStorage.getItem("rounds") || 0);
    roundsPerEpidemicText.textContent =
      "Rounds/Epidemic: " + Math.round((totalRounds / epidemics) * 10) / 10;
    roundsText.textContent = "Rounds: " + buttonClicks;
  }

  for (let zombie = 0; zombie < nrOfZombies; zombie++) {
    visitHouse();
  }
});

$("#reload").click(function () {
  location.reload();
});

$("#changeMode").click(function () {
  body.classList.toggle("dark-mode");
  for (let house = 0; house < allHouses.length; house++) {
    allHouses[house].classList.toggle("dark-mode");
  }
});
