const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const playground = document.getElementById("playground")

// Draw Coordinate
function drawGrid() {
    ctx.beginPath()
    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 0.5

    for (var i = 5; i <= 505; i += 50) {
        // vertical lines
        ctx.moveTo(i, 5)
        ctx.lineTo(i, 505)

        // horizontal lines
        ctx.moveTo(5, i)
        ctx.lineTo(505, i)
    }
    ctx.stroke()
    ctx.closePath()
}

// Draw axis
function drawAxis() {
    ctx.beginPath()
    ctx.strokeStyle = "#ff0000"
    ctx.lineWidth = 3

    // X axis
    ctx.moveTo(5, 255)
    ctx.lineTo(505, 255)

    // Y axis 
    ctx.moveTo(255, 5)
    ctx.lineTo(255, 505)

    ctx.stroke()
    ctx.closePath()
}

// Draw ticks
function drawTicks() {
    ctx.beginPath()
    ctx.fillStyle = "yellow"
    ctx.lineWidth = 1.5
    ctx.font = 'bold 15px serif';
    // Tick marks
    for (var i = 5; i <= 505; i += 50) {
        // X ticks
        ctx.moveTo(i, 248)
        ctx.lineTo(i, 262)
        // Y ticks
        ctx.moveTo(248, i)
        ctx.lineTo(262, i)

        ctx.fillText(((i - 5) / 50) - 5, i - 5, 265)
        ctx.fillText(-((i - 5) / 50) + 5, 257, i + 5)
    }
    ctx.stroke()
    ctx.closePath()
}



// Class for drawing the line
class Line {
    constructor(m, b) {
        this.m = m
        this.b = b
    }

    // Draw the line on the canvas
    draw() {
        ctx.beginPath()
        ctx.strokeStyle = "#ffffff"
        var temp = 50
        ctx.moveTo(255, 255 - this.b * 50)
        ctx.lineTo((255 - (-50 * temp)), (255 + ((-50 * this.m - this.b) * temp))) // magic numbers correspond to relative infinity
        ctx.moveTo(255, 255 - this.b * 50)
        ctx.lineTo((255 - (50 * temp)), (255 + ((50 * this.m - this.b) * temp)))
        ctx.stroke()
        ctx.closePath()
    }

    // Get the points on the axis
    getPoint() {
        return [[-this.b / this.m, 0], [0, this.b]]
    }
}

// Initialize the slope and intercept value
var slope = 0
document.getElementById("slopeValue").value = slope
var intercept = 0
document.getElementById("interceptValue").value = intercept

function play() {
    ctx.clearRect(0, 0, 510, 510)

    // Draw grid, axis, and ticks
    drawGrid()
    drawAxis()
    drawTicks()

    // Change the slope and intercept
    inputSlope = document.getElementById("slopeValue")
    inputIntercept = document.getElementById("interceptValue")
    slope = inputSlope.value
    intercept = inputIntercept.value
    if (slope > 10) {
        inputSlope.value = 10
        slope = 10
    }
    if (slope < -10) {
        inputSlope.value = -10
        slope = -10
    }
    if (intercept > 5) { 
        inputIntercept.value = 5
        intercept = 5 
    }
    if (intercept < -5) { 
        inputIntercept.value = -5
        intercept = -5 
    }

    ctx.lineWidth = 3
    const line1 = new Line(slope, intercept)
    line1.draw()

    requestAnimationFrame(play)
}

play()