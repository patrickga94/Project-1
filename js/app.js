const game = document.getElementById("canvas")
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
const heart = document.getElementById("heart")
const gravestone = document.getElementById("graveStone")
const interior = document.getElementById("houseInside")
const explosion = document.getElementById("explosion")
const couch = document.getElementById("homeSofa")
const audio = new Audio ("bbc_demolition_07022509_1_1.mp3")
const roboVoice = new Audio ("robot-voice.mp3")
const bottle = document.getElementById("beer")
const ohYeah = new Audio ("zapsplat_human_male_shout_oh_yeah_happy_celebrate_001_14411.mp3")

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
        this.draw = function () {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }
}

class PlayerSprite {
    constructor (image, x, y, width, height) {
        this.image = image,
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height,
        this.health = 3
        this.alive = true
        this.beer = 0,
        this.direction = {
            up: false,
            down: false,
            right: false,
            left: false
        }
        this.draw = function () {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }


    }
    setDirection = function (key) {
        //pressing key(keydown), changes direction from false to true
        if(key.toLowerCase() == "w") {this.direction.up = true}
        if(key.toLowerCase() == "a") {this.direction.left = true}
        if(key.toLowerCase() == "s") {this.direction.down = true}
        if(key.toLowerCase() == "d") {this.direction.right = true}

    }
    unsetDirection = function (key) {
        //releasing key(keyup), changes direction from false to true
        if(key.toLowerCase() == "w") {this.direction.up = false}
        if(key.toLowerCase() == "a") {this.direction.left = false}
        if(key.toLowerCase() == "s") {this.direction.down = false}
        if(key.toLowerCase() == "d") {this.direction.right = false}

    }
    movePlayer = function () {
        if (this.direction.up){
            this.y -= 10
            if(this.y <= 0){
                this.y = 0
            }
        }
        if (this.direction.left){
            this.x -= 10
            if(this.x <= 0){
                this.x = 0
            }
        }
        if (this.direction.down){
            this.y += 10
            if(this.y + this.height >= game.height){
                this.y = game.height - this.height
            }
        }
        if (this.direction.right){
            this.x += 10
            if(this.x + this.width >= game.width){
                this.x = game.width - this.width
            }
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
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.height, this.width)
        }
    }
}

const spawnLocation = () => {
    return Math.floor(Math.random() * (315-125) + 125)
}

let stripe1 = new Block(0, 240, "yellow", 100, 10)
let stripe2 = new Block(200, 240, "yellow", 100, 10)
let stripe3 = new Block(400, 240, "yellow", 100, 10)
let stripe4 = new Block(600, 240, "yellow", 100, 10)
let upperGrass = new Block(0, 0, "green", 800, 125)
let lowerGrass = new Block(0, 375, "green", 800, 125)
let player = new PlayerSprite (img, 10, 200, 50, 50)
let car1 = new Sprite (redCar, 800, spawnLocation(), 100, 50)
let car2 = new Sprite (blueCar, 800, spawnLocation(), 100, 60)
let bus1 = new Sprite (bus, 800, 200,  150, 85)
let house = new Sprite (homieHouse, 800, 0, 125, 125)
let homie = new Sprite (myHomie, 200, 350, 150, 150)
let heart1 = new Sprite (heart, 700, 435, 50, 50)
let heart2 = new Sprite (heart, 650, 435, 50, 50)
let heart3 = new Sprite (heart, 600, 435, 50, 50)
let heart4 = new Sprite (heart, 550, 435, 50, 50)
let collectableHeart = new Sprite(heart, 800, spawnLocation(), 50, 50)
let yourGrave = new Sprite (gravestone, 180, 25, 400, 450)
let inside = new Sprite (interior, 0, 0, 800, 500)
let blowUp = new Sprite(explosion, player.x, player.y, 50, 50)
let sofa = new Sprite(couch, 0, 0, 800, 500)
let introPlayer = new Sprite(img, 300, 220, 200, 200)
let beerBottle = new Sprite(bottle, 900, spawnLocation(), 50, 50)
let beer1 = new Sprite(bottle, 10, 435, 50, 50)
let beer2 = new Sprite(bottle, 60, 435, 50, 50)
let beer3 = new Sprite(bottle, 110, 435, 50, 50)
let beer4 = new Sprite(bottle, 160, 435, 50, 50)
let beer5 = new Sprite(bottle, 210, 435, 50, 50)
let beer6 = new Sprite(bottle, 260, 435, 50, 50)




document.addEventListener("DOMContentLoaded", () => {
    sofa.draw()
    introPlayer.draw()
    document.addEventListener('keydown', movementHandler)
    intro.addEventListener("click", ()=>{
        intro.style.display = "none"
        const runGame = setInterval(gameloop, 60)
        const isDead = setInterval(() =>{
            if(player.alive === false) {
                audio.play()
                clearInterval(runGame)
                clearInterval(isWin)
                clearTimeout(moveCar1)
                clearTimeout(moveCar2)
                clearTimeout(moveBus)
                blowUp.x = player.x
                blowUp.y = player.y
                    blowUp.draw()
                setTimeout(()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    game.style.backgroundColor = "green"
                    yourGrave.draw()
                    deathScreen.style.display = "block"
                    clearInterval(isDead)
                }, 500)

            }
        })

        const isWin = setInterval(detectWin, 60)
        const moveCar1 = setTimeout(carFunc, 1000)
        const moveCar2 = setTimeout(carFunc2, 5000)
        const moveBus = setTimeout(busFunc, 9000)

        const playerWon = setInterval(()=>{
            if(player.win){
                clearInterval(runGame)
                winLoop()
                clearInterval(playerWon)
            }
        }, 60)
        })

    deathScreen.addEventListener("click", ()=>{
        game.style.backgroundColor = "rgb(22, 21, 21)"
        player.health = 3
        player.beer = 0
        player.alive = true
        player.x = 10
        player.y = 200
        car1.x = 800
        car2.x = 800
        bus1.x = 800
        house.x = 800
        playerDistance = 0
        collectableHeart.x = 800
        deathScreen.style.display = "none"
        const runGame = setInterval(gameloop, 60)
        const isDead = setInterval(() =>{
            if(player.alive === false) {
                audio.play()
                clearInterval(runGame)
                clearInterval(isWin)
                clearTimeout(moveCar1)
                clearTimeout(moveCar2)
                clearTimeout(moveBus)
                document.getElementById("needMore").style.display = "none"
                blowUp.x = player.x
                blowUp.y = player.y
                blowUp.draw()
                    setTimeout(()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    game.style.backgroundColor = "green"
                    yourGrave.draw()
                    deathScreen.style.display = "block"
                    clearInterval(isDead)
                }, 500)

            }
        })

        const isWin = setInterval(detectWin, 60)
        const moveCar1 = setTimeout(carFunc, 1000)
        const moveCar2 = setTimeout(carFunc2, 5000)
        const moveBus = setTimeout(busFunc, 10000)

        const playerWon = setInterval(()=>{
            if(player.win){
                clearInterval(runGame)
                winLoop()
                clearInterval(playerWon)
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
        player.draw()
    }
    player.movePlayer()
    beerBottle.draw()
    car1.draw()
    car2.draw()
    bus1.draw()
    if(playerDistance >= 3000){
        collectableHeart.draw()
    }
    if (player.health === 4){
    heart1.draw()
    heart2.draw()
    heart3.draw()
    heart4.draw()
    } else if(player.health === 3){
        heart1.draw()
        heart2.draw()
        heart3.draw()
    } else if (player.health === 2){
        heart1.draw()
        heart2.draw()
    } else {
        heart1.draw()
    }
    if(player.beer === 1){
        beer1.draw()
    }
    if(player.beer === 2){
        beer1.draw()
        beer2.draw()
    }
    if(player.beer === 3){
        beer1.draw()
        beer2.draw()
        beer3.draw()
    }
    if(player.beer === 4){
        beer1.draw()
        beer2.draw()
        beer3.draw()
        beer4.draw()
    }
    if(player.beer === 5){
        beer1.draw()
        beer2.draw()
        beer3.draw()
        beer4.draw()
        beer5.draw()
    }
    if(player.beer >= 6){
        beer1.draw()
        beer2.draw()
        beer3.draw()
        beer4.draw()
        beer5.draw()
        beer6.draw()
    }
    if(player.x + player.width > 400){
        player.x = 400 - player.width
    }
    if(player.x < 0){player.x = 0}
    if(player.y < 110){player.y = 110}
    if(player.y > 326){player.y = 326}
    if(stripe1.x < -100){stripe1.x = 800}
    if(stripe1.x > 800){stripe1.x = -100}
    if(stripe2.x < -100){stripe2.x = 800}
    if(stripe2.x > 800){stripe2.x = -100}
    if(stripe3.x < -100){stripe3.x = 800}
    if(stripe3.x > 800){stripe3.x = -100}
    if(stripe4.x < -100){stripe4.x = 800}
    if(stripe4.x > 800){stripe4.x = -100}
    if(beerBottle.x <= 0-beerBottle.width){
        beerBottle.x = 1000
        beerBottle.y = spawnLocation()
    }
    if(playerDistance >= 6000){house.draw()}
    detectHit(car1)
    detectHit(car2)
    detectHit(bus1)
    detectBeer()
    detectHeart()
    
}



//when you win
const winLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    inside.draw()
    player.x = 100
    player.y = 400
    player.height = 100
    player.width = 100
    player.draw()
    homie.draw()
    setInterval(()=>{
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        inside.draw()
        ohYeah.play()
        player.x = 100
        player.height = 100
        player.width = 100
        player.draw()
        homie.draw()
        player.y = 300
        homie.y = 300
        setTimeout(()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            inside.draw()
            player.x = 100
            player.height = 100
            player.width = 100
            player.draw()
            homie.draw()
            player.y = 400
            homie.y = 350
        }, 500)
    }, 1000)
 
    document.getElementById("winScreen").style.display = "block"

}

//move the red car
const carFunc = () => {
const moveCar1 = setInterval(()=>{

    if (car1.x < -1200) {
        car1.x = 800
        car1.y = spawnLocation()
        }
    car1.x -= 15
    if(player.alive === false){clearInterval(moveCar1)}
}, 40)}
//move the blue car
const carFunc2 = () => {
const moveCar2 = setInterval(()=>{

    if (car2.x < -800) {
        car2.x = 800
        car2.y = spawnLocation()
        }
    car2.x -= 17
    if (player.alive === false){clearInterval(moveCar2)}
}, 60)}
// move the bus
const busFunc = () => {
const moveBus1 = setInterval(()=>{
    if (bus1.x < -1000){
        bus1.x = 874
        bus1.y = spawnLocation()
        }
    bus1.x -= 11
    if(player.alive === false){clearInterval(moveBus1)}
}, 40)}

document.addEventListener("keydown", (e)=>{
    player.setDirection(e.key)
})

document.addEventListener("keyup", (e)=>{
    if(["w", "a", "s", "d"].includes(e.key)){
        player.unsetDirection(e.key)
    }
})


const movementHandler = (e) => {
    switch (e.keyCode) {
        case(65):
            stripe1.x +=10
            stripe2.x +=10
            stripe3.x +=10
            stripe4.x +=10
            playerDistance -=10
            if(playerDistance >=6000){house.x += 10}
            break
        // move the player right and the stripes to the left
        case(68):
            stripe1.x -=10
            stripe2.x -=10
            stripe3.x -=10
            stripe4.x -=10
            beerBottle.x -= 10
            if(playerDistance >= 3000){collectableHeart.x -= 10}
            if(playerDistance >= 6000){house.x -=10}
            playerDistance += 10
            break

    }
}

//test for collisison with car and subtract one health
//when health = 0 kill the player
const detectHit = (thing) => {
    if(player.x + player.width > thing.x
        && player.x < thing.x + thing.width
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            roboVoice.play()
            player.health -= 1
            thing.x = player.x - thing.width
            
        }
    if (player.health <= 0){
        player.alive = false
    }
}

const detectBeer = () => {
    if(player.x + player.width > beerBottle.x
        && player.x < beerBottle.x + beerBottle.width
        && player.y < beerBottle.y + beerBottle.height
        && player.y + player.height > beerBottle.y) {
            beerBottle.x = 1000
            player.beer += 1
            beerBottle.y = spawnLocation()
        }
    }

const detectHeart = () => {
    if(player.x + player.width > collectableHeart.x
        && player.x < collectableHeart.x + collectableHeart.width
        && player.y < collectableHeart.y + collectableHeart.height
        && player.y + player.height > collectableHeart.y) {
            player.health += 1
            collectableHeart.x = -100
        }
}

const detectWin = () => {
    if(player.x + player.width > house.x
        && player.x < house.x + house.width
        && player.y < house.y + house.height
        && player.y + player.height > house.y
        && player.beer >= 5) {
            document.getElementById("needMore").style.display = "none"
            player.win = true
        } else if(player.x + player.width > house.x
            && player.x < house.x + house.width
            && player.y < house.y + house.height
            && player.y + player.height > house.y){
                document.getElementById("needMore").style.display = "block"
                setTimeout(()=>{
                    document.getElementById("needMore").style.display = "none"

                }, 3000)

            }
}