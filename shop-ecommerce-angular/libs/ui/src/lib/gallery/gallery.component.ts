import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  selectedImage!: string;

  @Input() images: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
