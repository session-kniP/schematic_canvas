import {AbstractLinkage} from "./AbstractLinkage";
import {CanvasElement} from "../elements/CanvasElement";
import {ManyLinkage} from "./ManyLinkage";
import {PositionDrawer} from "./PositionDrawer";
import {PositionsResolver} from "./PositionsResolver";
import {Colorist, StrokeStyle} from "../graphics/color/Colorist";
import {AbstractCanvasElement} from "../elements/AbstractCanvasElement";

export interface LinkageColors {
    leftGroupColor?: string;
    rightGroupColor?: string;
}

export class ManyToManyLinkage extends AbstractLinkage {

    private leftManyLinkage: ManyLinkage;
    private rightManyLinkage: ManyLinkage;

    constructor(manyLeft: AbstractCanvasElement[], manyRight: AbstractCanvasElement[], colors?: LinkageColors) {
        super([...manyLeft, ...manyRight]);
        this.leftManyLinkage = new ManyLinkage(manyLeft, colors ? colors.leftGroupColor : undefined);
        this.rightManyLinkage = new ManyLinkage(manyRight, colors ? colors.rightGroupColor : undefined);
    }

    display() {
        if (this.ctx) {
            const leftPivot = this.leftManyLinkage.getPivot();
            const rightPivot = this.rightManyLinkage.getPivot();

            if (leftPivot && rightPivot) {
                const position = PositionsResolver.resolvePositionForPoints(leftPivot, rightPivot);
                PositionDrawer.drawLinkageForPosition(position, leftPivot, rightPivot, this.ctx);

                this.leftManyLinkage.display();
                this.rightManyLinkage.display();
                const ctx = this.ctx;

                const grad= ctx.createLinearGradient(
                    this.leftManyLinkage.getPivot().getX(),
                    this.leftManyLinkage.getPivot().getY(),
                    this.rightManyLinkage.getPivot().getX(),
                    this.rightManyLinkage.getPivot().getY());
                grad.addColorStop(0, this.leftManyLinkage.getGroupColor());
                grad.addColorStop(1, this.rightManyLinkage.getGroupColor());

                Colorist.withStrokeStyle(
                    () => PositionDrawer.drawLinkageForPosition(position, leftPivot, rightPivot, ctx),
                    new StrokeStyle(grad, undefined),
                    ctx);
            }
        }
    }

    setContext(ctx: CanvasRenderingContext2D) {
        super.setContext(ctx);
        this.leftManyLinkage.setContext(ctx);
        this.rightManyLinkage.setContext(ctx);
    }
}