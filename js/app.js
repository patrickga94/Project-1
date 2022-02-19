console.log("hello")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')
const img = document.getElementById("playerSprite")
const redCar = document.getElementById("redCar")
const blueCar = document.getElementById("blueCar")
const bus = document.getElementById("bus")

canvas.setAttribute('width', getComputedStyle(canvas)['width'])
canvas.setAttribute('height', getComputedStyle(canvas)['height'])


let imgX = 10
let imgY = 200


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






class Guy {
    constructor (x, y, color, height, width) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.height = height,
        this.width = width,
        this.health = 3
        this.alive = true,
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.height, this.width)
        }
    }
}
//create a placeholder player character
// let player = new Guy(10, 200, "grey", 45, 45)
//create 3 road stripes for now
let stripe1 = new Guy(0, 240, "yellow", 100, 10)
let stripe2 = new Guy(175, 240, "yellow", 100, 10)
let stripe3 = new Guy(350, 240, "yellow", 100, 10)
let stripe4 = new Guy(525, 240, "yellow", 100, 10)
let upperGrass = new Guy(0, 0, "green", 700, 125)
let lowerGrass = new Guy(0, 375, "green", 700, 125)
// let car1 = new Guy (700, 136, "red", 100, 75)
// let car2 = new Guy (700, 260, "blue", 100, 75)
let player = new Sprite (img, imgX, imgY, 50, 50)
let car1 = new Sprite (redCar, 700, 136, 100, 75)
let car2 = new Sprite (blueCar, 700, 260, 100, 75)
let bus1 = new Sprite (bus, 700, 200,  200, 85)

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('keydown', movementHandler)
    setInterval(gameloop, 60)
    setInterval(moveCar1, 2000)
    setInterval(moveCar2, 1000)
    setInterval(moveBus1, 5000)
    
    
    
    
    

})
const gameloop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    upperGrass.render()
    lowerGrass.render()
    stripe1.render()
    stripe2.render()
    stripe3.render()
    stripe4.render()
    player.draw()
    if(imgX > 681){imgX = 10}
    if(imgX < -21){imgX = 680}
    car1.draw()
    car2.draw()
    bus1.draw()
    if(player.x > 681){player.x = 10}
    if(player.x < -21){player.x = 680}
    if(stripe1.x < -125){stripe1.x = 700}
    if(stripe1.x > 826){stripe1.x = -124}
    if(stripe2.x < -125){stripe2.x = 700}
    if(stripe2.x > 826){stripe2.x = -124}
    if(stripe3.x < -125){stripe3.x = 700}
    if(stripe3.x > 826){stripe3.x = -124}
    if(stripe4.x < -125){stripe4.x = 700}
    if(stripe4.x > 826){stripe4.x = -124}
    // if(car.x < -300){car.x = 700}
}

const moveCar1 = setInterval(()=>{
    if (car1.x < -1200) {car1.x = 700}
    car1.x -= 20
}, 40)

const moveCar2 = setInterval(()=>{
    if (car2.x < -800) {car2.x = 700}
    car2.x -= 20
}, 60)

const moveBus1 = setInterval(()=>{
    if (bus1.x < -1000){bus1.x = 700}
    bus1.x -= 20
}, 40)

const movementHandler = (e) => {
    switch (e.keyCode) {
        case(87):
        // move the player up
            player.y -= 10
            imgY -= 10
            break
        // move the player left and the stripe to the right
        case(65):
            player.x -= 10
            imgX -= 10
            stripe1.x +=10
            stripe2.x +=10
            stripe3.x +=10
            stripe4.x +=10
            break
        // move the player down
        case (83):
            player.y += 10
            imgY += 10
            break
        // move the player right and the stripe to the left
        case(68):
            player.x += 10
            imgX += 10
            stripe1.x -=10
            stripe2.x -=10
            stripe3.x -=10
            stripe4.x -=10
            break

    }
}

