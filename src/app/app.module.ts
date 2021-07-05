import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpRequest,
} from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AuthGuard } from './services/auth/auth.guard';
import { ErrorHandlerInterceptorService } from './interceptors/error-handler-interceptor.service';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';

@NgModule({
  declarations: [AppComponent, ServerErrorComponent],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
