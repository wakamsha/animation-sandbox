import {Chapter} from '../../../declares/interface';
import {NodeGardenComponent} from './components/node-garden.component';
import {Injectable} from '@angular/core';

export const chapter: Chapter = {
    directory: 'particle',
    title: 'Particle',
    routes: {
        'node-garden': NodeGardenComponent
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
