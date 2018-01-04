import {Injectable} from '@angular/core';
import {Billiard1Component} from './components/billiard1.component';
import {Billiard3Component} from './components/billiard3.component';
import {MultiBilliardComponent} from './components/multi-billiard.component';
import {Chapter} from '../../../declares/interface';

export const chapter: Chapter = {
    directory: 'chap11',
    title: 'Chapter.11',
    routes: {
        'billiard1'      : Billiard1Component,
        'billiard3'      : Billiard3Component,
        'multi-billiard' : MultiBilliardComponent
    }
};

@Injectable()
export class ChapService {

    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
