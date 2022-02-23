console.log("hello")

const intro = document.getElementById("introScreen")
const deathScreen = document.getElementById("deathScreen")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')
const img = document.getElementById("playerSprite")
const redCar = document.getElementById("redCar")
const blueCar = document.getElementById("blueCar")
const bus = document.getElementById("bus")
const homieHouse = document.getElementById("house")
const myHomie = document.getElementById("homie")

canvas.setAttribute('width', getComputedStyle(canvas)['width'])
canvas.setAttribute('height', getComputedStyle(canvas)['height'])


let playerDistance = 0


class Sprite {
    constructor (image, x, y, width, height) {
        this.image = image,
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height,
        this.health = 3
        this.alive = true
        this.draw = function () {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }


    }
}






class Block {
    constructor (x, y, color, height, width) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.height = height,
        this.width = width,
        this.health = 3
        this.alive = true,
        this.win = false,
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.height, this.width)
        }
    }
}

let stripe1 = new Block(0, 240, "yellow", 100, 10)
let stripe2 = new Block(200, 240, "yellow", 100, 10)
let stripe3 = new Block(400, 240, "yellow", 100, 10)
let stripe4 = new Block(600, 240, "yellow", 100, 10)
let upperGrass = new Block(0, 0, "green", 800, 125)
let lowerGrass = new Block(0, 375, "green", 800, 125)
let player = new Sprite (img, 10, 200, 50, 50)
let car1 = new Sprite (redCar, 800, 136, 100, 50)
let car2 = new Sprite (blueCar, 800, 290, 100, 60)
let bus1 = new Sprite (bus, 800, 200,  150, 85)
let house = new Sprite (homieHouse, 800, 0, 125, 125)
let homie = new Sprite (myHomie, 650, 250, 150, 150)

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('keydown', movementHandler)
    intro.addEventListener("click", ()=>{
        intro.style.display = "none"
        const runGame = setInterval(gameloop, 60)
        const isDead = setInterval(() =>{
            if(player.alive === false) {
                clearInterval(runGame)
                clearInterval(isHit)
                clearInterval(isWin)
                clearTimeout(moveCar1)
                clearTimeout(moveCar2)
                clearTimeout(moveBus)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                deathScreen.style.display = "block"
                clearInterval(isDead)

            }
        })

        const isHit = setInterval(detectHit, 60)
        const isWin = setInterval(detectWin, 60)
        const moveCar1 = setTimeout(carFunc, 1000)
        const moveCar2 = setTimeout(carFunc2, 5000)
        const moveBus = setTimeout(busFunc, 9000)

        setInterval(()=>{
            if(player.win){
                clearInterval(isHit)
                clearInterval(runGame)
                setInterval(winLoop, 60)
            }
        }, 60)
        })

    deathScreen.addEventListener("click", ()=>{
        player.health = 3
        player.alive = true
        player.x = 10
        player.y = 200
        car1.x = 800
        car2.x = 800
        bus1.x = 800
        house.x = 800
        playerDistance = 0
        console.log("hello")
        deathScreen.style.display = "none"
        const runGame = setInterval(gameloop, 60)
        const isDead = setInterval(() =>{
            if(player.alive === false) {
                clearInterval(runGame)
                clearInterval(isHit)
                clearInterval(isWin)
                clearTimeout(moveCar1)
                clearTimeout(moveCar2)
                clearTimeout(moveBus)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                deathScreen.style.display = "block"
                clearInterval(isDead)

            }
        })

        // setInterval(()=>{
        //     if(player.health === 2){
        //     clearInterval(isHit)
        //     setTimeout(isHit, 1500)}
        // }, 10)
        const isHit = setInterval(detectHit, 60)
        const isWin = setInterval(detectWin, 60)
        const moveCar1 = setTimeout(carFunc, 1000)
        const moveCar2 = setTimeout(carFunc2, 5000)
        const moveBus = setTimeout(busFunc, 10000)


        setInterval(()=>{
            if(player.win){
                clearInterval(isHit)
                clearInterval(runGame)
                setInterval(winLoop, 60)
            }
        }, 60)
    })

    
    
})
const gameloop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    upperGrass.render()
    lowerGrass.render()
    stripe1.render()
    stripe2.render()
    stripe3.render()
    stripe4.render()
    if(player.alive){
    player.draw()}
    car1.draw()
    car2.draw()
    bus1.draw()
    if(player.x > 352){player.x = 350}
    if(player.x < 0){player.x = 0}
    if(player.y < 110){player.y = 115}
    if(player.y > 326){player.y = 325}
    if(stripe1.x < -125){stripe1.x = 800}
    if(stripe1.x > 826){stripe1.x = -124}
    if(stripe2.x < -125){stripe2.x = 800}
    if(stripe2.x > 826){stripe2.x = -124}
    if(stripe3.x < -125){stripe3.x = 800}
    if(stripe3.x > 826){stripe3.x = -124}
    if(stripe4.x < -125){stripe4.x = 800}
    if(stripe4.x > 826){stripe4.x = -124}
    if(playerDistance >= 6000){house.draw()}
    
}



//when you win
const winLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.x = 100
    player.height = 150
    player.width = 150
    player.draw()
    homie.draw()
    // setInterval(()=>{
    //     player.y += 10
    //     homie.y-= 10
    //     player.y -= 10
    //     homie.y-= 10
    // }, 500)
    document.getElementById("winScreen").style.display = "block"

}

//move the red car
const carFunc = () => {
const moveCar1 = setInterval(()=>{

    if (car1.x < -1200) {car1.x = 800}
    car1.x -= 15
    if(player.alive === false){clearInterval(moveCar1)}
}, 40)}
//move the blue car
const carFunc2 = () => {
const moveCar2 = setInterval(()=>{

    if (car2.x < -800) {car2.x = 800}
    car2.x -= 17
    if (player.alive === false){clearInterval(moveCar2)}
}, 60)}
//move the bus
const busFunc = () => {
const moveBus1 = setInterval(()=>{

    if (bus1.x < -1000){bus1.x = 874}
    bus1.x -= 11
    if(player.alive === false){clearInterval(moveBus1)}
}, 40)}

const movementHandler = (e) => {
    switch (e.keyCode) {
        case(87):
        // move the player up
            player.y -= 10
            break
        // move the player left and the stripes to the right
        case(65):
            player.x -= 10
            stripe1.x +=10
            stripe2.x +=10
            stripe3.x +=10
            stripe4.x +=10
            playerDistance -=10
            if(playerDistance >=6000){house.x += 10}
            break
        // move the player down
        case (83):
            player.y += 10
            break
        // move the player right and the stripes to the left
        case(68):
            player.x += 10
            stripe1.x -=10
            stripe2.x -=10
            stripe3.x -=10
            stripe4.x -=10
            if(playerDistance >= 6000){house.x -=10}
            playerDistance += 10
            break

    }
}

//test for collisison with car and subtract one health
//when health = 0 kill the player
const detectHit = () => {
    if(player.x + player.width > car1.x
        && player.x < car1.x + car1.width
        && player.y < car1.y + car1.height
        && player.y + player.height > car1.y) {
            player.health -= 1
            car1.x = player.x - car1.width
            console.log(player.health)
            
        }
    if(player.x + player.width > car2.x
        && player.x < car2.x + car2.width
        && player.y < car2.y + car2.height
        && player.y + player.height > car2.y) {
            player.health -= 1
            car2.x = player.x - car2.width
        }


    if (player.health <= 0){
        player.alive = false
    }
    
   
}

const detectWin = () => {
    if(player.x + player.width > house.x
        && player.x < house.x + house.width
        && player.y < house.y + house.height
        && player.y + player.height > house.y) {
            player.win = true
        }

}