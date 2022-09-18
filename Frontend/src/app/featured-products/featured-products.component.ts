import { Component, OnInit } from '@angular/core';
import { Products } from '../Models/products';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {
  products: Products[] = [];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this._getProducts();
  }

  _getProducts(){
    this.productsService.getProducts().subscribe( response => {
      this.products = response.data.slice(21, 25)
    })
  }
}
