import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {abstractOptions, AbstractComponent} from '../../abstract.component';

@Component(abstractOptions)
export class MouseDistanceComponent extends AbstractComponent {

    private sprite1: createjs.Shape;
    private textField: createjs.Text;
    private line: createjs.Shape;

    constructor(a: Title) {
        super(a);
        this.title = 'Mouse Distance';
    }

    ngOnInit() {
        super.init();

        this.sprite1 = new createjs.Shape();
        this.sprite1.graphics
            .beginFill('#ff0000')
            .drawRect(-2, -2, 4, 4)
            .endFill();
        this.sprite1.x = this.centerX;
        this.sprite1.y = this.centerY;
        this.stage.addChild(this.sprite1);

        this.line = new createjs.Shape();
        this.stage.addChild(this.line);

        this.textField = new createjs.Text();
        this.textField.color = 'white';
        this.textField.x = this.textField.y = 10;
        this.textField.font = 'normal 18px Arial';
        this.stage.addChild(this.textField);
    }

    onEnterFrame() {
        const mouseX = this.stage.mouseX;
        const mouseY = this.stage.mouseY;
        this.line.graphics
            .clear()
            .beginStroke('white')
            .moveTo(this.sprite1.x, this.sprite1.y)
            .lineTo(mouseX, mouseY);
        const dx = this.sprite1.x - mouseX;
        const dy = this.sprite1.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        this.textField.text = dist.toString();

        this.stage.update();
    }
}
