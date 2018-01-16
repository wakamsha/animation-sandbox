import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';
import {Position} from '../../../../declares/interface';

@Component(abstractOptions)
export class SquareComponent extends AbstractComponent {

    constructor(a: Title) {
        super(a);
        this.title = 'Square';
    }

    ngOnInit() {
        super.init(false);
        this.draw({level: 4, size: this.stageHeight, pos: {x: 0, y: 0}});
    }

    private draw({level, size, pos}: {
        level: number;
        size: number;
        pos: Position;
    }) {
        if (level <= 0) return;
        level--;
        const s = size / 3;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(s + pos.x, s + pos.y, s, s);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!(i === 1 && j === 1)) {
                    this.draw({
                        level,
                        size: s,
                        pos: {
                            x: pos.x + i * s,
                            y: pos.y + j * s
                        }
                    });
                }
            }
        }
    }
}
