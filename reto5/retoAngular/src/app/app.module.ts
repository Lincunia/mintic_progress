import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './template/nav-bar/nav-bar.component';
import { FooterComponent } from './template/footer/footer.component';
import { ContentComponent } from './template/content/content.component';
import { ErrorComponent } from './template/error/error.component';

@NgModule({
    declarations: [
	AppComponent,
	NavBarComponent,
	FooterComponent,
	ContentComponent,
	ErrorComponent
    ],
    imports: [
	BrowserModule,
	AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
