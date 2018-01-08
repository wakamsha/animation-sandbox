import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {routing} from './creative-coding.routing';
import {IndexComponent} from './components/index.component';
import {ChapModule as TypographyModule} from './components/typography/chap.module';
import {ChapModule as ParticleModule} from './components/particle/chap.module';
import {ChapModule as TutorialModule} from './components/tutorial/chap.module';
import {ChapModule as FractalModule} from './components/fractal/chap.module';
import {ChapModule as GraphicModule} from './components/graphic/chap.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing,
        TypographyModule,
        ParticleModule,
        TutorialModule,
        FractalModule,
        GraphicModule
    ],
    declarations: [
        IndexComponent
    ]
})
export class CreativeCodingModule {}
