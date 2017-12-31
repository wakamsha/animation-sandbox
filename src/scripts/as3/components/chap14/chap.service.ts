import {Injectable} from '@angular/core';
import {Perspective1Component} from './components/perspective1.component';
import {Perspective2Component} from './components/perspective2.component';
import {Velocity3DComponent} from './components/velocity-3d.component';

export const directory = 'chap14';

export const chaps: any = {
    'perspective1' : Perspective1Component,
    'perspective2' : Perspective2Component,
    'velocity-3D'  : Velocity3DComponent
};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
