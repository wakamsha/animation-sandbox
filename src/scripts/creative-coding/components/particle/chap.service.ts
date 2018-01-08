import {Chapter} from '../../../declares/interface';
import {NodeGardenComponent} from './components/node-garden.component';
import {Injectable} from '@angular/core';
import {TvNoiseComponent} from './components/tv-noise.component';
import {NodeGardenLineComponent} from './components/node-garden-line.component';

export const chapter: Chapter = {
    directory: 'particle',
    title: 'Particle',
    routes: {
        'node-garden' : NodeGardenComponent,
        'node-garden-line': NodeGardenLineComponent,
        'TV-noise'       : TvNoiseComponent
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
