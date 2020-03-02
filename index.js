const score = document.querySelector(".score")
const startScreen = document.querySelector(".startScreen")
const gameArea = document.querySelector(".gameArea")

let keys = { 
    ArrowUp: false, 
    ArrowDown: false, 
    ArrowRight: false, 
    ArrowLeft: false
}

let player = {
    speed:5,
    score: 0,
    eCar: 0
}

function playGame(){
    let car = document.querySelector(".car")
    moveLines()
    moveEnemy(car)
    let road = gameArea.getBoundingClientRect()
   
    // moves player's car if player.start equals true
    if(player.start){
        
        if(keys.ArrowUp && player.y < (road.height -150)){
            player.y -= player.speed
        }
        if(keys.ArrowDown && player.y < road.bottom){
            player.y += player.speed
        }
        if(keys.ArrowLeft && player.x > 0){
            player.x -= player.speed
        }
        if(keys.ArrowRight && player.x < (road.width - 50)){
            player.x += player.speed
        }
        
        car.style.left = `${player.x}px`
        car.style.top = `${player.y}px`

        window.requestAnimationFrame(playGame)

        // increase player score
        player.score++
        score.innerText = `Score: ${player.score}`
    }
    
}

function start(){
    startScreen.classList.add("hide")
    score.classList.remove("hide")
    // clear board when game reset
    gameArea.innerText = ""

    
    player.start = true
    player.score = 0
    
    // create lines
    for(let i=0; i < 10; i++){
        let line = document.createElement("div")
        line.classList.add("line")
        line.y = i* 150
        line.style.top = (`${i* 150}px`)
        gameArea.appendChild(line)
    } 
    
    window.requestAnimationFrame(playGame)
    
    // create player car
    let car = document.createElement("div")
    car.setAttribute("class","car")
    gameArea.appendChild(car)
    
    player.x =car.offsetLeft
    player.y =car.offsetTop
 
    // create enemy cars
    for(let i=0; i < 4; i++){
        let enemyCar = document.createElement("div")
        enemyCar.classList.add("enemy")
        // creating random starting position of car
        enemyCar.y = ((i+1)* 550) * -1
        enemyCar.style.top = (`${enemyCar.y}px`)
        enemyCar.style.left = Math.floor(Math.random()* 350) + "px"
        enemyCar.innerText = `${i + 1}`

        enemyCar.style.backgroundColor = randomColor()
        gameArea.appendChild(enemyCar)
    } 

}

const randomColor = () =>{
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

const pressOn = (e) => {
    e.preventDefault()
    keys[e.key] = true
}

const pressOff = (e) => {
    e.preventDefault()
    keys[e.key] = false
}


const moveLines = () => {
    let lines = document.querySelectorAll(".line")
    lines.forEach((item) => {
        // check if line is off the screen, then reset line's position
        if(item.y > 1500){
            item.y -= 1500
        }
        item.y += player.speed 
        item.style.top = `${item.y}px`
    })
}

const moveEnemy = (car) => {
    let enemyCar = document.querySelectorAll(".enemy")
    enemyCar.forEach((enemy) => {
        // send to end the game function
        if(isCollide(car, enemy)){
            endGame()
        }

        // if enemy car has run off the screen the reset the position
        if(enemy.y >= 1500){
            enemy.y = -600
            enemy.style.left = Math.floor(Math.random()* 350) + "px"

        }
        enemy.y += player.speed 
        enemy.style.top = `${enemy.y}px`
    })
}

const isCollide = (a, b) => {
    //create coordinates for car divs
    let aRect = a.getBoundingClientRect()
    let bRect = b.getBoundingClientRect()
    
    //check opposite side of each rectangle to check collision 
    return !(
        (aRect.bottom < bRect.top)||
        (aRect.top > bRect.bottom)||
        (aRect.right < bRect.left)||
        (aRect.left > bRect.right)
    )
}

const endGame = () => {
    player.start = false
    score.innerText = `Game Over! Score was ${player.score}`
    startScreen.classList.remove("hide")

}

startScreen.addEventListener("click", start)
document.addEventListener("keydown", pressOn)
document.addEventListener("keyup", pressOff)

