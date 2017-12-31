import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home.component';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
    { path: '', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
