import {Routes, RouterModule} from '@angular/router';
import {chaps, directory} from './chap.service';
import {ModuleWithProviders} from '@angular/core';

export const routes: Routes = Object.keys(chaps).map(name => ({path: `${directory}/${name}`, component: chaps[name]}));

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
