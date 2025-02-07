import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersConsultationsComponent } from './components/users-consultations/users-consultations.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ConsultantComponent } from './components/consultant/consultant.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBarAction,MatSnackBarActions,MatSnackBarLabel} from '@angular/material/snack-bar';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { DisableCopiesDirective } from './disable-copies.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HomePageComponent,
    ConsultantComponent,
    LoginComponent,
    UsersConsultationsComponent,
    FooterComponent,
    DisableCopiesDirective
  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader , 
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
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

    
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
