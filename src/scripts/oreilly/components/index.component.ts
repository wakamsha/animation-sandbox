import {Component, OnInit} from '@angular/core';
import {Chapter, Demo} from '../../declares/interface';
import {Router} from '@angular/router';
import {ChapService as Chap01Service} from './chap01/chap.service';

@Component({
    template: `
        <router-outlet></router-outlet>
        <navigation [chapters]="chapters" (selected)="onSelect($event)"></navigation>
    `
})
export class IndexComponent implements OnInit {
    chapters: Chapter[] = [];

    constructor(private router: Router,
                private chap01Service: Chap01Service) {}

    ngOnInit() {
        this.chap01Service.getchaps().then(chapters => this.addChapter({chapters, title: 'Chapter.01', directory: 'chap01'}));
    }

    public onSelect(demo: Demo) {
        this.router.navigate([`/oreilly/${demo.directory}`, demo.name]);
    }

    private addChapter({chapters, title, directory}: {
        chapters: any;
        title: string;
        directory: string;
    }) {
        const chapter: Chapter = {
            title,
            demos: Object.keys(chapters).map(name => ({ directory, name }))
        };
        this.chapters.push(chapter);
    }
}
