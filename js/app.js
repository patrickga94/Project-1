console.log("hello")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

canvas.setAttribute('width', getComputedStyle(canvas)['width'])
canvas.setAttribute('height', getComputedStyle(canvas)['height'])

ctx.fillStyle = 'green';
ctx.strokeStyle = 'green';
ctx.lineWidth = 5;





class Guy {
    constructor (x, y, color, height, width) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.height = height,
        this.width = width,
        this.alive = true,
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.height, this.width)
        }
    }
}
//create a placeholder player character
let player = new Guy(10, 200, "green", 16, 16)
//create a road stripe for now
let stripe = new Guy(350, 240, "green", 60, 10)

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('keydown', movementHandler)
    setInterval(gameloop, 60)

})
const gameloop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0, 0, 700, 125)
    ctx.strokeRect(0, 0, 700, 125)
    ctx.fillRect(0, 375, 700, 125)
    ctx.strokeRect(0, 375, 700, 125)
    player.render()
    stripe.render()
}

const movementHandler = (e) => {
    switch (e.keyCode) {
        case(87):
        // move the player up
            player.y -= 10
            break
        // move the player left
        case(65):
            player.x -= 10
            stripe.x +=10
            break
        // move the player down
        case (83):
            player.y += 10
            break
        // move the player right
        case(68):
            player.x += 10
            stripe.x -=10
            break

    }
}

// const movementHandler = (e) => {
//     //we can use if..else and key codes to determine player movement
//     //keycodes refer to specific keyboard keys with a number
//     //if we want to use wasd the key codes are as follows:
//     //w=87 a=65, s=83, d=68
//     //up=38, down=40, left=37, right=39
//     //we can use a switch case which can be handy when we have multiple possibilities
//     //switch case has a main switch, cases (which are our inputs in this instance)
//     //we also need to break out of our cases using the keyword break
//     switch (e.keyCode) {
//         case (87):
//             //we'll move the player up
//             player.y -= 10
//             //then break the case
//             break
//         case (65):
//             //move the player left
//             player.x -= 10
//             break
//         case (83):
//             //move player down
//             player.y += 10
//             break
//         case (68):
//             player.x +=10
//             break
//     }
// }