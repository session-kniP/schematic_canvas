import React, {useEffect, useRef, useState} from 'react';
import {DrawingCanvas} from "./components/DrawingCanvas";
import {CanvasRect} from "./components/elements/CanvasRect";
import {Point} from "./components/elements/Point";
import {CanvasFrame} from "./components/elements/CanvasFrame";
import {Image} from "./components/image/Image";
import {OneToOneLinkage} from "./components/linkage/OneToOneLinkage";
import {OneToManyLinkage} from "./components/linkage/OneToManyLinkage"; import {ManyToManyLinkage} from "./components/linkage/ManyToManyLinkage";

export const LiterallyCanvasPage = () => {
    const [newImage, setNewImage] = useState<ImageBitmap>();

    const canvasRef = useRef<typeof DrawingCanvas>();

    const elements = [
        // new CanvasRect([new Point(100, 100), new Point(300, 200)], 'orange'),
        // new CanvasRect([new Point(200, 200), new Point(250, 250)], 'blue'),
        new CanvasFrame([new Point(0, 0), new Point(200, 200)],  'red', new Image(newImage, 200, 200), 'Болбшая картинка'),
        new CanvasFrame([new Point(200, 0), new Point(400, 200)],  'red', new Image(newImage, 200, 200), 'Болбшая картинка2'),
        new CanvasFrame([new Point(100, 100), new Point(250, 250)],  'blue',new Image(newImage, 150, 150), 'Картинка по менбше'),
        new CanvasFrame([new Point(200, 200), new Point(350, 350)],  'blue', new Image(newImage, 150, 150), 'Картинка по менбше 2'),
        new CanvasFrame([new Point(300, 200), new Point(450, 350)],  'blue', new Image(newImage, 150, 150), 'Картинка по менбше 3')
    ];

    const links = [
        // new OneToOneLinkage([elements[2], elements[3]])
        // new OneToManyLinkage(elements[0], [elements[1], elements[2]])
        new ManyToManyLinkage(
            [elements[0], elements[1]],
            [elements[2], elements[3], elements[4]],
            {leftGroupColor: 'red', rightGroupColor: 'blue'})
    ];


    useEffect(() => {
        const image: HTMLImageElement = document.createElement('img') as HTMLImageElement;
        image.src = 'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg';
        image.width = 200;
        image.height = 200;
        image.onload = e => {
            console.log(image);
            createImageBitmap(image).then(r => {
                if (r.width > 0 && r.height > 0) {
                    setNewImage(r);
                }
            });
        }

    }, [])

    return (<div>
        <DrawingCanvas ref={canvasRef} width={window.innerWidth} height={1500} elements={elements} links={links}/>
    </div>)
}