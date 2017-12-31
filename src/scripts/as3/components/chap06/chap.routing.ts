import {chaps, directory} from './chap.service';
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = Object.keys(chaps).map(name => ({ path: `${directory}/${name}`, component: chaps[name] }));

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
