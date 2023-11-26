import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule, NgxUiLoaderConfig  } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#3d49b8",
  bgsOpacity: 1,
  bgsPosition: "bottom-right",
  bgsSize: 40,
  bgsType: "double-bounce",
  blur: 1,
  delay: 0,
  fgsColor: "#3d49b8",
  fgsPosition: "center-center",
  fgsSize: 50,
  fgsType: "fading-circle",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(255,255,255,0.7)",
  pbColor: "#3d49b8",
  pbDirection: "ltr",
  pbThickness: 4,
  hasProgressBar: true,
  maxTime: -1,
  minTime: 500
};



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot(),
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    NgxUiLoaderModule,
    ToastrModule
  ]
})
export class SharedModule { }
