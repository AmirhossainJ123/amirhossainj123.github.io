from tkinter import *
from os import system as hack 
from os import getlogin as username
from time import sleep as wait
from tkinter import messagebox
import keyboard
import mouse
from random import randint
id = randint(12345,987654)
Root = Tk()
Root.withdraw()
width = Root.winfo_screenwidth()
height = Root.winfo_screenheight()
Root.destroy()
def BOOP():
    keyboard.press("ctrl")
    keyboard.press("shift")
    keyboard.press("win")
    keyboard.press("b")
    keyboard.release("ctrl")
    keyboard.release("shift")
    keyboard.release("win")
    keyboard.release("b")
tak = Tk()
tak.withdraw()
mouse.move(0,0)
BOOP()
hack("start \"Hacker\'s Command Prompt\" cmd /c \"echo Hacker#" + str(id) + " started an attack on you! & timeout /t 2 /nobreak >nul "
     + "& echo Windows.Hack();"
     + "& timeout /t 2 /nobreak >nul "
     + "& color 02"
     + "& echo Windows.decryption.c9284020475[0] = Windows.encryption.c2848193857(Windows.CurrentUser.Username,Windows.CurrentUser.Password);"
     + "& timeout /t 2 /nobreak >nul "
     + "& echo Windows.data.c9284020475.extract('1 0 0 0 1 0 0 1 0 0 0 1 1 1 1 0 0 1 0 0 0 1 1 1 0 0 1')"
     + "& timeout /t 1 /nobreak >nul "
     + "& echo Windows.data.c9284020475.validate();"
     + "& timeout /t 2 /nobreak >nul "
     + "& echo Windows.administration.b928472949572.nk38491048s = 'Granted';"
     + "& timeout /t 1 /nobreak >nul "
     + "& echo Windows.store.result.c9284020475.ij38219dh28();"
     + "& timeout /t 1 /nobreak >nul "
     + "& echo Windows.end.proccess();"
     + "& timeout /t 1 /nobreak >nul "
     + "& echo ."
     + "& timeout /t 1 /nobreak >nul "
     + "& echo Windows.Login("
     + "& timeout /t 1 /nobreak >nul "
     + "& echo Username: " + username()
     + "& timeout /t 1 /nobreak >nul "
     + "& echo ,Password: *********************);"
     + "& timeout /t 4 /nobreak >nul"
     + "& cls"
     + "& echo SYSTEM: Access Granted!"
     + " & timeout /t 3 /nobreak >nul\"")
for x in range(340):
    mouse.move(randint(0,width),randint(0,height))
    wait(0.05)
messagebox.showerror("WINDOWS SECURITY","YOU ARE UNDER AN ATTACK\nYOU HAVE BEEN HACKED")
check = True
while(check):
    check = messagebox.askretrycancel("Removing Virus#" + str(id) + "_" + str(randint(0,200)),"Removing this virus has been successfully failed!")
    wait(1)
hack("start /MAX notepad")
wait(0.5)
mouse.move(width/2,height/2)
wait(0.25)
mouse.click()
wait(0.25)
keyboard.write("""You have been hacked :D
if you want your computer back
gimme 1 potato chips""",0.05)
wait(0.25)
for x in range(50):
    keyboard.press("ctrl")
    keyboard.press("+")
    keyboard.release("ctrl")
    keyboard.release("+")