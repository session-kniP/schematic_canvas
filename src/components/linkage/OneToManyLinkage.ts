import {AbstractLinkage} from "./AbstractLinkage";
import {CanvasElement} from "../elements/CanvasElement";
import {Point} from "../elements/Point";
import {PositionDrawer} from "./PositionDrawer";
import {PositionsResolver} from "./PositionsResolver";
import {ManyLinkage} from "./ManyLinkage";
import {PivotLinkage} from "./PivotLinkage";
import {Colorist, StrokeStyle} from "../graphics/color/Colorist";
import {AbstractCanvasElement} from "../elements/AbstractCanvasElement";

export class OneToManyLinkage extends PivotLinkage {

    protected one: AbstractCanvasElement;
    protected manyLinkage: ManyLinkage;

    constructor(one: AbstractCanvasElement, many: AbstractCanvasElement[]) {
        super(many);
        this.one = one;
        this.manyLinkage = new ManyLinkage(many);
    }


    display() {
        if (this.ctx) {
            this.manyLinkage.display();
            const pivot = this.manyLinkage.getPivot();
            if (pivot) {
                const upperPivot = this.calcUpperPivot(pivot);
                const position = PositionsResolver.resolvePositionForElementAndPoint(this.one, upperPivot);
                const ctx = this.ctx;
                Colorist.withStrokeStyle(
                    () => PositionDrawer.drawLinkageForPosition(position, this.one.getCenter(), upperPivot, ctx),
                    new StrokeStyle(this.getGroupColor(), undefined), this.ctx);

                this.lineDrawer.draw(upperPivot, pivot);
            }

        }
    }

    private calcUpperPivot(lowerPivot: Point): Point {
        return new Point(lowerPivot.getX(), lowerPivot.getY() - 10)
    }

    setContext(ctx: CanvasRenderingContext2D) {
        super.setContext(ctx);
        this.ctx = ctx;
        this.manyLinkage.setContext(ctx);
    }
}