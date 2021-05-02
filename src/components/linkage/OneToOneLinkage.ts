import {AbstractLinkage} from "./AbstractLinkage";
import {PositionsResolver} from "./PositionsResolver";
import {PositionDrawer} from "./PositionDrawer";

export class OneToOneLinkage extends AbstractLinkage {

    display() {
        if (this.ctx) {
            const sortedElements =
                Array.from(this.elements)
                    .sort((prev, next) => {
                        return prev.getCenter().getX() - next.getCenter().getX();
                    });

            const firstElement = sortedElements[0];
            const secondElement = sortedElements[1];

            const position = PositionsResolver.resolvePositionForElements(firstElement, secondElement);
            PositionDrawer.drawLinkageForPosition(position, firstElement.getCenter(), secondElement.getCenter(), this.ctx);
        }
    }
}