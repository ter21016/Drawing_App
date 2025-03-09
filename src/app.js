const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

let isDrawing = false;
let brushColor = '#000000';
let brushSize = 5;
let currentTool = 'brush'; // Default tool
let startX, startY, endX, endY;
let textInputVisible = false;

// Array to store drawings
let drawings = [];

// Event listeners for drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Toolbar event listeners
document.getElementById('colorPicker').addEventListener('change', (e) => {
  brushColor = e.target.value;
});

document.getElementById('brushSize').addEventListener('input', (e) => {
  brushSize = e.target.value;
});

document.getElementById('clear').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawings = []; // Clear the stored drawings
});

// Tool selection
document.getElementById('line').addEventListener('click', () => {
  currentTool = 'line';
});

document.getElementById('rectangle').addEventListener('click', () => {
  currentTool = 'rectangle';
});

document.getElementById('circle').addEventListener('click', () => {
  currentTool = 'circle';
});

document.getElementById('brush').addEventListener('click', () => {
  currentTool = 'brush';
});

document.getElementById('text').addEventListener('click', () => {
  currentTool = 'text';
});

// Start Drawing Function
function startDrawing(e) {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;

  if (currentTool === 'text') {
    addText(startX, startY);
  } else if (currentTool === 'brush') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
}

// Drawing Function
function draw(e) {
  if (!isDrawing || currentTool === 'text') return;

  endX = e.offsetX;
  endY = e.offsetY;

  // Only clear the canvas for shapes, not for the brush
  if (currentTool !== 'brush') {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  redrawCanvas(); // Redraw previous drawings
  }

  ctx.lineWidth = brushSize;
  ctx.strokeStyle = brushColor;
  ctx.fillStyle = brushColor;
  ctx.lineCap = 'round';

  if (currentTool === 'brush') {
    ctx.lineTo(endX, endY);
    ctx.stroke();
  } else if (currentTool === 'line') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  } else if (currentTool === 'rectangle') {
    let width = endX - startX;
    let height = endY - startY;
    ctx.strokeRect(startX, startY, width, height);
  } else if (currentTool === 'circle') {
    let radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// Stop Drawing Function
function stopDrawing() {
  if (!isDrawing) return;
  isDrawing = false;

  // Store drawing data
  drawings.push({
    tool: currentTool,
    startX,
    startY,
    endX,
    endY,
    color: brushColor,
    size: brushSize
  });

  ctx.beginPath();
}

// Redraw everything stored in the `drawings` array
function redrawCanvas() {
  drawings.forEach((drawing) => {
    ctx.lineWidth = drawing.size;
    ctx.strokeStyle = drawing.color;
    ctx.fillStyle = drawing.color;
    ctx.lineCap = 'round';

    if (drawing.tool === 'line') {
      ctx.beginPath();
      ctx.moveTo(drawing.startX, drawing.startY);
      ctx.lineTo(drawing.endX, drawing.endY);
      ctx.stroke();
    } else if (drawing.tool === 'rectangle') {
      let width = drawing.endX - drawing.startX;
      let height = drawing.endY - drawing.startY;
      ctx.strokeRect(drawing.startX, drawing.startY, width, height);
    } else if (drawing.tool === 'circle') {
      let radius = Math.sqrt(Math.pow(drawing.endX - drawing.startX, 2) + Math.pow(drawing.endY - drawing.startY, 2));
      ctx.beginPath();
      ctx.arc(drawing.startX, drawing.startY, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (drawing.tool === 'text') {
      ctx.font = `${drawing.size * 3}px Arial`;
      ctx.fillText(drawing.text, drawing.startX, drawing.startY);
    }
  });
}

// Function to Add Text
function addText(x, y) {
  if (textInputVisible) return;
  textInputVisible = true;

  let input = document.createElement("input");
  input.type = "text";
  input.style.position = "absolute";
  input.style.left = `${x + canvas.offsetLeft}px`;
  input.style.top = `${y + canvas.offsetTop}px`;
  input.style.fontSize = `${brushSize * 3}px`;
  input.style.color = brushColor;

  document.body.appendChild(input);
  input.focus();

  input.addEventListener("blur", function () {
    let text = input.value;
    if (text.trim() !== "") {
      drawings.push({
        tool: "text",
        startX: x,
        startY: y,
        text: text,
        color: brushColor,
        size: brushSize
      });
      redrawCanvas();
    }
    document.body.removeChild(input);
    textInputVisible = false;
  });

  // Handle pressing Enter key
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      input.blur(); // Trigger the blur event
    }
  });
}
