import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {IndexComponent} from './components/index.component';
import {routes as chap01Routes} from './components/chap01/chap.routing';

const routes: Routes = [
    {
        path: 'oreilly',
        component: IndexComponent,
        children: [
            ...chap01Routes,
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
