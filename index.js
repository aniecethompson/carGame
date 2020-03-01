const score = document.querySelector(".score")
const startScreen = document.querySelector(".startScreen")
const gameArea = document.querySelector(".gameArea")

let keys = { 
    ArrowUp: false, 
    ArrowDown: false, 
    ArrowRight: false, 
    ArrowLeft: false
}

let player = {speed:5}

function playGame(e){
    let car = document.querySelector(".car")
    moveLines()
    let road = gameArea.getBoundingClientRect()
    
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
    }
    
}

function start(){
    startScreen.classList.add("hide")
    gameArea.classList.remove("hide")
    
    player.start = true
    for(let i=0; i < 10; i++){
        let line = document.createElement("div")
        line.classList.add("line")
        line.y = i* 150
        line.style.top = (`${i* 150}px`)
        gameArea.appendChild(line)
    } 
    
    window.requestAnimationFrame(playGame)
    
    let car = document.createElement("div")
    
    car.innerText = "car"
    car.setAttribute("class","car")
    
    gameArea.appendChild(car)
    
    player.x =car.offsetLeft
    player.y =car.offsetTop

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
        if(item.y > 1500){
            item.y -= 1500
        }
        item.y += player.speed
        item.style.top = `${item.y}px`
    })
}
startScreen.addEventListener("click", start)
document.addEventListener("keydown", pressOn)
document.addEventListener("keyup", pressOff)