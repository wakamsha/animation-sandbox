import {Injectable} from '@angular/core';
import {DrawingAppComponent} from './components/drawing-app.component';
import {DrawingCurveComponent} from './components/drawing-curve.component';
import {MultiCurveComponent} from './components/multi-curve.component';
import {FilterComponent} from './components/filter.component';
import {Chapter} from '../../../declares/interface';

export const chapter: Chapter = {
    directory: 'chap04',
    title: 'Chapter.04',
    routes: {
        'drawing-app'   : DrawingAppComponent,
        'drawing-curve' : DrawingCurveComponent,
        'multi-curve'   : MultiCurveComponent,
        'filter'        : FilterComponent
    }
};

@Injectable()
export class ChapService {

    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
