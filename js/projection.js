const plain = document.getElementById("plain")
let dots = []
let depth = 0.5
const svg = "http://www.w3.org/2000/svg"
const changerX = document.getElementById("changerX")
const changerY = document.getElementById("changerY")
const changerZ = document.getElementById("changerZ")
let dimensionDot = document.createElementNS(svg, "circle")
square = [[200, 200], [300, 200], [300, 300], [200, 300]]
triangle = [[250, 200], [250+25*Math.sqrt(3), 275], [250-25*Math.sqrt(3), 275]]
pentagon = [[250, 200], [297.553, 234.550], [279.389, 290.451], [220.611, 290.451], [202.447, 234.550]]
pentastar = [[250, 200], [279.389, 290.451], [202.447, 234.550], [297.553, 234.550], [220.611, 290.451]]

dimensionDot.setAttribute("fill", "green")
dimensionDot.setAttribute("r", 2)
dimensionDot.setAttribute("cx", 250)
dimensionDot.setAttribute("cy", 250)
plain.append(dimensionDot)

changerX.addEventListener("input", function() {
    dimensionDot.setAttribute("cx", changerX.value)
    dimensify(plain, dimensionDot, dots, depth)
})
changerY.addEventListener("input", function() {
    dimensionDot.setAttribute("cy", changerY.value)
    dimensify(plain, dimensionDot, dots, depth)
})
changerZ.addEventListener("input", function() {
    depth = 500 / changerZ.value
    dimensify(plain, dimensionDot, dots, depth)
})

function visualise(plain, object) {
    for (const coords of object) {
        const dot = document.createElementNS(svg, "circle")
        const cx = coords[0]
        const cy = coords[1]
        dot.setAttribute("cx", cx)
        dot.setAttribute("cy", cy)
        dot.setAttribute("r", 2)
        dot.setAttribute("fill", "blue")
        plain.append(dot)
        dots.push([cx, cy])
    }
    for (let i = 0; i < object.length; i++) {
        const line = document.createElementNS(svg, "line")
        line.setAttribute("x1", object[i][0])
        line.setAttribute("y1", object[i][1])
        if (i === object.length - 1) line.setAttribute("x2", object[0][0])
        else line.setAttribute("x2", object[i+1][0])
        
        if (i === object.length - 1) line.setAttribute("y2", object[0][1])
        else line.setAttribute("y2", object[i+1][1])
        line.setAttribute("stroke", "red")
        line.setAttribute("stroke-width", 1)
        plain.append(line)
    }
}
function dimensify(plain, dot, dotList, depthValuator) {
    let dimDots = []
    document.querySelectorAll("#dimension").forEach(dimensionLine => {
        dimensionLine.remove()
    })
    for (let point of dotList) {
        //console.log(depthValuator)
        const line = document.createElementNS(svg, "line")
        dotCx = dot.getAttribute("cx")
        dotCy = dot.getAttribute("cy")
        line.setAttribute("x1", point[0])
        line.setAttribute("y1", point[1])
        line.setAttribute("x2", dotCx)
        line.setAttribute("y2", dotCy)
        line.setAttribute("stroke", "purple")
        line.id = "dimension"
        plain.append(line)
        const everDot = document.createElementNS(svg, "circle")
        const depthCx = point[0] + depthValuator*(Number(dotCx) - point[0])
        const depthCy = point[1] + depthValuator*(Number(dotCy) - point[1])
        everDot.setAttribute("cx", depthCx)
        everDot.setAttribute("cy", depthCy)
        everDot.setAttribute("r", 2)
        everDot.setAttribute("fill", "orange")
        everDot.id = "dimension"
        dimDots.push([depthCx, depthCy])
        plain.append(everDot)
        //console.log(depthCx, depthCy)
    }
    document.querySelectorAll("#dimensionThing").forEach(thing => {
        thing.remove()
    })
    for (let i = 0; i < dimDots.length; i++) {
        const line = document.createElementNS(svg, "line")
        line.setAttribute("x1", dimDots[i][0])
        line.setAttribute("y1", dimDots[i][1])
        if (i === dimDots.length - 1) line.setAttribute("x2", dimDots[0][0])
        else line.setAttribute("x2", dimDots[i+1][0])
        
        if (i === dimDots.length - 1) line.setAttribute("y2", dimDots[0][1])
        else line.setAttribute("y2", dimDots[i+1][1])
        line.setAttribute("stroke", "red")
        line.setAttribute("stroke-width", 1)
        line.id = "dimensionThing"
        plain.prepend(line)
    }
    let i = 0
    for (let dot of dimDots) {
        const line = document.createElementNS(svg, "line")
        line.setAttribute("x1", dot[0])
        line.setAttribute("y1", dot[1])
        line.setAttribute("x2", dotList[i][0])
        line.setAttribute("y2", dotList[i][1])
        line.id = "dimensionThing"
        line.setAttribute("stroke", "red")
        plain.append(line)
        i++
    }
}
const presetSquare = document.getElementById("square")
const presetTriangle = document.getElementById("triangle")
const presetPentagon = document.getElementById("pentagon")
const presetPentastar = document.getElementById("pentastar")

presetSquare.addEventListener("click", function () {
    plain.innerHTML = ""
    dots = []
    visualise(plain, square)
    dimensify(plain, dimensionDot, dots, depth)
})
presetTriangle.addEventListener("click", function () {
    plain.innerHTML = ""
    dots = []
    visualise(plain, triangle)
    dimensify(plain, dimensionDot, dots, depth)
})
presetPentagon.addEventListener("click", function () {
    plain.innerHTML = ""
    dots = []
    visualise(plain, pentagon)
    dimensify(plain, dimensionDot, dots, depth)
})
presetPentastar.addEventListener("click", function () {
    plain.innerHTML = ""
    dots = []
    visualise(plain, pentastar)
    dimensify(plain, dimensionDot, dots, depth)
})
gyroCheck = document.getElementById("gyroCheck")
arMode = document.getElementById("arMode")
if (window.DeviceOrientationEvent) {
    gyroCheck.innerHTML = `Turn Gyroscope mode (available)`
}
arMode.addEventListener("input", function() {
    if (arMode.checked) {
        window.addEventListener("deviceorientation", handle = (event) => {
            dimensionDot.setAttribute("cx", -(-event.gamma+90)*(0-500)/(90+90) + 0)
            dimensionDot.setAttribute("cy", -(-event.beta+90)*(0-500)/(90+90) + 0)
            dimensify(plain, dimensionDot, dots, depth)
    })} else {
        window.removeEventListener("deviceorientation", handle)
    }
})

visualise(plain, square)
dimensify(plain, dimensionDot, dots, depth)

