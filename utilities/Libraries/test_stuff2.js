function randomize(min,max) {
  return min + Math.floor(Math.random()*(max-min))
}

alert("dont spam the buttons, thats cheating!\nI know you havent done it yet, but just for your info")

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
    document.getElementById('pcc').textContent = `>> (GOD MODE) <<: `
  }
  else {
    god_mode = false
    score_ramp = 2
  pattern=[randomize(1,3)];
  for(var x = 0; x < pcc.value-1; x++) {
      pattern.push(randomize(1,3));
  }; 
  document.getElementById('pcc').textContent = `Memory (${pcc.value}): `
  }
}

pattern = [2,2,2,2,2,2,2,2,2,2,2,2]
score = 0

choices = ["Left","Right"]
nextchoice = 1
function future() {
  if (!god_mode) {
    document.getElementById("next").textContent = "I think you will pick up:   " + choices[nextchoice-1]
    document.getElementById("next").textContent += "\nSo I am gonna pick up:   " + choices[nextchoice-1]
    document.getElementById("next").textContent += "\nTo keep things fair, Imma remove a score from you for cheating on what I choose :>"
    score--
    document.getElementById("score").textContent = "Score: " + score
    if (score > 0)
      document.getElementById("score").setAttribute("value","+")
      else if (score < 0)
        document.getElementById("score").setAttribute("value","-")
      else if (score == 0)
        document.getElementById("score").setAttribute("value","0")
}
else {
  document.getElementById("next").textContent = "I DONT CARE WHAT YOU CHOOSE\nI AM NOT LETTING YOU CHANGE THE FUTURE\nI AM THE ONLY ALIVE BOT WHO KNOWS THE FUTURE"
  }
}
timecrash = 0
function user_choice(num) {
  timecrash = 0
  decided = false
  document.getElementById("next").textContent = ""
  if (!god_mode) {
  nextchoose = nextchoice
  console.log("Next choose is " + choices[nextchoose-1])
  set_pattern(num)
  let chosenByAI = nextchoose
  let pum = chosenByAI
  if (num == pum)  {
    document.getElementById("result").textContent = "You Lost"
    document.getElementById("result").setAttribute("value","L")
    score--
  }
  else {
    document.getElementById("result").textContent = "You Won"
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
    net = new brain.recurrent.LSTMTimeStep()
    net.train([pattern], { iterations: 1200, log: true })
    nextchoice = Math.round(net.run(pattern))
}