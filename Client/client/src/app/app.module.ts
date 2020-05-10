import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component'; 
import { RouterModule } from '@angular/router';
import { NavigatieComponent } from './navigatie/navigatie.component';
import { EditComponent } from './edit/edit.component';    
import { FormsModule } from '@angular/forms';
import { SlideshowModule } from 'ng-simple-slideshow';
//prime ng

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigatieComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SlideshowModule,
    RouterModule.forRoot([
      { path: "Main", component: MainComponent },
      { path: "Edit", component: EditComponent },
      { path: "", redirectTo: "Main", pathMatch: "full" }
    ], { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
