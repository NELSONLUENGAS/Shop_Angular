import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../Models/category';
import { Products } from '../Models/products';
import { BrandsService } from '../service/brands.service';
import { CategoriesService } from '../service/categories.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Products[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean = false;
  constructor( private route: ActivatedRoute, private productsService: ProductsService, private brandService: BrandsService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      params["categoryId"] ? this._getProducts(params["categoryId"]) : this._getProducts();
      params["categoryId"] ? this.isCategoryPage = true : this.isCategoryPage = false;
    })
    this._getCategories();
  }

  _getProducts(queryParams?: string){
    this.productsService.getProducts(queryParams).subscribe( response => {
      this.products = response.data.filter(product => product.enable !== false);
    })
  }

  _getCategories(){
    this.categoriesService.getCategories().subscribe(response => {
      this.categories = response.data.filter(category =>  category.enable !== false);
    })
  }
  

  categoriesFilter(){
    const selectedCategories = this.categories
      .filter(category => category.checked)
      .map(category => category._id);
      this._getProducts(selectedCategories.join());
  }
}
