import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {IndexComponent} from './components/index.component';
import {routes as chap03Routes} from './components/chap03/chap.routing';
import {routes as chap04Routes} from './components/chap04/chap.routing';
import {routes as chap05Routes} from './components/chap05/chap.routing';
import {routes as chap06Routes} from './components/chap06/chap.routing';
import {routes as chap07Routes} from './components/chap07/chap.routing';
import {routes as chap08Routes} from './components/chap08/chap.routing';
import {routes as chap09Routes} from './components/chap09/chap.routing';
import {routes as chap10Routes} from './components/chap10/chap.routing';
import {routes as chap11Routes} from './components/chap11/chap.routing';
import {routes as chap12Routes} from './components/chap12/chap.routing';
import {routes as chap13Routes} from './components/chap13/chap.routing';
import {routes as chap14Routes} from './components/chap14/chap.routing';

const routes: Routes = [
    {
        path: 'as3',
        component: IndexComponent,
        children: [
            ...chap03Routes,
            ...chap04Routes,
            ...chap05Routes,
            ...chap06Routes,
            ...chap07Routes,
            ...chap08Routes,
            ...chap09Routes,
            ...chap10Routes,
            ...chap11Routes,
            ...chap12Routes,
            ...chap13Routes,
            ...chap14Routes
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
