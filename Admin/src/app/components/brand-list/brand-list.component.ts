import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { brandModel } from 'src/app/models/brand';
import { BrandsService } from 'src/app/service/brands.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {

  Brands: brandModel[] = [];
  BrandName: any;

  constructor(
    private BrandServicie: BrandsService,
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
          if(response.hasOwnProperty('data')){
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
