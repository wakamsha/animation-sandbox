import {Component, OnInit} from '@angular/core';
import {Chapter, Demo} from '../../declares/interface';
import {Router} from '@angular/router';
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
        <navigation [chapters]="chapters" (selected)="onSelect($event)"></navigation>
    `
})
export class IndexComponent implements OnInit {
    chapters: Chapter[] = [];

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
        this.chap03Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.03', directory: 'chap03'}));
        this.chap04Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.04', directory: 'chap04'}));
        this.chap05Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.05', directory: 'chap05'}));
        this.chap06Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.06', directory: 'chap06'}));
        this.chap07Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.07', directory: 'chap07'}));
        this.chap08Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.08', directory: 'chap08'}));
        this.chap09Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.09', directory: 'chap09'}));
        this.chap10Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.10', directory: 'chap10'}));
        this.chap11Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.11', directory: 'chap11'}));
        this.chap12Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.12', directory: 'chap12'}));
        this.chap13Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.13', directory: 'chap13'}));
        this.chap14Service.getchaps().then(chaps => this.addChapter({chaps, title: 'Chapter.14', directory: 'chap14'}));
    }

    public onSelect(demo: Demo) {
        this.router.navigate([`/as3/${demo.directory}`, demo.name]);
    }

    private addChapter({chaps, title, directory}: {
        chaps: any;
        title: string;
        directory: string;
    }) {
        const chapter: Chapter = {
            title,
            demos: Object.keys(chaps).map(name => ({directory, name}))
        };
        this.chapters.push(chapter);
    }
}
