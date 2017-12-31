import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'my-app',
    template: `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a (click)="onClickTop()" class="navbar-brand">Animations</a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav">
                        <li><a class="nav-link" routerLink="/as3"     routerLinkActive="active">AS3</a></li>
                        <li><a class="nav-link" routerLink="/oreilly" routerLinkActive="active">Oreilly AS3</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <router-outlet></router-outlet>
`
})
export class AppComponent implements OnInit {
    private baseTitle = 'Animation Sandbox w/ TypeScript';

    constructor(private router: Router,
                private title: Title) {

    }

    ngOnInit() {}

    onClickTop() {
        this.router.navigate(['']);
        this.title.setTitle(this.baseTitle);
    }
}
