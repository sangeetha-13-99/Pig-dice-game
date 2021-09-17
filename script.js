"use strict";

let p1score = document.getElementById("p1score");
let c1score = document.getElementById("c1score");
let p2score = document.getElementById("p2score");
let c2score = document.getElementById("c2score");
let rolldice = document.getElementById("rolldice");
let newgame = document.getElementById("newgame");
let hold = document.getElementById("hold");
let dice = document.getElementById("dice");
dice.classList.toggle("hidden");

let currentscore = 0;

let activeplayer = 1;

document.querySelector(`.innerbox${activeplayer}`).classList.toggle("active");

let scores = [0, 0];

p1score.textContent = scores[0];
c1score.textContent = 0;
p2score.textContent = scores[1];
c2score.textContent = 0;

function rolling() {
  let dice = document.getElementById("dice");
  let random = Math.floor(Math.random() * 6);
  let diceimage = [
    "/dice/1.png",
    "/dice/2.png",
    "/dice/3.png",
    "/dice/4.png",
    "/dice/5.png",
    "/dice/6.png",
  ];
  dice.style.backgroundImage = 'url("' + diceimage[random] + '")';
  return random + 1;
}

newgame.addEventListener("click", function () {
  document.querySelector(`.innerbox1`).classList.remove("win");
  document.querySelector(`.innerbox2`).classList.remove("win");
  document
    .querySelector(`.innerbox${activeplayer}`)
    .classList.toggle("active", false);
  activeplayer = 1;
  currentscore = 0;
  p1score.textContent = 0;
  c1score.textContent = 0;
  p2score.textContent = 0;
  c2score.textContent = 0;
  document
    .querySelector(`.innerbox${activeplayer}`)
    .classList.toggle("active", true);

  dice.classList.toggle("hidden", true);
  scores = [0, 0];
  document.querySelector(".footer").style.display = "none";
  rolldice.classList.remove("hidden");
  hold.classList.remove("hidden");
});

let roll = function () {
  dice.classList.toggle("hidden", false);

  let x = rolling();
  let cscore = document.getElementById(`c${activeplayer}score`);
  if (x !== 1) {
    currentscore += x;
    cscore.textContent = currentscore;
  } else {
    currentscore = 0;
    cscore.textContent = currentscore;
    document
      .querySelector(`.innerbox${activeplayer}`)
      .classList.toggle("active");
    activeplayer = activeplayer === 1 ? 2 : 1;
    document
      .querySelector(`.innerbox${activeplayer}`)
      .classList.toggle("active");
  }
};

rolldice.addEventListener("click", roll);

hold.addEventListener("click", function () {
  dice.classList.toggle("hidden", true);
  let score = document.getElementById(`p${activeplayer}score`);
  let cscore = document.getElementById(`c${activeplayer}score`);

  scores[activeplayer - 1] += currentscore;
  score.textContent = scores[activeplayer - 1];
  // scores[0]=100;

  if (scores[activeplayer - 1] >= 10) {
    document.querySelector(`.innerbox${activeplayer}`).classList.add("win");
    document.querySelector(".footer").style.display = "block";

    document.querySelector(
      ".footer"
    ).textContent = `player ${activeplayer} won`;
    rolldice.classList.add("hidden");
    hold.classList.add("hidden");
  } else {
    currentscore = 0;
    cscore.textContent = 0;
    document
      .querySelector(`.innerbox${activeplayer}`)
      .classList.toggle("active", false);
    activeplayer = activeplayer === 1 ? 2 : 1;
    document
      .querySelector(`.innerbox${activeplayer}`)
      .classList.toggle("active");
  }
});
