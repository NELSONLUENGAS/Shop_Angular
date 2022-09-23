import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '@shop-ecommerce-angular/products';
import { Products } from '../../models/products';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  description!: object | string;
  Products: Products[] = [];
  Expand = false;

  constructor(
    private ProductService: ProductService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
  }
  

  ngOnInit(): void {
    this.getProducts();
  }
  private getProducts(){
    this.ProductService.getProducts().subscribe( product => {
      this.Products = product.data;
      const productsData = [];
      for(const element of this.Products){
        const object = {
          _id: element._id,
          name: element.name,
          image: element.image,
          price: element.price,
          enable: element.enable,
          STOCK: element.STOCK,
          details: [
            {
              _id: element._id,
              brandID: element.brandID,
              categoryID: element.categoryID,
              createdAt: element.createdAt,
              updatedAt: element.updatedAt
            }
          ]
        }
        productsData.push(object);
      }
      this.Products = productsData;
    })
  };

  onDelete(id: string,){
    this.confirmationService.confirm({
      message: 'Are you sure that you want delete this Product?',
      accept: () => {
        return this.ProductService.deleteProduct(id).subscribe(response => {
          if(response?.data){
            this.getProducts();
            this.messageService.add({
              severity:'success', 
              summary:'Success', 
              detail:'Product is deleted'
            });
          }
        });
      },
      reject: () => {
        this.messageService.add({
          severity:'warn', 
          summary:'Warning', 
          detail:'Product is not deleted'
        });
      }
    });
  }
  onEdit(id: string){
    return this.router.navigateByUrl(`admin/products/form/${id}`)
  }

  onChange(id: string){
    return this.ProductService.enableProduct(id).subscribe();
  };
}
