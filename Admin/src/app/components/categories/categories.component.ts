import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/service/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private CategoriesService: CategoriesService, 
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
          if(response.hasOwnProperty('data')){
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
