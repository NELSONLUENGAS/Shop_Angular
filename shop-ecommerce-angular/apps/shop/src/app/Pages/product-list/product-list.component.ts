import { Component, OnInit } from '@angular/core';
import { Category } from 'libs/products/src/lib/Interface/Category.interface';
import { Products } from 'libs/products/src/lib/Interface/Product.interface';
import { ActivatedRoute } from '@angular/router';
import { BrandService, CategoryService, ProductService } from '@shop-ecommerce-angular/products';

@Component({
  selector: 'shop-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Products[] = [];
  categories: Category[] = [];
  isCategoryPage = false;
  constructor( 
    private route: ActivatedRoute, 
    private productsService: ProductService, 
    private brandService: BrandService, 
    private categoriesService: CategoryService
  ) { }

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
