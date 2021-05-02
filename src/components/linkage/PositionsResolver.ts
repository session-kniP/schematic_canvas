import {CanvasElement} from "../elements/CanvasElement";
import {Position} from "./Position";
import {Point} from "../elements/Point";

export class PositionsResolver {

    public static resolvePositionForElements(el1: CanvasElement, el2: CanvasElement): Position {
        if (el1.getCenter().getX() < el2.getLeft()) { //left side
            if (el1.getBottom() < el2.getCenter().getY()) {
                return Position.LEFT_TOP;
            } else if (el1.getBottom() > el2.getCenter().getY() && el1.getTop() < el2.getCenter().getY()) {
                return Position.LEFT;
            } else {
                return Position.LEFT_BOTTOM;
            }
        } else if (el1.getCenter().getX() >= el2.getLeft() && el1.getCenter().getX() <= el2.getRight()) { //top or bottom
            if (el1.getCenter().getY() > el2.getCenter().getY()) {
                return Position.TOP;
            } else {
                return Position.BOTTOM;
            }
        } else { //right side
            if (el1.getBottom() < el2.getCenter().getY()) {
                return Position.RIGHT_TOP;
            } else if (el1.getBottom() > el2.getCenter().getY() && el1.getTop() < el2.getCenter().getY()) {
                return Position.RIGHT;
            } else {
                return Position.RIGHT_BOTTOM;
            }
        }
    }

    public static resolvePositionForElementAndPoint(element: CanvasElement, point: Point): Position {
        if (element.getRight() < point.getX()) { //left side
            if (element.getBottom() < point.getY()) {
                return Position.LEFT_TOP;
            } else if (element.getBottom() > point.getY() && element.getTop() < point.getY()) {
                return Position.LEFT;
            } else {
                return Position.LEFT_BOTTOM;
            }
        } else if (element.getRight() >= point.getX() && element.getLeft() <= point.getX()) { //top or bottom
            if (element.getCenter().getY() > point.getY()) {
                return Position.TOP;
            } else {
                return Position.BOTTOM;
            }
        } else { //right side
            if (element.getBottom() < point.getY()) {
                return Position.RIGHT_TOP;
            } else if (element.getBottom() > point.getY() && element.getTop() < point.getY()) {
                return Position.RIGHT;
            } else {
                return Position.RIGHT_BOTTOM;
            }
        }
    }

    public static resolvePositionForPoints(point1: Point, point2: Point): Position {
        if (point1.getX() < point2.getX()) { //left side
            if (point1.getY() < point2.getY()) {
                return Position.LEFT_TOP;
            } else if (point1.getY() === point2.getY()) {
                return Position.LEFT;
            } else {
                return Position.LEFT_BOTTOM;
            }
        } else if (point1.getX() === point2.getX()) { //top or bottom
            if (point1.getY() > point2.getY()) {
                return Position.TOP;
            } else {
                return Position.BOTTOM;
            }
        } else { //right side
            if (point1.getY() < point2.getY()) {
                return Position.RIGHT_TOP;
            } else if (point1.getY() === point2.getY()) {
                return Position.RIGHT;
            } else {
                return Position.RIGHT_BOTTOM;
            }
        }
    }

}