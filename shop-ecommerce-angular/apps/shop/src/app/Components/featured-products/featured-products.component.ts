import { Component, OnInit } from '@angular/core';
import { ProductService } from '@shop-ecommerce-angular/products';
import { Products } from 'libs/products/src/lib/Interface/Product.interface';

@Component({
  selector: 'shop-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {

  products: Products[] = [];
  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this._getProducts();
  }

  _getProducts(){
    this.productsService.getProducts().subscribe( response => {
      this.products = response.data.slice(21, 25)
    })
  }

}
