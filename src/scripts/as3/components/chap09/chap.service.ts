import {Injectable} from '@angular/core';
import {ObjectHitTestComponent} from './components/object-hit-test.component';
import {BoxesComponent} from './components/boxes.component';
import {PointHitTestComponent} from './components/point-hit-test.component';
import {DistanceComponent} from './components/distance.component';
import {BubblesComponent} from './components/bubbles.component';
import {bubbles2Component} from './components/bubbles2.component';

export const directory = 'chap09';

export const chaps: any = {
    'object-hit-test' : ObjectHitTestComponent,
    'boxes'           : BoxesComponent,
    'point-hit-test'  : PointHitTestComponent,
    'distance'        : DistanceComponent,
    'bubbles1'        : BubblesComponent,
    'bubbles2'        : bubbles2Component
};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
