import os
import subprocess

let = input("Type ")

if int(let) == 0:
    os.system("node-sass src/prefab/scss/index.scss src/static/css/index.css")
elif int(let) == 1:
    os.system("git add -A")
    name = input("Name: ")
    os.system(f'git commit -m "{name}"')
    os.system("git push")
elif int(let) == 2:
    os.system(r"g++ -std=c++17 -O2 -Iinclude -o C:\Users\god19\Desktop\Engine-web\core\main.exe core/main.cpp core/src/httplib.cc core/src/server.cpp core/src/config.cpp core/src/html.cpp -lkernel32 -luser32 -lcomdlg32 -lole32 -lshlwapi -lversion -lws2_32 -lz")
    path = r'C:\Users\god19\Desktop\Engine-web\core'

    command = [
        'powershell', 
        '-NoExit', 
        '-Command', 
        f'Set-Location -Path "{path}"; ./main; Exit'
    ]

    subprocess.run(command, shell=True)