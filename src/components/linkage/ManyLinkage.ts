import {CanvasElement} from "../elements/CanvasElement";
import {Point} from "../elements/Point";
import {PositionsResolver} from "./PositionsResolver";
import {PositionDrawer} from "./PositionDrawer";
import {PivotLinkage} from "./PivotLinkage";
import {Colorist, StrokeStyle} from "../graphics/color/Colorist";
import {AbstractCanvasElement} from "../elements/AbstractCanvasElement";

export class ManyLinkage extends PivotLinkage {

    constructor(elements: AbstractCanvasElement[], groupColor?: string) {
        super(elements, groupColor);
        if (groupColor) {
            elements.forEach(e => e.setBorderColor(groupColor));
        }
    }

    display() {
        const sortedMany = this.resolveSortedMany();

        const pivot = this.resolvePivot();
        this.pivot = pivot;

        sortedMany.forEach(sm => {
            if (this.ctx) {
                const ctx = this.ctx;
                const position = PositionsResolver.resolvePositionForElementAndPoint(sm, pivot);
                Colorist.withStrokeStyle(
                    () => PositionDrawer.drawLinkageForPosition(position, sm.getCenter(), pivot, ctx),
                    new StrokeStyle(this.getGroupColor(), undefined), ctx
                );
            }
        });
    }

    private calcPivot(upperElement: CanvasElement, sortedMany: CanvasElement[]): Point {
        const x = (sortedMany[0].getCenter().getX() + sortedMany[sortedMany.length - 1].getCenter().getX()) / 2;
        const y = upperElement.getBottom() < upperElement.getTop() ?
            (upperElement.getCenter().getY() + upperElement.getCenter().getY()) / 2 :
            upperElement.getTop() - 15;

        return new Point(x, y);
    }

    setContext(ctx: CanvasRenderingContext2D) {
        super.setContext(ctx);
    }


    getPivot(): Point {
        if (!this.pivot) {
            this.pivot = this.resolvePivot();
        }
        return this.pivot;
    }

    private resolvePivot(): Point {
        const sortedMany = this.resolveSortedMany();

        const upperFromMany: CanvasElement = Array.from(sortedMany).sort((prev, next) => prev.getCenter().getY() - next.getCenter().getY())[0];

        return this.calcPivot(upperFromMany, sortedMany);
    }

    private resolveSortedMany(): CanvasElement[] {
        return Array.from(this.elements).sort((prev, next) => {
            return prev.getCenter().getX() - next.getCenter().getX();
        });
    }
}