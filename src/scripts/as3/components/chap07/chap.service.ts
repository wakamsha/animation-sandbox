import {Injectable} from '@angular/core';
import {MouseMoveDragComponent} from './components/mouse-move-drag.component';
import {DragAndMoveComponent} from './components/drag-and-move.component';
import {ThrowingComponent} from './components/throwing.component';

export const directory = 'chap07';

export const chaps: any = {
    'mouse-move-drag' : MouseMoveDragComponent,
    'drag-and-move'   : DragAndMoveComponent,
    'throwing'        : ThrowingComponent

};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
