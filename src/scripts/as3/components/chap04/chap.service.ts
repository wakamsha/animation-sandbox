import {Injectable} from '@angular/core';
import {DrawingAppComponent} from './components/drawing-app.component';
import {DrawingCurveComponent} from './components/drawing-curve.component';
import {MultiCurveComponent} from './components/multi-curve.component';
import {FilterComponent} from './components/filter.component';

export const directory = 'chap04';

export const chaps: any = {
    'drawing-app'   : DrawingAppComponent,
    'drawing-curve' : DrawingCurveComponent,
    'multi-curve'   : MultiCurveComponent,
    'filter'        : FilterComponent
};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
