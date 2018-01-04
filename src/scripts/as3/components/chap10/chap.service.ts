import {Injectable} from '@angular/core';
import {Rotate1Component} from './components/rotate1.component';
import {Rotate2Component} from './components/rotate2.component';
import {Rotate3Component} from './components/rotate3.component';
import {AngleBounceComponent} from './components/angle-bounce.component';
import {Chapter} from '../../../declares/interface';

export const chapter: Chapter = {
    directory: 'chap10',
    title: 'Chapter.10',
    routes: {
        'rotate1'      : Rotate1Component,
        'rotate2'      : Rotate2Component,
        'rotate3'      : Rotate3Component,
        'angle-bounce' : AngleBounceComponent
    }
};

@Injectable()
export class ChapService {

    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
