import {Chapter} from '../../../declares/interface';
import {Injectable} from '@angular/core';
import {HelloComponent} from './components/hello.component';
import {LineComponent} from './components/line.component';

export const chapter: Chapter = {
    directory: 'tutorial',
    title: 'Tutorial',
    routes: {
        'hello' : HelloComponent,
        'line' : LineComponent
    }
};

@Injectable()
export class ChapService {
    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
