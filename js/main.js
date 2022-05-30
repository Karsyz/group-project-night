//document.querySelector('#clickMe').addEventListener('click', makeReq)
// document.querySelector('#rock').addEventListener('click', makeReq)
// document.querySelector('#paper').addEventListener('click', makeReq)
// document.querySelector('#scissors').addEventListener('click', makeReq)

let wins;
let draws;
let losses;

let emojis = document.querySelectorAll('.emoji');
emojis.forEach(element => {
  element.addEventListener('click', makeRequest);
});

document.querySelector('#resetStats').addEventListener('click', resetStats)
initializeData();

async function makeRequest(event) {
  resetEmojis();
  const element = event.target;

  const userName = element.id;
  element.classList.toggle("red");

  //const userName = document.querySelector("#userName").value.toLowerCase();
  const res = await fetch(`/api?student=${userName}`)
  const data = await res.json()

  console.log(data);
  //document.querySelector("#personName").textContent = `Result: ${data.resultText}`
  displayResults(data);
  updateSaveData();
  displayStats();
}


function initializeData() {
  if (!localStorage.getItem("wins", wins)) {
    localStorage.setItem("wins", 0);
    wins = 0;
  } else {
    wins = localStorage.getItem("wins");
  }
  if (!localStorage.getItem("draws", draws)) {
    localStorage.setItem("draws", 0);
    draws = 0;
  } else {
    draws = localStorage.getItem("draws");
  }
  if (!localStorage.getItem("losses", losses)) {
    localStorage.setItem("losses", 0);
    losses = 0;
  } else {
    losses = localStorage.getItem("losses");
  }
}



displayStats();
console.log(`wins: ${wins}, draws: ${draws}, losses: ${losses}`);

function resetStats() {
  localStorage.clear();
  wins = 0;
  losses = 0;
  draws = 0;
  displayStats();
  resetEmojis();
  resetText();

}

function resetEmojis() {
  emojis.forEach(element => {
    element.classList.remove("red");
    element.classList.remove("green");
  })
}
function resetText() {
  document.querySelector("#personOccupation").textContent = `Computer chose:`;
  document.querySelector("#personStatus").textContent = `YOU ARE A `;
}

function displayStats() {
  document.querySelector("#wins").textContent = `Wins: ${wins}`;
  document.querySelector("#draws").textContent = `Draws: ${draws}`;
  document.querySelector("#losses").textContent = `Losses: ${losses}`;
}

function displayResults(data) {
  document.querySelector("#personOccupation").textContent = `Computer chose: ${data.opponentAnswer}`
  document.querySelector("#personStatus").textContent = `YOU ARE A ${data.status}`;
  document.querySelector(`#${data.opponentAnswer}`).classList.toggle("green");

  switch (data.result) {
    case "win":
      wins++
      break;
    case "tie":
      draws++
      break;
    case "lose":
      losses++
      break;
    default:
      break;
  }
}


function updateSaveData() {
  localStorage.setItem("wins", wins);
  localStorage.setItem("draws", draws);
  localStorage.setItem("losses", losses);

}