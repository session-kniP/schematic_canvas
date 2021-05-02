import {Point} from "./Point";

export interface CanvasElement {

    draw(ctx: CanvasRenderingContext2D): void;

    hasPoint(point: Point): boolean;

    move(offsetX: number, offsetY: number): void;

    getCenter(): Point;

    getBottom(): number;

    getTop(): number;

    getLeft(): number;

    getRight(): number;
}