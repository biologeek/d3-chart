import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { XAxisComponent } from './x-axis/x-axis.component';
import { YAxisComponent } from './y-axis/y-axis.component';
import { CurveComponent } from './curve/curve.component';
import { ClipPathComponent } from './clip-path/clip-path.component';
import { CurveDotComponent } from './curve-dot/curve-dot.component';
import { CurveDotsSetComponent } from './curve-dots-set/curve-dots-set.component';
import { DotTooltipComponent } from './dot-tooltip/dot-tooltip.component';
import { BrushXComponent } from './brush-x/brush-x.component';
import { BrushYComponent } from './brush-y/brush-y.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    XAxisComponent,
    YAxisComponent,
    CurveComponent,
    ClipPathComponent,
    CurveDotComponent,
    CurveDotsSetComponent,
    DotTooltipComponent,
    BrushXComponent,
    BrushYComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
