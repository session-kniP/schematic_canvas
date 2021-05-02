import {CanvasRect} from './CanvasRect';
import {Point} from './Point';
import {Image} from "../image/Image";

export class CanvasFrame extends CanvasRect {

    private image: Image | undefined;
    private text: string | undefined;

    constructor(points: Point[], color: string, image?: Image, text?: string) {
        super(points, color);
        this.image = image;
        this.text = text;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        if (this.image && this.image.getImage()) {
            // @ts-ignore
            ctx.drawImage(this.image.getImage(), this.getLeftPoint().getX(), this.getUpperPoint().getY(), this.image.getWidth(), this.image.getHeight());
            const prevStrokeStyle = ctx.strokeStyle;
            ctx.strokeStyle = this.borderColor;
            ctx.strokeRect(this.getLeftPoint().getX(), this.getUpperPoint().getY(), this.image?.getWidth(), this.image?.getHeight());
            ctx.strokeStyle = prevStrokeStyle;
        }
        this.text && this.image && ctx.fillText(this.text, this.getLeftPoint().getX(), this.getUpperPoint().getY() + this.image.getHeight() + 10);
    }

}