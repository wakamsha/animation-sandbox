import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Page, Section} from '../../shared/navigation.component';
import {Chapter} from '../../declares/interface';
import {ChapService as Chap03Service} from './chap03/chap.service';
import {ChapService as Chap04Service} from './chap04/chap.service';
import {ChapService as Chap05Service} from './chap05/chap.service';
import {ChapService as Chap06Service} from './chap06/chap.service';
import {ChapService as Chap07Service} from './chap07/chap.service';
import {ChapService as Chap08Service} from './chap08/chap.service';
import {ChapService as Chap09Service} from './chap09/chap.service';
import {ChapService as Chap10Service} from './chap10/chap.service';
import {ChapService as Chap11Service} from './chap11/chap.service';
import {ChapService as Chap12Service} from './chap12/chap.service';
import {ChapService as Chap13Service} from './chap13/chap.service';
import {ChapService as Chap14Service} from './chap14/chap.service';

@Component({
    template: `
        <router-outlet></router-outlet>
        <navigation [sections]="sections" (selected)="onSelect($event)"></navigation>
    `
})
export class IndexComponent implements OnInit {
    sections: Section[] = [];

    constructor(private router: Router,
                private chap03Service: Chap03Service,
                private chap04Service: Chap04Service,
                private chap05Service: Chap05Service,
                private chap06Service: Chap06Service,
                private chap07Service: Chap07Service,
                private chap08Service: Chap08Service,
                private chap09Service: Chap09Service,
                private chap10Service: Chap10Service,
                private chap11Service: Chap11Service,
                private chap12Service: Chap12Service,
                private chap13Service: Chap13Service,
                private chap14Service: Chap14Service) {}

    ngOnInit() {
        this.chap03Service.getChapter().then(chapter => this.addChapter(chapter));
        this.chap04Service.getChapter().then(chapter => this.addChapter(chapter));
        this.chap05Service.getChapter().then(chapter => this.addChapter(chapter));
        this.chap06Service.getChapter().then(chapter => this.addChapter(chapter));
        this.chap07Service.getChapter().then(chapter => this.addChapter(chapter));
        this.chap08Service.getChapter().then(chapter => this.addChapter(chapter));
        this.chap09Service.getChapter().then(chapter => this.addChapter(chapter));
        this.chap10Service.getChapter().then(chapter => this.addChapter(chapter));
        this.chap11Service.getChapter().then(chapter => this.addChapter(chapter));
        this.chap12Service.getChapter().then(chapter => this.addChapter(chapter));
        this.chap13Service.getChapter().then(chapter => this.addChapter(chapter));
        this.chap14Service.getChapter().then(chapter => this.addChapter(chapter));
    }

    public onSelect(page: Page) {
        this.router.navigate([`/as3/${page.directory}`, page.name]);
    }

    private addChapter(chapter: Chapter) {
        this.sections.push({
            title: chapter.title,
            pages: Object.keys(chapter.routes).map(name => ({directory: chapter.directory, name}))
        });
    }
}
