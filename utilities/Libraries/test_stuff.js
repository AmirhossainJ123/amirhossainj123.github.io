function randomize(min,max) {
  return min + Math.floor(Math.random()*(max-min))
}

score = 0

function user_choice(num) {
  pum = randomize(1,4)
  if ((num == 1 && pum == 2) || (num == 2 && pum == 3) || (num == 3 && pum == 1))  {
    document.getElementById("result").textContent = "Lose"
    score--
  }
  else if (num == pum)
    document.getElementById("result").textContent = "Draw"
  else {
    document.getElementById("result").textContent = "Win"
    score++
  }
  document.getElementById("score").textContent = "Score: " + score
}