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
    constructor(m, b, color, dash) {
        this.m = m
        this.b = b
        this.color = color
        this.dash = dash
    }

    // Draw the line on the canvas
    draw() {
        ctx.beginPath()
        if (dash == true) {
            ctx.setLineDash([5, 15])
        }
        ctx.strokeStyle = this.color
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

// Get random number from min to max
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Initialize the slope and intercept value
var slope = 0
document.getElementById("slopeValue").value = slope
var intercept = 0
document.getElementById("interceptValue").value = intercept
var dash = false
var randomSlope
var randomIntercept

// Generate random slope and intercept
function getRandom() {
    randomSlope = Math.round(getRandomArbitrary(-10, 10) * 10) / 10
    randomIntercept = Math.round(getRandomArbitrary(-5, 5) * 10) / 10
}
getRandom()

console.log(randomSlope)
console.log(randomIntercept)
// var line1X1 = 0
// var line1X2 = 0 
// var line1Y1 = 0
// var line1Y2 = 0
var line2X1 = 0
var line2X2 = 0
var line2Y1 = 0
var line2Y2 = 0


function play() {
    ctx.clearRect(0, 0, 510, 510)

    // Draw grid, axis, and ticks
    drawGrid()
    drawAxis()
    drawTicks()

    // Update the slope and intercept
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

    // Player line
    ctx.lineWidth = 3
    dash = false
    const line1 = new Line(slope, intercept, "#ffffff", dash)
    line1.draw()
    // line1X1 = line1.getPoint()[0][0]
    // line1Y1 = line1.getPoint()[0][1]
    // line1X2 = line1.getPoint()[1][0]
    // line1Y2 = line1.getPoint()[1][1]

    // Target line
    ctx.lineWidth = 2
    dash = true
    const line2 = new Line(randomSlope, randomIntercept, "#E0B0FF", dash)
    line2.draw()

    // Get the point x and y value and display
    line2X1 = line2.getPoint()[0][0]
    line2Y1 = line2.getPoint()[0][1]
    line2X2 = line2.getPoint()[1][0]
    line2Y2 = line2.getPoint()[1][1]
    document.getElementById("pt1").innerHTML = "(" + Math.round(line2X1 * 10) / 10 + ", " + Math.round(line2Y1 * 10) / 10 + ")"
    document.getElementById("pt2").innerHTML = "(" + Math.round(line2X2 * 10) / 10 + ", " + Math.round(line2Y2 * 10) / 10 + ")"

    // Reset the dash line
    ctx.setLineDash([])

    // Check if the player line the same as target line
    if (line1.m == line2.m && line1.b == line2.b) {
        alert("PASS");
        getRandom()
        document.location.reload();
    }

    requestAnimationFrame(play)
}

play()