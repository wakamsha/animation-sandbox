import {Injectable} from '@angular/core';
import {Rotate1Component} from './components/rotate1.component';
import {Rotate2Component} from './components/rotate2.component';
import {Rotate3Component} from './components/rotate3.component';
import {AngleBounceComponent} from './components/angle-bounce.component';

export const directory = 'chap10';

export const chaps: any = {
    'rotate1'      : Rotate1Component,
    'rotate2'      : Rotate2Component,
    'rotate3'      : Rotate3Component,
    'angle-bounce' : AngleBounceComponent
};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
