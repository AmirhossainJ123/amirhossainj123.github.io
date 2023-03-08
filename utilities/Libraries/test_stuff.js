function randomize(min,max) {
  return min + Math.floor(Math.random()*(max-min))
}

function set_pattern(num) {
  pattern.shift()
  pattern.push(num)
}

pattern = [randomize(1,4),randomize(1,4),randomize(1,4),randomize(1,4)]
score = 0

choices = ["Rock","Paper","Scissors"]

function future() {
  const net = new brain.recurrent.LSTMTimeStep()
  net.train([pattern], { iterations: 100, log: true })
  const nextchoose = Math.round(net.run(pattern))
  document.getElementById("next").textContent = "I think you will pick up:   " + choices[(nextchoose-1)%3]
  let chose = 1 <= nextchoose && nextchoose <= 3 ? (nextchoose % 3) + 1 : 1
  document.getElementById("next").textContent += "\nSo I am gonna pick up:   " + choices[chose-1]
}

function user_choice(num) {
  document.getElementById("next").textContent = ""
  const net = new brain.recurrent.LSTMTimeStep()
  net.train([pattern], { iterations: 100, log: true })
  const nextchoose = Math.round(net.run(pattern))
  console.log("Next choose is " + choices[nextchoose])
  set_pattern(num)
  let chosenByAI = 1 <= nextchoose && nextchoose <= 3 ? (nextchoose % 3) + 1 : 1
  let pum = chosenByAI
  if ((num == 1 && pum == 2) || (num == 2 && pum == 3) || (num == 3 && pum == 1))  {
    document.getElementById("result").textContent = "Lose"
    document.getElementById("result").setAttribute("value","L")
    score--
  }
  else if (num == pum) {
    document.getElementById("result").textContent = "Draw"
    document.getElementById("result").setAttribute("value","D")
  }
  else {
    document.getElementById("result").textContent = "Win"
    document.getElementById("result").setAttribute("value","W")
    score++
  }
  document.getElementById("score").textContent = "Score: " + score
  if (score > 0)
    document.getElementById("score").setAttribute("value","+")
  else if (score < 0)
    document.getElementById("score").setAttribute("value","-")
  else if (score == 0)
    document.getElementById("score").setAttribute("value","0")
}