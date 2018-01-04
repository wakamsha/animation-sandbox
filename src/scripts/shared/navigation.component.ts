import {Component, EventEmitter, Input, Output} from '@angular/core';

export type Section = {
    title: string;
    pages: Page[];
}

export type Page = {
    directory: string;
    name: string;
}

@Component({
    selector: 'navigation',
    template: `
<div class="navigation" [class.navigation--collapsed]="!isExpanded">
    <button class="navigation__toggle" (click)="toggleNavigationVisibility()" [class.navigation__toggle--active]="isExpanded">
        <i class="fa" [ngClass]="isExpanded ? 'fa-times' : 'fa-bars'"></i>
    </button>
    <div class="navigation__inner">
        <div *ngFor="let section of sections" class="navigation__section">
            <h3 class="navigation__caption">{{section.title}}</h3>
            <ul class="navigation__list">
                <li *ngFor="let page of section.pages" class="navigation__list-item" [class.navigation__list-item--selected]="isSelected({state: page.name, directory: page.directory})">
                    <a (click)="select({name: page.name, directory: page.directory})">{{capitalize(page.name)}}</a>
                </li>
            </ul>
        </div>
    </div>
</div>
`
})
export class NavigationComponent {

    @Input()
    sections: Section[];

    @Output()
    selected = new EventEmitter();

    isExpanded = true;

    private selectedState: string;

    isSelected({state, directory}: {
        state: string;
        directory: string
    }): boolean {
        return this.selectedState === `${directory}/${state}`;
    }

    capitalize(str: string): string {
        return `-${str}`.replace(/\-(\w)/g, (_, m) => m.toUpperCase());
    }

    select({name, directory}: {
        name: string;
        directory: string;
    }) {
        this.selectedState = `${directory}/${name}`;
        const page: Page = { directory, name };
        this.selected.emit(page);
    }

    toggleNavigationVisibility() {
        this.isExpanded = !this.isExpanded;
    }
}
