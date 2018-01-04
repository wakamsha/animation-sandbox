import {Injectable} from '@angular/core';
import {RemovalComponent} from './components/removal.component';
import {FountainComponent} from  './components/fountain.component';
import {BouncingComponent} from './components/bouncing.component';
import {Friction1Component} from './components/friction1.component';
import {Chapter} from '../../../declares/interface';

export const chapter: Chapter = {
    directory: 'chap06',
    title: 'Chapter.06',
    routes: {
        'removal'   : RemovalComponent,
        'fountain'  : FountainComponent,
        'bouncing'  : BouncingComponent,
        'friction1' : Friction1Component
    }
};

@Injectable()
export class ChapService {

    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
