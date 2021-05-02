import {Point} from "../elements/Point";
import {AbstractLinkage} from "./AbstractLinkage";

export abstract class PivotLinkage extends AbstractLinkage {

    protected pivot: Point | undefined;

    public getPivot(): Point | undefined {
        return this.pivot;
    }

}