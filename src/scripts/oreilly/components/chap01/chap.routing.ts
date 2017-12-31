import {RouterModule, Routes} from '@angular/router';
import {chaps} from './chap.service';
import {ModuleWithProviders} from '@angular/core';

export const routes: Routes = Object.keys(chaps).map(name => ({ path: `chap01/${name}`, component: chaps[name] }));

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
