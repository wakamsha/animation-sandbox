import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';
import {Tail} from '../domains/entities/Tail';
import {Position} from '../../../../declares/interface';

@Component(abstractOptions)
export class TailComponent extends AbstractComponent {

    private NUM_OF_TAIL = 30;
    private tails: Tail[] = [];
    private mouse: Position;

    constructor(a: Title) {
        super(a);
        this.title = 'Tails';
    }

    ngOnInit() {
        super.init();
        this.mouse = { x: 0, y: 0 };
        this.stage.addEventListener('mousemove', (e) => this.mouse = this.getMousePosition(e));
        for (let i = 0; i < this.NUM_OF_TAIL; i++) {
            this.tails[i] = new Tail(20);
        }
    }

    ngOnDestroy() {
        super.destroy();
        this.stage.removeEventListener('mousemove', this.stage.onmousemove);
    }

    protected onEnterFrame() {
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.fillStyle = 'rgba(0, 0, 0, .05)';
        this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
        this.ctx.globalCompositeOperation = 'lighter';

        this.tails.forEach((tail, i) => {
            const lp = tail.position;

            tail.angle += tail.speed;

            tail.shift.x += (this.mouse.x - tail.shift.x) * tail.speed;
            tail.shift.y += (this.mouse.y - tail.shift.y) * tail.speed;

            tail.position.x = tail.shift.x + Math.cos(i + tail.angle) * tail.orbit;
            tail.position.y = tail.shift.y + Math.sin(i + tail.angle) * tail.orbit;

            tail.position.x = Math.max(Math.min(tail.position.x, this.stageWidth), 0);
            tail.position.y = Math.max(Math.min(tail.position.y, this.stageHeight), 0);

            tail.size += (tail.targetSize - tail.size) * .05;

            if (Math.round(tail.targetSize) === Math.round(tail.size)) {
                tail.targetSize = 1 + Math.random() * 7;
            }

            this.ctx.beginPath();
            this.ctx.fillStyle = tail.color;
            this.ctx.strokeStyle = tail.color;
            this.ctx.lineWidth = tail.size;
            this.ctx.moveTo(lp.x, lp.y);
            this.ctx.lineTo(tail.position.x, tail.position.y);
            this.ctx.stroke();
            this.ctx.arc(tail.position.x, tail.position.y, tail.size / 2, 0, Math.PI * 2, false);
            this.ctx.fill();
        });
    }

}
