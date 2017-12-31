import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './components/index.component';
import {routing} from './oreilly.routing';
import {ChapModule as Chap01Module} from './components/chap01/chap.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        Chap01Module,
        routing
    ],
    declarations: [
        IndexComponent
    ]
})
export class OreillyModule {}
