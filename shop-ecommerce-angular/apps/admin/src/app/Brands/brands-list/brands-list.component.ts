import { Component, OnInit } from '@angular/core';
import { BrandService } from '@shop-ecommerce-angular/products';
import { brandModel } from '../../models/brand';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {

  Brands: brandModel[] = [];
  BrandName?: string;

  constructor(
    private BrandServicie: BrandService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBrands();
  }

  private getBrands(){
    return this.BrandServicie.getBrands().subscribe(response => {
      this.Brands = response.data;
    });
  }

  onDelete(id: string,){
    this.confirmationService.confirm({
      message: 'Are you sure that you want delete this Brand ?',
      accept: () => {
        return this.BrandServicie.deleteBrand(id).subscribe(response => {
          this.BrandName = response.data?.name
          if(response?.data){
            this.getBrands();
            this.messageService.add({
              severity:'success', 
              summary:'Success', 
              detail:'Brand is deleted'
            });
          }
        });
      },
      reject: () => {
        this.messageService.add({
          severity:'warn', 
          summary:'Warning', 
          detail:'Brand is not deleted'
        });
      }
    });
  }
  onEdit(id: string){
    return this.router.navigateByUrl(`admin/brands/form/${id}`)
  }

  onChange(id: string){
    return this.BrandServicie.enableBrand(id).subscribe();
  };
}
