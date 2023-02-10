	old_num_1 = 0
        old_num_2 = 0
        old_num_3 = 0
        old_num_4 = 0
        old_num_5 = 0
        old_num_6 = 0
        new_num_1 = 0
        new_num_2 = 0
        new_num_3 = 0
        new_num_4 = 0
        new_num_5 = 0
        new_num_6 = 0
        function minusize(new_num_1,old_num_1) {
            if (new_num_1 > old_num_1)
                old_num_1 += 2
            else if (new_num_1 < old_num_1)
                old_num_1 -= 2
            if (new_num_1 > old_num_1)
                old_num_1 += 1
            else if (new_num_1 < old_num_1)
                old_num_1 -= 1
            return old_num_1
        }
        function randomize(min,max) {
            return min + Math.floor(Math.random()*(max-min))
        }
        function slower_cursor_loop() {
            setTimeout(() => {
                old_num_5 = minusize(new_num_5,old_num_5)
                const set = document.querySelector(".coolz")
                const se = document.querySelector(".shadow")
                set.style.padding = (old_num_5)/40 + "px"
                se.style.padding = 7-((old_num_5)/40) + "px"
                if (new_num_5 === old_num_5) {
                    new_num_5 = randomize(40,240);
                }
                slower_cursor_loop()
            }, 400);
        }
        function sminus(a,b) {
            if (a >= b)
                return a -= b
            else if (Math.abs(a) < Math.abs(b))
                return 0
            else if (a < b)
                return a += b
        }
        checxk = false
        velocityX = 0
        velocityY = 0
        COld_posX = 0
        Old_posX = 0
        COld_posY = 0
        Old_posY = 0
        New_posX = 0
        New_posY = 0
        const cursorS = document.querySelector('.shadow');
        const cursorCool = document.querySelector('.coolz');
        cursorS.style.transform = `translate3d(${COld_posX}px, ${COld_posY}px, 0)`;
        cursorCool.style.transform = `translate3d(${New_posX}px, ${New_posY}px, 0)`;
        function moice() {
            setTimeout(() => {
                Old_posX = New_posX
                Old_posY = New_posY
                moice()
            },500)
        }
        function shadalow() {
            setTimeout(() =>  {
                const cursorS = document.querySelector('.shadow');
                const cursorCool = document.querySelector('.coolz');
                DataPoz = cursorS.style.transform.slice(0,-6).replace("translate3d(","").replaceAll("px","").replaceAll(" ","").split(",")
                DataPos = cursorCool.style.transform.slice(0,-6).replace("translate3d(","").replaceAll("px","").replaceAll(" ","").split(",")
                COld_posX = parseInt(DataPoz[0])
                COld_posY = parseInt(DataPoz[1])
                New_posX = parseInt(DataPos[0])
                New_posY = parseInt(DataPos[1])
                velocityX = (parseFloat(New_posX - COld_posX)/100)*5
                velocityY = (parseFloat(New_posY - COld_posY)/100)*5
                COld_posX = parseFloat(COld_posX) + parseFloat(velocityX)
                COld_posY = parseFloat(COld_posY) + parseFloat(velocityY)
                cursorS.style.transform = `translate3d(${COld_posX}px, ${COld_posY}px, 0)`;
                cursorS.style.opacity = 0.5-Math.sqrt(parseInt((COld_posX-New_posX)**2)+parseInt((COld_posY-New_posY)**2))/1000
                shadalow()
            }, 50)
        }
        function color_culoop() {
            setTimeout(() => {
                old_num_6 = minusize(new_num_6,old_num_6)
                const set = document.querySelector(".coolz")
                const se = document.querySelector(".shadow")
                set.style.backgroundColor = `rgb(${old_num_6},${old_num_6},${old_num_6})`
                set.style.borderColor = `rgb(${255-old_num_6},${255-old_num_6},${255-old_num_6})`
                se.style.backgroundColor = `rgb(${255-old_num_6},${255-old_num_6},${255-old_num_6})`
                se.style.borderColor = `rgb(${old_num_6},${old_num_6},${old_num_6})`
                if (new_num_6 === old_num_6) {
                    new_num_6 = randomize(0,256);
                    setTimeout(() => {
                        color_culoop()
                    }, 2500);
                }
                else
                    color_culoop()
            }, 10);
        }
        function cursor_loop() {
            setTimeout(() => {
            old_num_1 = minusize(new_num_1,old_num_1)
            old_num_2 = minusize(new_num_2,old_num_2)
            old_num_3 = minusize(new_num_3,old_num_3)
            old_num_4 = minusize(new_num_4,old_num_4)
            const set = document.querySelector(".coolz")
            set.style.borderBottomLeftRadius = old_num_1 + "%"
            set.style.borderBottomRightRadius = old_num_2 + "%"
            set.style.borderTopLeftRadius = old_num_3 + "%"
            set.style.borderTopRightRadius = old_num_4 + "%"
            const se = document.querySelector(".shadow")
            se.style.borderBottomLeftRadius = 131-old_num_1 + "%"
            se.style.borderBottomRightRadius = 131-old_num_2 + "%"
            se.style.borderTopLeftRadius = 131-old_num_3 + "%"
            se.style.borderTopRightRadius = 131-old_num_4 + "%"
            if (new_num_1 === old_num_1) {
                new_num_1 = randomize(30,101);
            }
            if (new_num_2 === old_num_2) {
                new_num_2 = randomize(30,101);
            }
            if (new_num_3 === old_num_3) {
                new_num_3 = randomize(30,101);
            }
            if (new_num_4 === old_num_4) {
                new_num_4 = randomize(30,101);
            }
            cursor_loop()
            }, 25);
        }
        function main() {
            window.addEventListener('mousemove',(e) => {
                const cursorCool = document.querySelector('.coolz');
                New_posX = e.clientX-10
                New_posY = e.clientY-10
                cursorCool.style.transform = `translate3d(${New_posX}px, ${New_posY}px, 0)`;
            });
            window.addEventListener('touchdown',(e) => {
                const cursorCool = document.querySelector('.coolz');
                New_posX = e.clientX-10
                New_posY = e.clientY-10
                cursorCool.style.transform = `translate3d(${New_posX}px, ${New_posY}px, 0)`;
            });
            cursor_loop()
            slower_cursor_loop()
            color_culoop()
            shadalow()
            moice()
        }