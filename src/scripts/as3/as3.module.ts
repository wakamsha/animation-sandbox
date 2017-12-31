import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {routing} from './as3.routing';
import {IndexComponent} from './components/index.component';
import {ChapModule as Chap03Module} from './components/chap03/chap.module';
import {ChapModule as Chap04Module} from './components/chap04/chap.module';
import {ChapModule as Chap05Module} from './components/chap05/chap.module';
import {ChapModule as Chap06Module} from './components/chap06/chap.module';
import {ChapModule as Chap07Module} from './components/chap07/chap.module';
import {ChapModule as Chap08Module} from './components/chap08/chap.module';
import {ChapModule as Chap09Module} from './components/chap09/chap.module';
import {ChapModule as Chap10Module} from './components/chap10/chap.module';
import {ChapModule as Chap11Module} from './components/chap11/chap.module';
import {ChapModule as Chap12Module} from './components/chap12/chap.module';
import {ChapModule as Chap13Module} from './components/chap13/chap.module';
import {ChapModule as Chap14Module} from './components/chap14/chap.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing,
        Chap03Module,
        Chap04Module,
        Chap05Module,
        Chap06Module,
        Chap07Module,
        Chap08Module,
        Chap09Module,
        Chap10Module,
        Chap11Module,
        Chap12Module,
        Chap13Module,
        Chap14Module
    ],
    declarations: [
        IndexComponent
    ]
})
export class As3Module {}
