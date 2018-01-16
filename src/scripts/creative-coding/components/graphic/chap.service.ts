import {Chapter} from '../../../declares/interface';
import {Injectable} from '@angular/core';
import {SineWaveComponent} from './components/sine-wave.component';

export const chapter: Chapter = {
    directory: 'graphic',
    title: 'Graphic',
    routes: {
        'sine-wave': SineWaveComponent
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
