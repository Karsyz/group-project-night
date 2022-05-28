const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  // www.example.com
  // /home
  // ?student
  // =aopgfrnuapirgn
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }

  else if (page == '/api') {
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
  }//else if
  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
