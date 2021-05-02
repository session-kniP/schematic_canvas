export abstract class DrawingElement {

    protected ctx: CanvasRenderingContext2D | undefined;

    setContext(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

}