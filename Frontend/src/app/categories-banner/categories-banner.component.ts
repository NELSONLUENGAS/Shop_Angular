import { Component, OnInit } from '@angular/core';
import { brandModel } from '../Models/brand';
import { Category } from '../Models/category';
import { BrandsService } from '../service/brands.service';
import { CategoriesService } from '../service/categories.service';

@Component({
  selector: 'app-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.scss']
})
export class CategoriesBannerComponent implements OnInit {
  brands: brandModel[] = [];
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService, private brandService: BrandsService) { }

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
