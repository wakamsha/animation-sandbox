import {Chapter} from '../../../declares/interface';
import {Injectable} from '@angular/core';
import {CircleComponent} from './components/circle.component';
import {TriangleComponent} from './components/triangle.component';
import {SquareComponent} from './components/square.component';

export const chapter: Chapter = {
    directory: 'fractal',
    title: 'Fractal',
    routes: {
        'circle': CircleComponent,
        'triangle': TriangleComponent,
        'square': SquareComponent
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
