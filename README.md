# Commandes


### In terminal
#### 1. Install dependencies:
>npm install 
#### 2. Browserify code for it to read require on browser:
To browserify all .js files
>npm run browserify-all

#### (Not necessary, but recomended if you don't want to save on every file modification) Save automatically these files

to watch ./src/Databases.js and ./src/App.js on save:
You need 2 terminal processes(in seperate tabs) running. One for each:

Terminal 1
>npm run watchify-app

Terminal 2
>npm run watchify-databases

#### Comands to run developer mode locally on host:
http://localhost:3000/

>npm run watch
>npm run server