import {Injectable} from '@angular/core';
import {RemovalComponent} from './components/removal.component';
import {FountainComponent} from  './components/fountain.component';
import {BouncingComponent} from './components/bouncing.component';
import {Friction1Component} from './components/friction1.component';

export const directory = 'chap06';

export const chaps: any = {
    'removal'   : RemovalComponent,
    'fountain'  : FountainComponent,
    'bouncing'  : BouncingComponent,
    'friction1' : Friction1Component
};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
