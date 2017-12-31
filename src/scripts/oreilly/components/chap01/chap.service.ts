import {Injectable} from '@angular/core';
import {HelloComponent} from './components/hello.component';

export const chaps: any = {
    'hello': HelloComponent
};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
