import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';

@Component(baseOptions)
export class DistanceComponent extends BaseComponent {

    constructor(a: Title) {
        super(a);
        this.title = 'Distance';
    }

    ngOnInit() {
        super.init();

        const sprite1 = this.createSprite('#ff0000');
        this.stage.addChild(sprite1);
        const sprite2 = this.createSprite('#00ff00');
        this.stage.addChild(sprite2);

        const dx = sprite1.x - sprite2.x;
        const dy = sprite1.y - sprite2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        console.info(dist);

        const line = new createjs.Shape();
        this.stage.addChild(line);
        line.graphics
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(sprite1.x, sprite1.y)
            .lineTo(sprite2.x, sprite2.y)
            .endStroke();

        this.stage.update();
    }

    private createSprite(color: string): createjs.Shape {
        const sprite = new createjs.Shape();
        sprite.graphics
            .beginFill(color)
            .drawRect(-4, -4, 8, 8)
            .endFill();
        sprite.x = Math.random() * this.canvas.width;
        sprite.y = Math.random() * this.canvas.height;
        return sprite;
    }
}
