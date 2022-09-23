import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BrandService, CategoryService, ProductService } from '@shop-ecommerce-angular/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {

  Brands: any = [];
  Categories: any = [];
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  ID!: string;
  displayImage: string | ArrayBuffer | null | undefined;


  constructor(
    private ProductService: ProductService,
    private CategoriesService: CategoryService,
    private BrandServicie: BrandService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  private getCategories(){
    this.CategoriesService.getCategories().subscribe( category => {
      const categoryName: object[] = [];
      for(const cat of category.data){
        categoryName.push(cat)
      }
      this.Categories = categoryName;
    })
  };

  private getBrands(){
    return this.BrandServicie.getBrands().subscribe(brands => {
      const brandName: object[] = [];
      for(const brand of brands.data){
        brandName.push(brand)
      }
      this.Brands = brandName;
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getBrands();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      stock: ['', Validators.required],
      description: ['', ],
      details: [''],
      brand: ['', Validators.required],
      category: ['', Validators.required],
    });
    this._checkEditMode();
  }

  onChange(event: any){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image: file});
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.displayImage = fileReader.result;
      }
      fileReader.readAsDataURL(file)
    }
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const formData = new FormData();
    Object.keys(this.form.value).map(key => {
      formData.append(key, this.form.value[key]);
    })
    if(this.editMode){
      this.ProductService.editProduct(this.ID, formData).subscribe( response => {
        this.messageService.add({
          severity:'success', 
          summary:'Success', 
          detail:`Product ${response.data?.name} is updated`
        });
        timer(2000).subscribe(() =>{
          this.router.navigateByUrl('admin/products');
        })
      })
    }else{
      this.ProductService.postProduct(formData).subscribe( response => {
        console.log(response)
        if(response.data){
          this.messageService.add({
            severity:'success', 
            summary:'Success', 
            detail:'Product is created'
          });
          timer(2000).subscribe(() =>{
            this.router.navigateByUrl('admin/products');
          })
        }else{
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail:'Product is not created'
          });
        }
      });
    }
  }
  get  productsForm(){
    return this.form.controls;
  }

  private _checkEditMode(){
    this.route.params.subscribe( params => {
      if(params["id"]){
        this.ID = params["id"];
        this.editMode = true;
        this.ProductService.getProductById(this.ID).subscribe(product => {
          this.productsForm['name'].setValue(product['data']['name']);
          this.productsForm['price'].setValue(product['data']['price']);
          // this.productsForm['image'].setValue(product['data']['image'])
          this.productsForm['stock'].setValue(product['data']['STOCK']);
          this.productsForm['description'].setValue(product['data']['description']);
          this.productsForm['brand'].setValue(product['data']['brandID']?._id);
          this.productsForm['category'].setValue(product['data']['categoryID']?._id);
          this.displayImage = product['data']['image'];
          this.productsForm['image'].setValidators([]);
          this.productsForm['image'].updateValueAndValidity();
        })
      }
    })
  }
}
