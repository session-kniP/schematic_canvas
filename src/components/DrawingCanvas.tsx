import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {AbstractCanvasElement} from './elements/AbstractCanvasElement';
import {Point} from "./elements/Point";
import {CanvasElement} from "./elements/CanvasElement";
import {Linkage} from "./linkage/Linkage";
import {DrawingElement} from "./DrawingElement";
import {AbstractLinkage} from "./linkage/AbstractLinkage";

export interface DrawingCanvasProps {
    width: number,
    height: number,
    elements: AbstractCanvasElement[],
    links: AbstractLinkage[]
}

export const DrawingCanvas = forwardRef((props: DrawingCanvasProps) => {

    const drawingElements: DrawingElement[] = [];
    const {elements, links, width, height} = props;

    drawingElements.push(...elements);
    drawingElements.push(...links);

    const ref = useRef(document.createElement('canvas'));

    const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

    let mousePressed = false;
    let draggingId = -1;

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        mousePressed = true;
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        mousePressed = false;
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (mousePressed) {
            if (draggingId !== -1) {
                const draggingElement = elements.filter(element => element.itsNumber === draggingId)[0];
                if (draggingElement) {
                    moveAndRender(draggingElement, e);
                }
            } else {
                const movable = elements.filter(element => element.hasPoint(new Point(e.pageX - ref.current.offsetLeft, e.pageY - ref.current.offsetTop)));
                if (movable) {
                    const topElement = movable.sort((prev, next) => next.getZ() - prev.getZ())[0];
                    if (topElement) {
                        draggingId = topElement.itsNumber;
                        moveAndRender(topElement, e);
                    }
                }
            }
        } else {
            draggingId = -1;
        }
    }

    const moveAndRender = (element: CanvasElement, e: React.MouseEvent<HTMLCanvasElement>) => {
        element.move(e.nativeEvent.movementX, e.nativeEvent.movementY);
        render();
    }

    const render = () => {
        if (ctx) {
            renderCtx(ctx);
        }
    }

    const renderCtx = (ctx: CanvasRenderingContext2D) => {
        clear();
        links.forEach(link => link.display());
        elements.forEach(el => el.draw(ctx));
        ctx.strokeRect(0, 0, width, height);
    }

    const clear = () => {
        if (ctx) {
            clearCtx(ctx);
        }
    }

    const clearCtx = (ctx: CanvasRenderingContext2D) => {
        const fillStyle = ctx.fillStyle;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = fillStyle;
    }

    const initElementsDrawable = (ctx: CanvasRenderingContext2D) => {
        drawingElements.forEach(de => de.setContext(ctx));
    }

    if(ctx) {
        initElementsDrawable(ctx);
    }

    useEffect(() => {
            const ctx: CanvasRenderingContext2D = ref.current.getContext('2d') || new CanvasRenderingContext2D();
            setCtx(ctx);
            ctx.fillStyle = 'orange';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;

            initElementsDrawable(ctx);
            renderCtx(ctx);
            // ctx.strokeRect(0, 0, width, height);
            // elements.forEach(el => el.draw(ctx));
        },
        []);


    return (<div>
        <canvas
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseMove={e => handleMouseMove(e)}
            width={width}
            height={height}
            ref={ref}/>
    </div>)

});

