import {Component} from '@angular/core';
import {BaseComponent, baseOptions} from '../../../../base.component';
import {Title} from '@angular/platform-browser';

@Component(baseOptions)
export class HelloComponent extends BaseComponent {

    constructor(a: Title) {
        super(a);
        this.title = 'Hello';
    }

    ngOnInit() {
        super.init();
        console.log(111);
    }

    onEnterFrame() {
    }
}
