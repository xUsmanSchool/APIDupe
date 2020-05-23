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
import { MovieComponent } from './movie/movie.component';
import { LoginComponent } from './login/login.component';
import { StorageComponent } from './storage/storage.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DirectorComponent } from './director/director.component';
//prime ng

const config = {
  apiKey: "AIzaSyAW-Sl8rf_RlFF1EmqYagV-wHrnc3mN9gE",
  authDomain: "cloud-api-eindproject.firebaseapp.com",
  databaseURL: "https://cloud-api-eindproject.firebaseio.com",
  projectId: "cloud-api-eindproject",
  storageBucket: "cloud-api-eindproject.appspot.com",
  messagingSenderId: "275240987117"
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigatieComponent,
    EditComponent,
    MovieComponent,
    LoginComponent,
    StorageComponent,
    DirectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SlideshowModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    RouterModule.forRoot([
      { path: "Main", component: MainComponent },
      { path: "Edit", component: EditComponent },
      { path: "Movie", component: MovieComponent },
      { path: "Director", component: DirectorComponent },
      { path: "", redirectTo: "Main", pathMatch: "full" }
    ], { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
