import {Position} from "./Position";
import {Point} from "../elements/Point";

export class PositionDrawer {

    public static drawLinkageForPosition(
        position: Position,
        point1: Point,
        point2: Point,
        ctx: CanvasRenderingContext2D,
    ): void {
        ctx.beginPath();
        ctx.moveTo(point1.getX(), point1.getY());
        switch (position) {
            case Position.LEFT_TOP:
            case Position.LEFT_BOTTOM:
            case Position.RIGHT_BOTTOM:
            case Position.RIGHT_TOP:
                ctx.lineTo(point1.getX(), point2.getY());
                ctx.lineTo(point2.getX(), point2.getY());
                break;

            case Position.LEFT:
            case Position.RIGHT:
                const x = Math.round((point1.getX() + point2.getX()) / 2);
                ctx.lineTo(x, point1.getY());
                ctx.lineTo(x, point2.getY());
                ctx.lineTo(point2.getX(), point2.getY());
                break;

            case Position.BOTTOM:
            case Position.TOP:
                const y = Math.round((point1.getY() + point2.getY()) / 2);
                ctx.lineTo(point1.getX(), y);
                ctx.lineTo(point2.getX(), y);
                ctx.lineTo(point2.getX(), point2.getY());
                break;
        }

        ctx.stroke();
    }

}