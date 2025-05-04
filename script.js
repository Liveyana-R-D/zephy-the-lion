let xp = 0;
let level = 1;
let hunger = 80;
let happiness = 90;
let energy = 70;

const petImage = document.getElementById("petImage");
const moodText = document.getElementById("mood");
const levelText = document.getElementById("level");
const hungerBar = document.getElementById("hungerBar");
const happinessBar = document.getElementById("happinessBar");
const energyBar = document.getElementById("energyBar");

function updateBars() {
  hungerBar.value = hunger;
  happinessBar.value = happiness;
  energyBar.value = energy;
}

function updateUI(image, mood, gainedXP) {
  petImage.src = image;
  moodText.textContent = mood;

  xp += gainedXP;
  if (xp >= 100) {
    level++;
    xp = 0;
  }

  levelText.textContent = `Level: ${level} | XP: ${xp}/100`;
  updateBars();

  // Save to localStorage
  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
  localStorage.setItem("hunger", hunger);
  localStorage.setItem("happiness", happiness);
  localStorage.setItem("energy", energy);
}

function feedPet() {
  hunger = Math.min(hunger + 20, 100);
  updateUI("images/lion-hungry.jpg", "Mmm... Zephy enjoyed the meal!", 20);
}

function playWithPet() {
  happiness = Math.min(happiness + 20, 100);
  energy = Math.max(energy - 10, 0);
  updateUI("images/lion-happy.avif", "Woohoo! Zephy had fun!", 30);
}

function cleanPet() {
  updateUI("images/lion-clean.avif", "Clean and shiny Zephy!", 15);
}

function restPet() {
  energy = Math.min(energy + 25, 100);
  updateUI("images/lion-sleep.jpg", "Zzz... Zephy is resting.", 10);
}

function resetGame() {
  level = 1;
  xp = 0;
  hunger = 80;
  happiness = 90;
  energy = 70;
  updateUI("images/lion-happy.avif", "Zephy is back to level 1!", 0);
  localStorage.clear();
}

function roar() {
  const sound = document.getElementById('roarSound');
  sound.currentTime = 0;
  sound.play();
  alert("Zephy roars with royal pride!");
}

// Load from localStorage
window.onload = () => {
  const savedXP = localStorage.getItem("xp");
  const savedLevel = localStorage.getItem("level");
  const savedHunger = localStorage.getItem("hunger");
  const savedHappiness = localStorage.getItem("happiness");
  const savedEnergy = localStorage.getItem("energy");

  if (savedXP && savedLevel) {
    xp = parseInt(savedXP);
    level = parseInt(savedLevel);
    hunger = parseInt(savedHunger) || hunger;
    happiness = parseInt(savedHappiness) || happiness;
    energy = parseInt(savedEnergy) || energy;
    updateUI("images/lion-happy.avif", "Welcome back! Zephy missed you!", 0);
  } else {
    updateBars();
  }
};

// Decay attributes over time
setInterval(() => {
  hunger = Math.max(hunger - 1, 0);
  happiness = Math.max(happiness - 1, 0);
  energy = Math.max(energy - 1, 0);

  updateBars();

  if (hunger === 0 || happiness === 0 || energy === 0) {
    moodText.textContent = "Zephy needs attention!";
    petImage.src = "images/lion-sad.jpg";
  }
}, 10000); // Every 10 seconds
