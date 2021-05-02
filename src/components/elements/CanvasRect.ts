import {AbstractCanvasElement} from "./AbstractCanvasElement";
import {Point} from "./Point";

export class CanvasRect extends AbstractCanvasElement {

    constructor(points: Point[], color: string) {
        super(points, color);
    }


    public addPoint(point: Point) {
        super.addPoint(point);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        ctx.fillRect(this.getLeftPoint().getX(), this.getUpperPoint().getY(), this.getWidth(), this.getHeight());
    }

    public hasPoint(point: Point): boolean {
        return this.getLeftPoint().getX() <= point.getX() &&
            this.getRightPoint().getX() >= point.getX() &&
            this.getUpperPoint().getY() <= point.getY() &&
            this.getLowerPoint().getY() >= point.getY();
    }

    protected getWidth(): number {
        return this.getRightPoint().getX() - this.getLeftPoint().getX();
    }

    protected getHeight(): number {
        return this.getLowerPoint().getY() - this.getUpperPoint().getY();
    }

    protected getLeftPoint(): Point {
        return this.points[0].getX() < this.points[1].getX() ? this.points[0] : this.points[1];
    }

    protected getRightPoint(): Point {
        return this.points[0].getX() > this.points[1].getX() ? this.points[0] : this.points[1];
    }

    protected getUpperPoint(): Point {
        return this.points[0].getY() < this.points[1].getY() ? this.points[0] : this.points[1];
    }

    protected getLowerPoint(): Point {
        return this.points[0].getY() > this.points[1].getY() ? this.points[0] : this.points[1];
    }

    getCenter(): Point {
        const leftPoint = this.getLeftPoint();
        const upperPoint = this.getUpperPoint();
        let secondPoint
        if (leftPoint === upperPoint) {
            secondPoint = this.getLowerPoint();
        } else {
            secondPoint = this.getUpperPoint();
        }

        const x = (leftPoint.getX() + secondPoint.getX()) / 2;
        const y = (leftPoint.getY() + secondPoint.getY()) / 2;

        return new Point(x, y);
    }

    getBottom(): number {
        return this.getLowerPoint().getY();
    }

    getTop(): number {
        return this.getUpperPoint().getY();
    }

    getLeft(): number {
        return this.getLeftPoint().getX();
    }

    getRight(): number {
        return this.getRightPoint().getX();
    }

}