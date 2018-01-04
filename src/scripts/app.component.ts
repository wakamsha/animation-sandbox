import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'my-app',
    template: `
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <a (click)="onClickTop()" class="navbar-brand">Animations</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li><a class="nav-link" routerLink="/as3"             routerLinkActive="active">AS3</a></li>
                    <li><a class="nav-link" routerLink="/creative-coding" routerLinkActive="active">Creative Coding</a></li>
                </ul>
            </div>
        </nav>
        <router-outlet></router-outlet>
`
})
export class AppComponent implements OnInit {
    private baseTitle = 'Animation Sandbox w/ TypeScript';

    constructor(private router: Router,
                private title: Title) {}

    ngOnInit() {}

    onClickTop() {
        this.router.navigate(['']);
        this.title.setTitle(this.baseTitle);
    }
}
