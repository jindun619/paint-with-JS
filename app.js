const canvas = document.getElementById("js-canvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("js-range");
const mode = document.getElementById("js-mode");
const saveBtn = document.getElementById("js-save");

canvas.width = 700;
canvas.height = 700;

context.fillStyle = "white";
context.fillRect(0, 0, 700, 700);
context.strokeStyle = "black";
context.lineWidth = 2.5;

let painting = false;
let filling = false;


function startPainting () {
    painting = true;
}

function stopPaingting () {
    painting = false;
}

function onMouseMove (event) {
    const x = event.offsetX,
        y = event.offsetY;

    if(!painting) {
        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
}

function onMouseDown (event) {
    painting = true;
}

function handleColorClick (event) {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
}

function handleRangeChange (event) {
    const size = event.target.value;
    context.lineWidth = size;
}

function handleModeClick () {
    if (filling) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCM (event) {
    event.preventDefault();
}

function handleSaveClick () {
    const image = canvas.toDataURL();
    const link = document.createElement("a");

    link.href = image
    link.download = "Painted";

    link.click();
}


if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPaingting);
    canvas.addEventListener("mouseleave", stopPaingting);
    canvas.addEventListener("contextmenu", handleCM);
}

    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}