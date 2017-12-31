import {Injectable} from '@angular/core';
import {SingleSegmentComponent} from './components/single-segment.component';

export const directory = 'chap13';

export const chaps: any = {
    'single-segment' : SingleSegmentComponent
};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
