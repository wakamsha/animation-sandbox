import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {chapRouting} from './chap.routing';
import {ChapService, chapter} from './chap.service';

@NgModule({
    imports: [
        CommonModule,
        chapRouting
    ],
    declarations: Object.keys(chapter.routes).map(name => chapter.routes[name]),
    providers: [
        ChapService
    ]
})
export class ChapModule {}
