import {Chapter} from '../../../declares/interface';
import {Injectable} from '@angular/core';
import {MatrixRainComponent} from './components/matrix-rain.component';

export const chapter: Chapter = {
    directory: 'typography',
    title: 'Typography',
    routes: {
        'matrix-rain': MatrixRainComponent
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
