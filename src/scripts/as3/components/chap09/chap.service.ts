import {Injectable} from '@angular/core';
import {ObjectHitTestComponent} from './components/object-hit-test.component';
import {BoxesComponent} from './components/boxes.component';
import {PointHitTestComponent} from './components/point-hit-test.component';
import {DistanceComponent} from './components/distance.component';
import {BubblesComponent} from './components/bubbles.component';
import {bubbles2Component} from './components/bubbles2.component';
import {Chapter} from '../../../declares/interface';

export const chapter: Chapter = {
    directory: 'chap09',
    title: 'Chapter.09',
    routes: {
        'object-hit-test' : ObjectHitTestComponent,
        'boxes'           : BoxesComponent,
        'point-hit-test'  : PointHitTestComponent,
        'distance'        : DistanceComponent,
        'bubbles1'        : BubblesComponent,
        'bubbles2'        : bubbles2Component
    }
};

@Injectable()
export class ChapService {

    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
