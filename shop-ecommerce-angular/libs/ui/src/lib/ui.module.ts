import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    RouterModule,
  ],
  declarations: [
    BannerComponent,
    SliderComponent,
    GalleryComponent
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    GalleryComponent
  ]
})
export class UiModule {}
