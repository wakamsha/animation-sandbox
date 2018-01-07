import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

type Point = {
    x: number;
    y: number;
}

@Component(abstractOptions)
export class TriangleComponent extends AbstractComponent {

    constructor(a: Title) {
        super(a);
        this.title = 'Triangle';
    }

    ngOnInit() {
        super.init(false);

        const size = 600;
        const height = Math.sin(60 * Math.PI / 180) * size;
        this.ctx.strokeStyle = 'white';
        const p1 = {
            x: this.centerX - size / 2,
            y: this.centerY + height / 3
        };
        const p2 = {
            x: this.centerX,
            y: this.centerY - height / 3 * 2
        };
        const p3 = {
            x: this.centerX + size / 2,
            y: this.centerY + height / 3
        };
        this.drawTriangle(5, p1, p2, p3);
    }

    private drawTriangle(level: number, p1: Point, p2: Point, p3: Point) {
        if (level <= 0) {
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.lineTo(p3.x, p3.y);
            this.ctx.lineTo(p1.x, p1.y);
            this.ctx.stroke();
        } else {
            const nextP1 = {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2
            };
            const nextP2 = {
                x: (p2.x + p3.x) / 2,
                y: (p2.y + p3.y) / 2
            };
            const nextP3 = {
                x: (p3.x + p1.x) / 2,
                y: (p3.y + p1.y) / 2
            };
            level = level - 1;
            this.drawTriangle(level, p1, nextP1, nextP3);
            this.drawTriangle(level, p2, nextP1, nextP2);
            this.drawTriangle(level, p3, nextP2, nextP3);
        }
    }
}
