import {Injectable} from '@angular/core';
import {MouseMoveDragComponent} from './components/mouse-move-drag.component';
import {DragAndMoveComponent} from './components/drag-and-move.component';
import {ThrowingComponent} from './components/throwing.component';
import {Chapter} from '../../../declares/interface';

export const chapter: Chapter = {
    directory: 'chap07',
    title: 'Chapter.07',
    routes: {
        'mouse-move-drag' : MouseMoveDragComponent,
        'drag-and-move'   : DragAndMoveComponent,
        'throwing'        : ThrowingComponent
    }
};

@Injectable()
export class ChapService {

    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
