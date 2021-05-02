import {Point} from "./Point";
import {CanvasElement} from "./CanvasElement";
import {DrawingElement} from "../DrawingElement";
import {ColorScheme} from "../graphics/color/scheme/ColorScheme";

export abstract class AbstractCanvasElement extends DrawingElement implements CanvasElement, ColorScheme {

    protected points: Point[];
    protected color: string;
    protected borderColor: string;
    private static number = 0;
    private static globalZ = 0;
    protected z: number;
    public itsNumber: number;
    protected baseColor: string;
    protected headlineTextColor: string;
    protected primaryTextColor: string;

    protected constructor(points: Point[], color: string) {
        super();
        this.points = points;
        this.color = color;
        this.baseColor = 'black';
        this.borderColor = 'black';
        this.headlineTextColor = 'black';
        this.primaryTextColor = 'black';
        this.itsNumber = AbstractCanvasElement.number;
        AbstractCanvasElement.number++;
        this.z = AbstractCanvasElement.globalZ;
        AbstractCanvasElement.globalZ++;
    }

    public addPoint(point: Point): void {
        this.points.push(point);
    }

    public getColor(): string {
        return this.color;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
    }

    hasPoint(point: Point): boolean {
        return false;
    }

    move(offsetX: number, offsetY: number): void {
        this.points.forEach(point => {
            point.setX(point.getX() + offsetX);
            point.setY(point.getY() + offsetY);
        })
    }

    getZ(): number {
        return this.z;
    }

    getCenter(): Point {
        //todo refactor this
        return new Point(0, 0);
    }

    getBottom(): number {
        return 0;
    }

    getTop(): number {
        return 0;
    }

    getLeft(): number {
        return 0;
    }

    getRight(): number {
        return 0;
    }

    setContext(ctx: CanvasRenderingContext2D) {
        super.setContext(ctx);
        this.ctx = ctx;
    }

    public setColor(color: string) {
        this.color = color;
    }

    public setBorderColor(borderColor: string) {
        this.borderColor = borderColor;
    }

    setColorScheme(baseColor: string): void {
        this.baseColor = baseColor;
    }

    setBordersColor(borderColor: string): void {

    }

    setHeadlineTextColor(headlineTextColor: string): void {
    }

    setPrimaryTextColor(primaryTextColor: string): void {
    }
}