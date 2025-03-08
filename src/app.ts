import { CanvasApp } from "./canvas";

const canvasApp = new CanvasApp("drawingCanvas");

// Toolbar event listeners
document.getElementById("clear")!.addEventListener("click", () => canvasApp.clearCanvas());
document.getElementById("save")!.addEventListener("click", () => canvasApp.saveCanvas());
document.getElementById("colorPicker")!.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    canvasApp.setBrushColor(target.value);
});
document.getElementById("brushSize")!.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    canvasApp.setBrushSize(Number(target.value));
});

document.getElementById("line")!.addEventListener("click", () => canvasApp.setTool("line"));
document.getElementById("rectangle")!.addEventListener("click", () => canvasApp.setTool("rectangle"));
document.getElementById("circle")!.addEventListener("click", () => canvasApp.setTool("circle"));
document.getElementById("text")!.addEventListener("click", () => canvasApp.setTool("text"));
