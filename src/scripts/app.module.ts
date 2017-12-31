import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {OreillyModule} from './oreilly/oreilly.module';
import {appRoutingProviders, routing} from './app.routing';
import {HomeModule} from './home/components/home.module';
import {As3Module} from './as3/as3.module';

@NgModule({
    imports: [
        BrowserModule,
        HomeModule,
        OreillyModule,
        As3Module,
        routing
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
