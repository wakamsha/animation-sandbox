import {chapter} from './chap.service';
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = Object.keys(chapter.routes).map(name => ({path: `${chapter.directory}/${name}`, component: chapter.routes[name]}));
export const chapRouting: ModuleWithProviders = RouterModule.forChild(routes);
