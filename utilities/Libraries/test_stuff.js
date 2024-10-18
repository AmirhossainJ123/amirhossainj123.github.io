function randomize(min,max) {
  return min + Math.floor(Math.random()*(max-min))
}

score_ramp = 2

god_mode = false

function set_pattern(num) {
  pattern.shift()
  pattern.push(num)
}

function change_pattern() {
  let pcc = document.getElementById('brain');
  if (pcc.value == 101) {
    god_mode = true
    document.getElementById('pcc').textContent = `Memory: (GOD MODE): `
  }
  else {
    god_mode = false
    score_ramp = 2
  pattern=[randomize(1,4)];
  for(var x = 0; x < pcc.value-1; x++) {
      pattern.push(randomize(1,4));
  }; 
  document.getElementById('pcc').textContent = `Memory: (${pcc.value}): `
  }
}

iterationc = 1500

function change_iterations() {
  let it = document.getElementById('iterationc');
  iterationc = it.value;
  document.getElementById('iteration').textContent = `Iterations: (${it.value}): `
}

pattern = [randomize(1,4),randomize(1,4),randomize(1,4),randomize(1,4),randomize(1,4),randomize(1,4),randomize(1,4)]
score = 0

choices = ["Rock","Paper","Scissors"]

function future() {
  if (!god_mode) {
    nextchoose = chosenvalue
  document.getElementById("next").textContent = "I think you will pick up:   " + choices[nextchoose-1]
  let chose = 1 <= nextchoose && nextchoose <= 3 ? (nextchoose % 3) + 1 : 1
  document.getElementById("next").textContent += "\nSo I am gonna pick up:   " + choices[chose-1]
}
else {
  document.getElementById("next").textContent = "I DONT CARE WHAT YOU CHOSE\nI AM NOT LETTING YOU CHANGE THE FUTURE\nI AM THE ONLY ALIVE BOT WHO KNOWS THE FUTURE"
  }
}
chosenvalue = 1
function user_choice(num) {
  document.getElementById("next").textContent = ""
  if (!god_mode) {
    nextchoose = chosenvalue
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
  else {
    document.getElementById("result").textContent = "YOU LOOOSTTT!"
    document.getElementById("result").setAttribute("value","L")
    score-=score_ramp;
    score_ramp = score_ramp ** 2
    document.getElementById("score").textContent = "Score: " + score
    document.getElementById("score").setAttribute("value","-")
  }
  if (!god_mode) {
    document.getElementById("b1").disabled = true
    document.getElementById("b2").disabled = true
    document.getElementById("b3").disabled = true
    net = new brain.recurrent.LSTMTimeStep()
    net.train([pattern], { iterations: iterationc, log: true })
    chosenvalue = Math.round(net.run(pattern))
    document.getElementById("b1").disabled = false
    document.getElementById("b2").disabled = false
    document.getElementById("b3").disabled = false
  }
}