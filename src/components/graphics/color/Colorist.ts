export class StrokeStyle {
    strokeColor: string | CanvasGradient | CanvasPattern | undefined;
    strokeWidth: number | undefined;

    constructor(strokeColor: string | CanvasGradient | CanvasPattern, strokeWidth: number | undefined) {
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }

}

export abstract class Colorist {


    public static withStrokeStyle(func: () => void, strokeStyle: StrokeStyle, ctx: CanvasRenderingContext2D): void {

        const prevStrokeStyle = new StrokeStyle(ctx.strokeStyle, ctx.lineWidth);

        if (strokeStyle.strokeColor) {
            ctx.strokeStyle = strokeStyle.strokeColor;
        }
        if (strokeStyle.strokeWidth) {
            ctx.lineWidth = strokeStyle.strokeWidth;
        }
        func();

        // @ts-ignore
        ctx.lineWidth = prevStrokeStyle.strokeWidth;
        // @ts-ignore
        ctx.strokeStyle = prevStrokeStyle.strokeColor;

    }

}