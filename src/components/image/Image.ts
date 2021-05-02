export class Image {
    private readonly image: ImageBitmap | undefined;
    private readonly width: number;
    private readonly height: number;


    constructor(image: ImageBitmap | undefined, width: number, height: number) {
        this.image = image;
        this.width = width;
        this.height = height;
    }

    public getImage(): ImageBitmap | undefined {
        return this.image;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

}