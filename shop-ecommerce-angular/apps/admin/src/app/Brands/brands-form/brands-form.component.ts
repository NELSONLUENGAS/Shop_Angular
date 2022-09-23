import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BrandService } from '@shop-ecommerce-angular/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-brands-form',
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.scss']
})
export class BrandsFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  ID!: string;

  constructor(
    private BrandsService: BrandService, 
    private formBuilder: FormBuilder,  
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this._checkEditMode();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const payload: object = {
      brand:{
        name: this.brandForm['name'].value
      }
    }
    if(this.editMode){
      this.BrandsService.editBrand(this.ID, payload).subscribe( response => {
        this.messageService.add({
          severity:'success', 
          summary:'Success', 
          detail:`Brand ${response.data?.name}  is updated`
        });
        timer(2000).subscribe(() =>{
          this.router.navigateByUrl('admin/brands');
        })
      })
    }else{
      this.BrandsService.postBrand(payload).subscribe( response => {
        if(response.data){
          this.messageService.add({
            severity:'success', 
            summary:'Success', 
            detail:`Brand ${response.data?.data?.name}  is created`
          });
          timer(2000).subscribe(() =>{
            this.router.navigateByUrl('admin/brands');
          })
        }else{
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail:'Brand is not created'
          });
        }
      });
    }
  }
  get  brandForm(){
    return this.form.controls;
  }

  private _checkEditMode(){
    this.route.params.subscribe( params => {
      if(params["id"]){
        this.ID = params["id"];
        this.editMode = true;
        this.BrandsService.getBrandById(this.ID).subscribe(brand => {
          this.brandForm['name'].setValue(brand['data']?.name);
        })
      }
    })
  }
}
