import {Injectable} from '@angular/core';
import {GravityComponent} from './components/gravity.component';
import {GravityBounceComponent} from './components/gravity-bounce.component';
import {GravityRandomComponent} from './components/gravity-random.component';
import {OrbitComponent} from './components/orbit.component';
import {OrbitDrawComponent} from './components/orbit-draw.component';
import {NodeGardenComponent} from './components/node-garden.component';
import {NodeGardenLineComponent} from './components/node-garden-line.component';
import {NodeMassComponent} from './components/node-mass.component';
import {Chapter} from '../../../declares/interface';

export const chapter: Chapter = {
    directory: 'chap12',
    title: 'Chapter.12',
    routes: {
        'particle'         : GravityComponent,
        'gravity-bounce'   : GravityBounceComponent,
        'gravity-random'   : GravityRandomComponent,
        'orbit'            : OrbitComponent,
        'orbit-draw'       : OrbitDrawComponent,
        'node-garden'      : NodeGardenComponent,
        'node-garden-line' : NodeGardenLineComponent,
        'node-mass'        : NodeMassComponent
    }
};

@Injectable()
export class ChapService {

    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
