import {Injectable} from '@angular/core';
import {SingleSegmentComponent} from './components/single-segment.component';
import {Chapter} from '../../../declares/interface';

export const chapter: Chapter = {
    directory: 'chap13',
    title: 'Chapter.13',
    routes: {
        'single-segment' : SingleSegmentComponent
    }
};

@Injectable()
export class ChapService {

    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
