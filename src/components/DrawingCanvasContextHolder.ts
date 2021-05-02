import {v4 as uuidv4} from 'uuid';

export abstract class DrawingCanvasContextHolder {

    private static contextMap: Map<string, CanvasRenderingContext2D>;

    public static saveContext(context: CanvasRenderingContext2D): string {
        const ctx = Array.from(this.contextMap.entries()).find((key) => key[1] === context);
        if (ctx) {
            return ctx[0];
        }

        const uuid = uuidv4();
        this.contextMap.set(uuid, context);
        return uuid;
    }

    public static getContext(uuid: string): CanvasRenderingContext2D | undefined {
        return this.contextMap.get(uuid);
    }

    public static removeContext(uuid: string): boolean {
        return this.contextMap.delete(uuid);
    }

}