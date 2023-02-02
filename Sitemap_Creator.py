import os
from os import system as do
from time import sleep as wait
def filter(directory):
    directories = []
    dir = [x.replace("\\","/") for x in directory]
    for x in dir:
        if (x.find(".git") == -1):
            directories.append(x)
    return directories
Blacklisted_for_search_engine = open("BlockedSearch.txt","r").readlines()
subdirectories = filter([x[0] for x in os.walk(".")])
Submit = []
hasdone = 0
all = 0
for directory in subdirectories:
    for filename in os.listdir(directory):
        all += 1
for directory in subdirectories:
    for filename in os.listdir(directory):
        hasdone += 1
        percentage = str(hasdone/all * 100) + "% Completed"
        do("cls")
        print(percentage)
        f = os.path.join(directory, filename)
        if os.path.isfile(f) and f.endswith(".html") and not f.replace(".html","").replace("\\","/").replace(".","https://amirhossainj123.github.io") in Blacklisted_for_search_engine:
            print(f.replace(".html","").replace("\\","/").replace(".","https://amirhossainj123.github.io"))
            Submit.append(f.replace(".html","").replace("\\","/").replace(".","https://amirhossainj123.github.io"))
typer = open("sitemap.txt","w")        
for y in Submit:
    typer.write(y + "\n")
typer.close()
do("cls")
print("Your sitemap is now up to date!")
do("msg * Done!")
wait(3)