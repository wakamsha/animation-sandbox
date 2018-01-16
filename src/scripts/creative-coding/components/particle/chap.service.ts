import {Chapter} from '../../../declares/interface';
import {NodeGardenComponent} from './components/node-garden.component';
import {Injectable} from '@angular/core';
import {TvNoiseComponent} from './components/tv-noise.component';
import {BlindingLightComponent} from './components/blinding-light.component';

export const chapter: Chapter = {
    directory: 'particle',
    title: 'Particle',
    routes: {
        'node-garden' : NodeGardenComponent,
        'TV-noise'       : TvNoiseComponent,
        'blinding-light': BlindingLightComponent
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
