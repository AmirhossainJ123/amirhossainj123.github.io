function main() {
    console.log("Page started!")
}
function show_answer(num) {
    if (num == 1) document.getElementById("question" + num).textContent = "x = 0.99999...\n10x = 9.99999...\n10x - x = 9.99999... - 0.99999...\n9x = 9 => 9x/9 = 9/9\n1 = 1 = 0.99999..."
    if (num == 2) document.getElementById("question" + num).textContent = "the answer is 0.000001002003004005006007008009...995996997999\nbut whats so special about this you might ask? look again\n0.000 001 002 003 004 005 006 007 008 009...995 996 997 999\nit works with every whole number less than 1000 except the 998\nBUT the coolest part is that it repeats!!!!!\n0.000001002003004...997999000001002003004...997999000001002003004...997999.......\nYou can try it your own in https://amirhossainj123.github.io/utilities/accurate"
    if (num == 3) document.getElementById("question" + num).textContent = "3 cubed plus 4 tesseracted plus 3 cubed plus 5 penteracted\nidk if my words are correctly used\nits equal to the legendary 3435, what a hard question"
    if (num == 4) document.getElementById("question" + num).textContent = "10 powered by 506 - 10 powered by 506/2 - 1 = prime\nso basically (10 powered by 506) - (10 powered by 253) - 1\nto write the answer just write 9, 253 times then write a single 8 then write 9, 252 times\nhope it helps"
    if (num == 5) document.getElementById("question" + num).textContent = "Well umm 73939133 is prime\nalso 7393913 is prime too\nsomehow 739391 is also prime\nstrangly 73939 is also prime\n7393 is ALSO PRIME\n739 is prime too bruh\n73 is prime too ;s\n7 is prime obviously too dang"
}
function hide_answer(num) {
    if (num == 1) document.getElementById("question" + num).textContent = ""
    if (num == 2) document.getElementById("question" + num).textContent = ""
    if (num == 3) document.getElementById("question" + num).textContent = ""
    if (num == 4) document.getElementById("question" + num).textContent = ""
    if (num == 5) document.getElementById("question" + num).textContent = ""
}