import {Component, OnInit} from '@angular/core';
import {Page, Section} from '../../shared/navigation.component';
import {Router} from '@angular/router';
import {Chapter} from '../../declares/interface';
import {ChapService as TypographyService} from './typography/chap.service';
import {ChapService as ParticleService} from './particle/chap.service';
import {ChapService as TutorialService} from './tutorial/chap.service';
import {ChapService as FractalService} from './fractal/chap.service';

@Component({
    template: `
        <router-outlet></router-outlet>
        <navigation [sections]="sections" (selected)="onSelect($event)"></navigation>
    `
})
export class IndexComponent implements OnInit {
    sections: Section[] = [];

    constructor(private router: Router,
                private typographyService: TypographyService,
                private particleService: ParticleService,
                private tutorialService: TutorialService,
                private fractalService: FractalService) {}

    ngOnInit() {
        this.typographyService.getChapter().then(chapter => this.addChapter(chapter));
        this.particleService.getChapter().then(chapter => this.addChapter(chapter));
        this.tutorialService.getChapter().then(chapter => this.addChapter(chapter));
        this.fractalService.getChapter().then(chapter => this.addChapter(chapter));
    }

    public onSelect(page: Page) {
        this.router.navigate([`/creative-coding/${page.directory}`, page.name]);
    }

    private addChapter(chapter: Chapter) {
        this.sections.push({
            title: chapter.title,
            pages: Object.keys(chapter.routes).map(name => ({directory: chapter.directory, name}))
        });
    }
}
