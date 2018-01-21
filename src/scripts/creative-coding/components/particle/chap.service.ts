import {Chapter} from '../../../declares/interface';
import {NodeGardenComponent} from './components/node-garden.component';
import {Injectable} from '@angular/core';
import {TvNoiseComponent} from './components/tv-noise.component';
import {BlindingLightComponent} from './components/blinding-light.component';
import {NodeGardenLineComponent} from './components/node-garden-line.component';
import {BlightComponent} from './components/blight.component';
import {BlightParticleComponent} from './components/blight-particle.component';
import {TailComponent} from './components/tail.component';

export const chapter: Chapter = {
    directory: 'particle',
    title: 'Particle',
    routes: {
        'node-garden'      : NodeGardenComponent,
        'node-garden-line' : NodeGardenLineComponent,
        'TV-noise'         : TvNoiseComponent,
        'blight'           : BlightComponent,
        'blight-particle'  : BlightParticleComponent,
        'blinding-light'   : BlindingLightComponent,
        'tail'             : TailComponent
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
