import { Component, OnInit } from '@angular/core';
import { BrandService, CategoryService } from '@shop-ecommerce-angular/products';
import { brandModel, Category } from '@shop-ecommerce-angular/products';


@Component({
  selector: 'ui-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  brands: brandModel[] = [];
  categories: Category[] = [];

  constructor(private categoriesService: CategoryService, private brandService: BrandService) { }

  ngOnInit(): void {
    this._getCategories();
    this._getBrands();
  }

  _getCategories(){
    this.categoriesService.getCategories().subscribe(response => {
      this.categories = response.data.filter(category =>  category.enable !== false);
    })
  }
  _getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data.filter(brand =>  brand.enable !== false);
    })
  }
}
