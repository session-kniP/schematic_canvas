import {Linkage} from "./Linkage";
import {CanvasElement} from "../elements/CanvasElement";
import {LineDrawer} from "../graphics/LineDrawer";
import {DrawingElement} from "../DrawingElement";
import {AbstractCanvasElement} from "../elements/AbstractCanvasElement";

export abstract class AbstractLinkage extends DrawingElement implements Linkage {

    protected elements: AbstractCanvasElement[];
    protected lineDrawer: LineDrawer;
    protected groupColor: string;

    constructor(elements: AbstractCanvasElement[], groupColor?: string) {
        super();
        this.elements = elements;
        this.groupColor = groupColor ? groupColor : 'black';
        this.lineDrawer = new LineDrawer();
    }

    display(): void {
    }


    setContext(ctx: CanvasRenderingContext2D) {
        super.setContext(ctx);
        this.ctx = ctx;
        this.lineDrawer.setContext(ctx);
    }

    public getGroupColor(): string {
        return this.groupColor;
    }

    public setGroupColor(groupColor: string): void {
        this.groupColor = groupColor;
    }
}