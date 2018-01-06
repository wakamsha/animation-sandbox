import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {SimpleSlider} from '../../../domains/entities/SimpleSlider';
import {Segment} from '../../../domains/entities/Segment';

@Component(abstractOptions)
export class SingleSegmentComponent extends AbstractComponent {

    private slider: SimpleSlider;
    private segment: Segment;

    constructor(a: Title) {
        super(a);
        this.title = 'Single segment';
    }

    ngOnInit() {
        super.init();

        this.segment = new Segment(100, 20, '#dddddd');
        this.segment.x = 100;
        this.segment.y = 100;
        this.stage.addChild(this.segment);

        this.slider = new SimpleSlider(-90, 90, 0);
        this.stage.addChild(this.slider);
        this.slider.x = 300;
        this.slider.y = 20;
        this.slider.addEventListener('change', () => this.onChange());

        this.stage.update();
    }

    onEnterFrame() {
    }

    private onChange() {
        this.segment.rotation = this.slider.value;
        this.stage.update();
    }
}
