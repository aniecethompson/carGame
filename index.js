const score = document.querySelector(".score")
const startScreen = document.querySelector(".startScreen")
const gameArea = document.querySelector(".gameArea")

let keys = { 
    ArrowUp:false, ArrowDown:false, ArrowRight:false, ArrowLeft:false
}

let player = {speed:5}

const playGame = (e) => {
    let car = document.querySelector(".car")
    if(player.start){
        if(keys.ArrowUp){
            player.y -= player.speed
        }
        if(keys.ArrowDown){
            player.y += player.speed
        }
        if(keys.ArrowLeft){
            player.x -= player.speed
        }
        if(keys.ArrowRight){
            player.x += player.speed
        }
        car.style.left = `${player.x}px`
        car.style.top = `${player.y}px`

        window.requestAnimationFrame(playGame)
    }
    console.log("in play")
    
}

const start = () => {
    startScreen.classList.add("hide")
    gameArea.classList.remove("hide")
    player.start = true
    window.requestAnimationFrame(playGame)
    
    let car = document.createElement("div")
    
    car.innerText = "car"
    car.setAttribute("class","car")
    
    gameArea.appendChild(car)
    player.x =car.offsetLeft
    player.y =car.offsetTop
    console.log(player)

}

const pressOn = (e) => {
    e.preventDefault()
    keys[e.key] = true
}

const pressOff = (e) => {
    e.preventDefault()
    keys[e.key] = false
}



startScreen.addEventListener("click", start)
document.addEventListener("keydown", pressOn)
document.addEventListener("keyup", pressOff)