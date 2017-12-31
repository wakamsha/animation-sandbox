import {Injectable} from '@angular/core';
import {GravityComponent} from './components/gravity.component';
import {GravityBounceComponent} from './components/gravity-bounce.component';
import {GravityRandomComponent} from './components/gravity-random.component';
import {OrbitComponent} from './components/orbit.component';
import {OrbitDrawComponent} from './components/orbit-draw.component';
import {NodeGardenComponent} from './components/node-garden.component';
import {NodeGardenLineComponent} from './components/node-garden-line.component';
import {NodeMassComponent} from './components/node-mass.component';

export const directory = 'chap12';

export const chaps: any = {
    'particle'         : GravityComponent,
    'gravity-bounce'   : GravityBounceComponent,
    'gravity-random'   : GravityRandomComponent,
    'orbit'            : OrbitComponent,
    'orbit-draw'       : OrbitDrawComponent,
    'node-garden'      : NodeGardenComponent,
    'node-garden-line' : NodeGardenLineComponent,
    'node-mass'        : NodeMassComponent
};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
