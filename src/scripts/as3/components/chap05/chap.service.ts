import {Injectable} from '@angular/core';
import {VelocityComponent} from './components/velocity.component';
import {VelocityAngleComponent} from './components/velocity-angle.component';
import {FollowMouseComponent} from './components/follow-mouse.component';
import {Acceleration1Component} from './components/acceleration1.component';
import {Acceleration2Component} from './components/acceleration2.component';
import {Acceleration3Component} from './components/acceleration3.component';
import {FollowMouse2Component} from './components/follow-mouse2.component';
import {ShipSimComponent} from './components/ship-sim.component';
import {Chapter} from '../../../declares/interface';

export const chapter: Chapter = {
    directory: 'chap05',
    title: 'Chapter.05',
    routes: {
        'velocity'       : VelocityComponent,
        'velocity-angle' : VelocityAngleComponent,
        'follow-mouse'   : FollowMouseComponent,
        'acceleration1'  : Acceleration1Component,
        'acceleration2'  : Acceleration2Component,
        'acceleration3'  : Acceleration3Component,
        'follow-mouse2'  : FollowMouse2Component,
        'ship-sim'       : ShipSimComponent
    }
};

@Injectable()
export class ChapService {

    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
