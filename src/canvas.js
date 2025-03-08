"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasApp = void 0;
class CanvasApp {
    constructor(canvasId) {
        this.isDrawing = false;
        this.brushColor = "#000000";
        this.brushSize = 5;
        this.startX = 0;
        this.startY = 0;
        this.tool = "draw";
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth * 0.8;
        this.canvas.height = 500;
        this.addEventListeners();
    }
    addEventListeners() {
        this.canvas.addEventListener("mousedown", this.startDrawing.bind(this));
        this.canvas.addEventListener("mousemove", this.draw.bind(this));
        this.canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
    }
    startDrawing(event) {
        this.isDrawing = true;
        this.startX = event.offsetX;
        this.startY = event.offsetY;
        if (this.tool !== "draw")
            return;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
    }
    draw(event) {
        if (!this.isDrawing)
            return;
        if (this.tool === "draw") {
            this.ctx.lineTo(event.offsetX, event.offsetY);
            this.ctx.strokeStyle = this.brushColor;
            this.ctx.lineWidth = this.brushSize;
            this.ctx.stroke();
        }
    }
    stopDrawing() {
        this.isDrawing = false;
    }
    setBrushColor(color) {
        this.brushColor = color;
    }
    setBrushSize(size) {
        this.brushSize = size;
    }
    setTool(tool) {
        this.tool = tool;
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    saveCanvas() {
        const link = document.createElement("a");
        link.href = this.canvas.toDataURL("image/png");
        link.download = "drawing.png";
        link.click();
    }
}
exports.CanvasApp = CanvasApp;
