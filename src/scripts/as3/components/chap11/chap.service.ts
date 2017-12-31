import {Injectable} from '@angular/core';
import {Billiard1Component} from './components/billiard1.component';
import {Billiard3Component} from './components/billiard3.component';
import {MultiBilliardComponent} from './components/multi-billiard.component';

export const directory = 'chap11';

export const chaps: any = {
    'billiard1'      : Billiard1Component,
    'billiard3'      : Billiard3Component,
    'multi-billiard' : MultiBilliardComponent
};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
