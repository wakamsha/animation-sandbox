import {Chapter} from '../../../declares/interface';
import {Injectable} from '@angular/core';
import {HelloComponent} from './components/hello.component';
import {LineComponent} from './components/line.component';
import {ArcComponent} from './components/arc.component';
import {QuadraticCurveComponent} from './components/quadratic-curve.component';
import {BezierCurveComponent} from './components/bezier-curve.component';

export const chapter: Chapter = {
    directory: 'tutorial',
    title: 'Tutorial',
    routes: {
        'hello' : HelloComponent,
        'line' : LineComponent,
        'arc': ArcComponent,
        'quadratic-curve': QuadraticCurveComponent,
        'bezier-curve': BezierCurveComponent
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
