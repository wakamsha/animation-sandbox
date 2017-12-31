import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';

@Component(baseOptions)
export class DrawingAppComponent extends BaseComponent {

    private line: createjs.Shape;

    constructor(a: Title) {
        super(a);
        this.title = 'Drawing App';
    }

    ngOnInit() {
        super.init();

        this.line = new createjs.Shape();
        this.line.graphics
            .beginStroke('white')
            .setStrokeStyle(1);
        this.stage.addChild(this.line);

        this.stage.addEventListener('stagemousedown', () => this.onMouseDown());
        this.stage.addEventListener('stagemouseup', () => this.onMouseUp());
    }

    private onMouseDown() {
        this.line.graphics.moveTo(this.stage.mouseX, this.stage.mouseY);
        this.stage.addEventListener('stagemousemove', () => this.onMouseMove());
    }

    private onMouseUp() {
        this.stage.removeAllEventListeners('stagemousemove');
        this.stage.update();
    }

    private onMouseMove() {
        this.line.graphics.lineTo(this.stage.mouseX, this.stage.mouseY);
        this.stage.update();
    }
}
