import {Injectable} from '@angular/core';
import {BitmapCompareComponent} from './components/bitmap-compare.component';
import {BitmapCollision1} from './components/bitmap-collision1';

export const chaps: any = {
    'bitmap-compare': BitmapCompareComponent,
    'bitmap-collision': BitmapCollision1,
};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
