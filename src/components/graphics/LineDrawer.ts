import {Point} from "../elements/Point";
import {DrawingElement} from "../DrawingElement";

export class LineDrawer extends DrawingElement {


    public draw(p1: Point, p2: Point) {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.moveTo(p1.getX(), p1.getY());
            this.ctx.lineTo(p2.getX(), p2.getY());
            this.ctx.stroke();
        }
    }
}