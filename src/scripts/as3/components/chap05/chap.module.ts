import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './chap.routing';
import {ChapService, chaps} from './chap.service';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: Object.keys(chaps).map(name => chaps[name]),
    providers: [
        ChapService
    ]
})
export class ChapModule {}
