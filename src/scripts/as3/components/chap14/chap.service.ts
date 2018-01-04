import {Injectable} from '@angular/core';
import {Perspective1Component} from './components/perspective1.component';
import {Perspective2Component} from './components/perspective2.component';
import {Velocity3DComponent} from './components/velocity-3d.component';
import {Chapter} from '../../../declares/interface';

export const chapter: Chapter = {
    directory: 'chap14',
    title: 'Chapter.14',
    routes: {
        'perspective1' : Perspective1Component,
        'perspective2' : Perspective2Component,
        'velocity-3D'  : Velocity3DComponent
    }
};

@Injectable()
export class ChapService {

    getChapter(): Promise<Chapter> {
        return Promise.resolve(chapter);
    }
}
