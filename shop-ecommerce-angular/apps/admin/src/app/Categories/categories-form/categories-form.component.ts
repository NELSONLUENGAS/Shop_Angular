import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { brandModel } from '../../models/brand';
import { BrandService, CategoryService } from '@shop-ecommerce-angular/products';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {timer } from 'rxjs';
import { PostCategory } from '../../models/category';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  brands: brandModel[] = [];
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  ID!: string;

  constructor(
    private CategoriesService: CategoryService, 
    private BrandsService: BrandService, 
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.BrandsService.getBrands().subscribe(brand => {
      this.brands = brand?.data
    });
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brands: ['', Validators.required],
    });
    this._checkEditMode();
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const brands : string[] = [];
    if(this.categoryForm["brands"].value?.length){
      for(const brand of this.categoryForm["brands"].value){
        brands.push(brand.name)
      }
    }
    const payload : PostCategory = {
      category:{
        name: this.categoryForm['name'].value
      },
      brandID: brands
    }
    if(this.editMode){
      this.CategoriesService.editCategory(this.ID, payload).subscribe( response => {
        this.messageService.add({
          severity:'success', 
          summary:'Success', 
          detail:`Category ${response.data.name} is updated`
        });
        timer(2000).subscribe(() =>{
          this.router.navigateByUrl('admin/categories');
        })
      })
    }else{
      this.CategoriesService.postCategory(payload).subscribe( response => {
        if(response?.msg === 'category and brandID created sucedssfully'){
          this.messageService.add({
            severity:'success', 
            summary:'Success', 
            detail:'Category is created'
          });
          timer(2000).subscribe(() =>{
            this.router.navigateByUrl('admin/categories');
          })
        }else{
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail:'Category is not created'
          });
        }
      });
    }
  }
  get  categoryForm(){
    return this.form.controls;
  }

  private _checkEditMode(){
    this.route.params.subscribe( params => {
      if(params["id"]){
        this.ID = params["id"];
        this.editMode = true;
        this.CategoriesService.getCategoryById(params["id"]).subscribe(category => {
          this.categoryForm['name'].setValue(category['data'].name)
          this.categoryForm['brands'].setValue(category['data'].brandID?.length && category['data'].brandID[0].name)
        })
      }
    })
  }

}
