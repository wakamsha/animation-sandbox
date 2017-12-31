import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from '../chap11/chap.routing';
import {chaps, ChapService} from './chap.service';

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
