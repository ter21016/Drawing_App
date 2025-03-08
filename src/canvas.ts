export class CanvasApp {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private isDrawing: boolean = false;
    private brushColor: string = "#000000";
    private brushSize: number = 5;
    private startX: number = 0;
    private startY: number = 0;
    private tool: string = "draw";

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.canvas.width = window.innerWidth * 0.8;
        this.canvas.height = 500;
        this.addEventListeners();
    }

    private addEventListeners(): void {
        this.canvas.addEventListener("mousedown", this.startDrawing.bind(this));
        this.canvas.addEventListener("mousemove", this.draw.bind(this));
        this.canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
    }

    private startDrawing(event: MouseEvent): void {
        this.isDrawing = true;
        this.startX = event.offsetX;
        this.startY = event.offsetY;
        if (this.tool !== "draw") return;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
    }

    private draw(event: MouseEvent): void {
        if (!this.isDrawing) return;
        if (this.tool === "draw") {
            this.ctx.lineTo(event.offsetX, event.offsetY);
            this.ctx.strokeStyle = this.brushColor;
            this.ctx.lineWidth = this.brushSize;
            this.ctx.stroke();
        }
    }

    private stopDrawing(): void {
        this.isDrawing = false;
    }

    public setBrushColor(color: string): void {
        this.brushColor = color;
    }

    public setBrushSize(size: number): void {
        this.brushSize = size;
    }

    public setTool(tool: string): void {
        this.tool = tool;
    }

    public clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public saveCanvas(): void {
        const link = document.createElement("a");
        link.href = this.canvas.toDataURL("image/png");
        link.download = "drawing.png";
        link.click();
    }
}
