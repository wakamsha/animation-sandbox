import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {routing} from './creative-coding.routing';
import {IndexComponent} from './components/index.component';
import {ChapModule as TypographyModule} from './components/typography/chap.module';
import {ChapModule as ParticleModule} from './components/particle/chap.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing,
        TypographyModule,
        ParticleModule
    ],
    declarations: [
        IndexComponent
    ]
})
export class CreativeCodingModule {}