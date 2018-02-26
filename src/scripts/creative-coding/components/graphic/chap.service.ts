import {Chapter} from '../../../declares/interface';
import {Injectable} from '@angular/core';
import {SineWaveComponent} from './components/sine-wave.component';
import {GlitchLogoComponent} from './components/glitch-logo.component';

export const chapter: Chapter = {
    directory: 'graphic',
    title: 'Graphic',
    routes: {
        'sine-wave': SineWaveComponent,
        'glitch-logo': GlitchLogoComponent,
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
