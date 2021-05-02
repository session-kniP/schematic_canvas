export class Point {

    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }


    public getX(): number {
        return this.x;
    }

    setX(value: number) {
        this.x = value;
    }

    getY(): number {
        return this.y;
    }

    setY(value: number) {
        this.y = value;
    }
}