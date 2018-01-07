import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {IndexComponent} from './components/index.component';
import {routes as typographyRoutes} from './components/typography/chap.routing';
import {routes as particleRoutes} from './components/particle/chap.routing';
import {routes as tutorialRoutes} from './components/tutorial/chap.routing';

const routes: Routes = [
    {
        path: 'creative-coding',
        component: IndexComponent,
        children: [
            ...typographyRoutes,
            ...particleRoutes,
            ...tutorialRoutes
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
