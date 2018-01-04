import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {chapter} from './chap.service';

export const routes: Routes = Object.keys(chapter.routes).map(name => ({path: `${chapter.directory}/${name}`, component: chapter.routes[name]}));
export const chapRouting: ModuleWithProviders = RouterModule.forChild(routes);
