import {BobbingComponent} from './components/bobbing.component';
import {Injectable} from '@angular/core';
import {RotateToMouseComponent} from './components/rotate-to-mouse.component';
import {Wave1Component} from './components/wave1.component';
import {PulseComponent} from './components/pulse.component';
import {RandomComponent} from './components/random.component';
import {Wave2Component} from './components/wave2.component';
import {CircleComponent} from './components/circle.component';
import {OvalComponent} from './components/oval.component';
import {DistanceComponent} from './components/distance.component';
import {MouseDistanceComponent} from './components/mouse-distance.component';
import {PointerComponent} from './components/pointer.component';
import {Chapter} from '../../../declares/interface';

export const chapter: Chapter = {
    directory: 'chap03',
    title: 'Chapter.03',
    routes: {
        'rotateToMouse' : RotateToMouseComponent,
        'bobbing'       : BobbingComponent,
        'wave1'         : Wave1Component,
        'pulse'         : PulseComponent,
        'random'        : RandomComponent,
        'wave2'         : Wave2Component,
        'circle'        : CircleComponent,
        'oval'          : OvalComponent,
        'distance'      : DistanceComponent,
        'mouseDistance' : MouseDistanceComponent,
        'pointer'       : PointerComponent
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
