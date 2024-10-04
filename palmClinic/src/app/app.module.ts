import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersConsultationsComponent } from './components/users-consultations/users-consultations.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ConsultantComponent } from './components/consultant/consultant.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBarAction,MatSnackBarActions,MatSnackBarLabel} from '@angular/material/snack-bar';
import { LoginComponent } from './components/login/login.component';
// import {MatSnackBar} from '@angular/material/snack-bar';
// import {MatButtonModule} from '@angular/material/button';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HomePageComponent,
    ConsultantComponent,
    LoginComponent,
    UsersConsultationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      // positionClass:'custom-toast'
    }), 
    MatIconModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    // MatSnackBar,
    // MatButtonModule,
    // MatInputModule,
    // MatFormFieldModule

    
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
