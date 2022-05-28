//document.querySelector('#clickMe').addEventListener('click', makeReq)
document.querySelector('#rock').addEventListener('click', makeReq)
document.querySelector('#paper').addEventListener('click', makeReq)
document.querySelector('#scissors').addEventListener('click', makeReq)
document.querySelector('#resetStats').addEventListener('click', resetStats)

async function makeReq(event) {


  const userName = event.target.id;
  //const userName = document.querySelector("#userName").value.toLowerCase();
  const res = await fetch(`/api?student=${userName}`)
  const data = await res.json()

  console.log(data);
  //document.querySelector("#personName").textContent = `Result: ${data.resultText}`

  document.querySelector("#personOccupation").textContent = `Computer chose: ${data.opponentAnswer}`
  document.querySelector("#personStatus").textContent = `YOU ARE A ${data.status}`;

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

  localStorage.setItem("wins", wins);
  localStorage.setItem("draws", draws);
  localStorage.setItem("losses", losses);


  displayStats();

}
let wins;
let draws;
let losses;

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

displayStats();
console.log(`wins: ${wins}, draws: ${draws}, losses: ${losses}`);

function resetStats() {
  localStorage.clear();
  wins = 0;
  losses = 0;
  draws = 0;
  displayStats();
}

function displayStats() {
  document.querySelector("#wins").textContent = `Wins: ${wins}`;
  document.querySelector("#draws").textContent = `Draws: ${draws}`;
  document.querySelector("#losses").textContent = `Losses: ${losses}`;
}