import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from '@shop-ecommerce-angular/products';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private CategoriesService: CategoryService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(){
    this.CategoriesService.getCategories().subscribe( category => {
      this.categories = category.data;
    })
  };

  onDelete(id: string,){
    this.confirmationService.confirm({
      message: 'Are you sure that you want delete this category?',
      accept: () => {
        return this.CategoriesService.deleteCategory(id).subscribe(response => {
          if(response?.data){
            this.getCategories();
            this.messageService.add({
              severity:'success', 
              summary:'Success', 
              detail:'Category is deleted'
            });
          }
        });
      },
      reject: () => {
        this.messageService.add({
          severity:'warn', 
          summary:'Warning', 
          detail:'Category is not deleted'
        });
      }
    });
  }
  onEdit(id: string){
    return this.router.navigateByUrl(`admin/categories/form/${id}`)
  }

  onChange(id: string){
    return this.CategoriesService.enableCategory(id).subscribe();
  };
}
