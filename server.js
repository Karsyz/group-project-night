const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

let notDB = loadDB('notDB.json')

const server = http.createServer((req, res) => {
  function respondToRequest(dataType, fileName) {
    fs.readFile(`${fileName}`, function (err, data) {
      res.writeHead(200, { 'Content-Type': `${dataType}` });
      res.write(data);
      res.end();
    });
  }
  // www.example.com
  // /home
  // ?student
  // =aopgfrnuapirgn
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  switch (page) {
    case '/':
      respondToRequest('text/html', 'index.html');
      break;
    case '/otherpage':
      respondToRequest('text/html', 'otherpage.html');
      break;
    case '/otherotherpage':
      respondToRequest('text/html', 'otherotherpage.html');
      break;
    case '/api':

      if ('student' in params) {
        function getComputerAnswer() {
          // 1 = rock, 2 = paper, 3 = scissors
          let randomNumber = Math.ceil(Math.random() * 3)
          switch (randomNumber) {
            case (1):
              return "rock";
            case (2):
              return "paper";
            case (3):
              return "scissors";
            default:
              return "How did you get here? Seriously?";
          }
        }
        let compAnswer = getComputerAnswer();
        notDB[params['student']]++

        if (
          compAnswer === 'rock' && params['student'] == 'paper' ||
          compAnswer === 'paper' && params['student'] == 'scissors' ||
          compAnswer === 'scissors' && params['student'] == 'rock') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          const objToJson = {
            resultText: "You win!",
            status: "WINNER WINNER CHICKEN DINNER",
            opponentAnswer: compAnswer,
            result: "win"
          }
          res.end(JSON.stringify(objToJson));
          notDB["win"]++
        } else if (
          compAnswer === 'rock' && params['student'] == 'rock' ||
          compAnswer === 'paper' && params['student'] == 'paper' ||
          compAnswer === 'scissors' && params['student'] == 'scissors') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          const objToJson = {
            resultText: "You tied :/",
            status: "Well....you're not a winner. That's for sure.",
            opponentAnswer: compAnswer,
            result: "tie"
          }
          res.end(JSON.stringify(objToJson));
          notDB["tie"]++
        } else if (
          compAnswer === 'paper' && params['student'] == 'rock' ||
          compAnswer === 'scissors' && params['student'] == 'paper' ||
          compAnswer === 'rock' && params['student'] == 'scissors'
        ) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          const objToJson = {
            resultText: "You lose :c",
            status: "loser",
            opponentAnswer: compAnswer,
            result: "lose"
          }
          res.end(JSON.stringify(objToJson));
          notDB["lose"]++
        }
        else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          const objToJson = {
            Result: "You entered something wrong",
            status: "ONLY INPUT ROCK...........................................................PAPER, OR SCISSORS!!!!!!!!!!!",
            opponentAnswer: compAnswer
          }
          res.end(JSON.stringify(objToJson));
        }
        //student != leon
      }//student if
      break;
    case '/css/style.css':
      respondToRequest('text/css', "css/style.css");
      break;
    case '/js/main.js':
      respondToRequest('text/javascript', "js/main.js");
      break;
    case '/js/buttonStyling.js':
      respondToRequest('text/javascript', "js/buttonStyling.js");
      break;
    default:
      figlet('404!!', function (err, data) {
        if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
        }
        res.write(data);
        res.end();
      });
      break;
  }
  // if DB is over 10,000ms old write to filesystem
  if (Date.now() - notDB.timeStamp > 10000) {
    notDB.timeStamp = Date.now()
    saveDB('notDB.json', notDB)
  }
});
server.listen(8000);

function loadDB(path) {

  // the 'a+' flag allows reading and appending but crucially
  // will create a new blank file if needed for us.
  const data = fs.readFileSync(path, { flag: 'a+' })
  if (data.length) {
    return JSON.parse(data)
  } else {
    // If no DB data just start a new object to be written later
    // DB version for tracking migrations, timeStamp for tracking time of last write
    return {
      version: 0.1, timeStamp: Date.now(),
      "rock": 0, "paper": 0, "scissors": 0,
      "win": 0, "tie": 0, "lose": 0
    }
  }
}

function saveDB(path, obj) {
  console.log("Saving")
  fs.writeFile(path, JSON.stringify(obj, null, 2), err => { if (err) console.log(err) })
}

// save data if interrupt signal is sent (Ctrl-C) 
process.on("SIGINT", () => {
  console.log("terminating...")
  notDB.timeStamp = Date.now()
  fs.writeFileSync('notDB.json', JSON.stringify(notDB, null, 2), err => { if (err) console.log(err) })
  console.log("Goodbye")
  process.exit(0)
})

//   if (page == '/') {

//   }
//   else if (page == '/otherpage') {

//   }
//   else if (page == '/otherotherpage') {

//   }
//   else if (page == '/api') {
//     if ('student' in params) {
//       function getComputerAnswer() {
//         // 1 = rock, 2 = paper, 3 = scissors
//         let randomNumber = Math.ceil(Math.random() * 3)
//         switch (randomNumber) {
//           case (1):
//             return "rock";
//           case (2):
//             return "paper";
//           case (3):
//             return "scissors";
//           default:
//             return "How did you get here? Seriously?";
//         }
//       }
//       let compAnswer = getComputerAnswer();

//       if (
//         compAnswer === 'rock' && params['student'] == 'paper' ||
//         compAnswer === 'paper' && params['student'] == 'scissors' ||
//         compAnswer === 'scissors' && params['student'] == 'rock') {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         const objToJson = {
//           resultText: "You win!",
//           status: "WINNER WINNER CHICKEN DINNER",
//           opponentAnswer: compAnswer,
//           result: "win"
//         }
//         res.end(JSON.stringify(objToJson));
//       } else if (
//         compAnswer === 'rock' && params['student'] == 'rock' ||
//         compAnswer === 'paper' && params['student'] == 'paper' ||
//         compAnswer === 'scissors' && params['student'] == 'scissors') {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         const objToJson = {
//           resultText: "You tied :/",
//           status: "Well....you're not a winner. That's for sure.",
//           opponentAnswer: compAnswer,
//           result: "tie"
//         }
//         res.end(JSON.stringify(objToJson));
//       } else if (
//         compAnswer === 'paper' && params['student'] == 'rock' ||
//         compAnswer === 'scissors' && params['student'] == 'paper' ||
//         compAnswer === 'rock' && params['student'] == 'scissors'
//       ) {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         const objToJson = {
//           resultText: "You lose :c",
//           status: "loser",
//           opponentAnswer: compAnswer,
//           result: "lose"
//         }
//         res.end(JSON.stringify(objToJson));
//       }
//       else {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         const objToJson = {
//           Result: "You entered something wrong",
//           status: "ONLY INPUT ROCK...........................................................PAPER, OR SCISSORS!!!!!!!!!!!",
//           opponentAnswer: compAnswer
//         }
//         res.end(JSON.stringify(objToJson));
//       }
//       //student != leon
//     }//student if
//   }//else if
//   else if (page == '/css/style.css') {

//   } else if (page == '/js/main.js') {

//   } else {
//     figlet('404!!', function (err, data) {
//       if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//       }
//       res.write(data);
//       res.end();
//     });
//   }
// });

