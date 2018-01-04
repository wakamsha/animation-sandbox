import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {appRoutingProviders, routing} from './app.routing';
import {HomeModule} from './home/components/home.module';
import {As3Module} from './as3/as3.module';

@NgModule({
    imports: [
        BrowserModule,
        HomeModule,
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
