import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';

@Component(baseOptions)
export class FilterComponent extends BaseComponent {

    constructor(a: Title) {
        super(a);
        this.title = 'Filter';
    }

    ngOnInit() {
        super.init();

        const sprite = new createjs.Shape();
        sprite.graphics
            .beginStroke('white')
            .setStrokeStyle(2)
            .beginFill('#ffff00')
            .drawRect(-50, -50, 100, 100)
            .endFill();
        this.stage.addChild(sprite);
        sprite.x = this.centerX;
        sprite.y = this.centerY;

        const blur = new createjs.BlurFilter(5, 5, 3);
        const filters = [blur];
        sprite.filters = filters;
        sprite.cache(-50, -50, 100, 100);

        this.stage.update();
    }
}
