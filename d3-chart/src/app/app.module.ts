import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { XAxisComponent } from './x-axis/x-axis.component';
import { YAxisComponent } from './y-axis/y-axis.component';
import { CurveComponent } from './curve/curve.component';
import { ClipPathComponent } from './clip-path/clip-path.component';
import { CurveDotComponent } from './curve-dot/curve-dot.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    XAxisComponent,
    YAxisComponent,
    CurveComponent,
    ClipPathComponent,
    CurveDotComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
