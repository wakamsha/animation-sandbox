import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {IndexComponent} from './components/index.component';
import {routes as typographyRoutes} from './components/typography/chap.routing';

const routes: Routes = [
    {
        path: 'creative-coding',
        component: IndexComponent,
        children: [
            ...typographyRoutes
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
