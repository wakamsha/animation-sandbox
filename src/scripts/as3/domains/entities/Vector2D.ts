// import {visitValue} from '@angular/compiler/src/util';

export class Vector2D {
    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
    }

    constructor(private _x: number,
                private _y: number) {}

    public draw(graphics: createjs.Graphics, color: string = '#000000') {
        graphics.setStrokeStyle(1)
            .beginStroke(color)
            .moveTo(0, 0)
            .lineTo(this._x, this._y);
    }

    public clone(): Vector2D {
        return new Vector2D(this._x, this._y);
    }

    public zero(): Vector2D {
        this._x = 0;
        this._y = 0;
        return this;
    }

    public isZero(): boolean {
        return this._x === 0 && this._y === 0;
    }

    public set length(value: number) {
        const a = this.angle;
        this._x = Math.cos(a) * value;
        this._y = Math.sin(a) * value;
    }

    public get length(): number {
        return Math.sqrt(this.lengthSQ);
    }

    public get lengthSQ(): number {
        return this._x * this._x + this._y * this._y;
    }

    public set angle(value: number) {
        const len = this.length;
        this._x = Math.cos(value) * len;
        this._y = Math.sin(value) * len;
    }

    public get angle(): number {
        return Math.atan2(this._y, this._x);
    }

    public normalize(): Vector2D {
        if (!this.length) {
            this._x = 1;
            return this;
        }
        this._x /= this.length;
        this._y /= this.length;
        return this;
    }

    public truncate(max: number): Vector2D {
        this.length = Math.min(max, this.length);
        return this;
    }

    public reverse(): Vector2D {
        this._x *= -1;
        this._y *= -1;
        return this;
    }

    public isNormalized(): boolean {
        return this.length === 1;
    }

    public dotProd(v2: Vector2D): number {
        return this._x * v2._x + this._y * v2._y;
    }

    public static angleBetween(v1: Vector2D, v2: Vector2D): number {
        if (!v1.isNormalized()) v1 = v1.clone().normalize();
        if (!v2.isNormalized()) v2 = v2.clone().normalize();
        return Math.acos(v1.dotProd(v2));
    }

    public sign(v2: Vector2D): number {
        return this.prep.dotProd(v2) < 0 ? -1 : 1;
    }

    public get prep(): Vector2D {
        return new Vector2D(-this._y, this._x);
    }

    public dist(v2: Vector2D): number {
        return Math.sqrt(this.distSQ(v2));
    }

    public distSQ(v2: Vector2D): number {
        const dx = v2._x - this._x;
        const dy = v2._y - this._y;
        return dx * dx + dy * dy;
    }

    public add(v2: Vector2D): Vector2D {
        return new Vector2D(this._x + v2._x, this._y + v2._y);
    }

    public subtract(v2: Vector2D): Vector2D {
        return new Vector2D(this._x - v2._x, this._y - v2._y);
    }

    public multiply(value: number): Vector2D {
        return new Vector2D(this._x * value, this._y * value);
    }

    public divide(value: number): Vector2D {
        return new Vector2D(this._x / value, this._y / value);
    }

    public equals(v2: Vector2D): boolean {
        return this._x === v2._x && this._y === v2._y;
    }

    public toString(): string {
        return `[Vector2D (x: ${this._x}, y: ${this._y})]`;
    }
}
