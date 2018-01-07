import {Chapter} from '../../../declares/interface';
import {Injectable} from '@angular/core';
import {CircleComponent} from './components/circle.component';
import {TriangleComponent} from './components/triangle.component';

export const chapter: Chapter = {
    directory: 'tutorial',
    title: 'Tutorial',
    routes: {
        'circle': CircleComponent,
        'triangle': TriangleComponent
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
