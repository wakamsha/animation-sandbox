import {Injectable} from '@angular/core';
import {EasingComponent} from './components/easing.component';
import {EasingOffComponent} from './components/easing-off.component';
import {EasingToMouseComponent} from './components/easing-to-mouse.component';
import {SpringComponent} from './components/spring.component';
import {YoYOComponent} from './components/yo-yo.component';
import {ChainComponent} from './components/chain.component';
import {MultiSpringComponent} from './components/multi-spring.component';
import {OffsetSpringComponent} from './components/offset-spring.component';
import {DoubleSpringComponent} from './components/double-spring.component';

export const directory = 'chap08';

export const chaps: any = {
    'easing'          : EasingComponent,
    'easing-off'      : EasingOffComponent,
    'easing-to-mouse' : EasingToMouseComponent,
    'spring'          : SpringComponent,
    'yo-yo'           : YoYOComponent,
    'chain'           : ChainComponent,
    'multi-spring'    : MultiSpringComponent,
    'offset-spring'   : OffsetSpringComponent,
    'double-spring'   : DoubleSpringComponent
};

@Injectable()
export class ChapService {

    getchaps(): Promise<any> {
        return Promise.resolve(chaps);
    }
}
