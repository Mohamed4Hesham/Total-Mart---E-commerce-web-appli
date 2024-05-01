import { Component, OnInit, model } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  products:any[] = [];
  categories:any[] = [];
  loading:boolean = false;
  cartproducts:any[] = [];
  carts: any[] = []; 
  details: any; 
  base64 : any ='';
  form!: FormGroup;

  constructor(private service:ProductsService, private build:FormBuilder){}

  ngOnInit(): void {
    this.getproducts();
    this.getCategories();
    this.form = this.build.group({
      title: ['' , [Validators.required]],
      price: ['' , [Validators.required]],
      description: ['' , [Validators.required]],
      image: ['' , [Validators.required]],
      category: ['', [Validators.required]]
    })
  }

getproducts(){
  this.loading = true;
  this.service.getAllproducts().subscribe((res:any)=>{
    this.products=res;
    this.loading = false;
    console.log(res);
  }, error =>{
    this.loading = false;
    alert(error)}
  )
}

getCategories(){
  this.loading = true;
  this.service.getAllcategories().subscribe((cat:any)=>{
    this.categories= cat;
    console.log(cat);
    this.loading = false;
  }, error =>{
    this.loading = false;
    alert(error)}
  )
} 


filterProductbycategory(keyword:string){
  this.loading = true;
  this.service.filterProductsbycategory(keyword).subscribe((res:any)=>{
    this.products=res;
    this.loading = false;
  }, error =>{
    this.loading = false;
    alert(error)}
  )
}

  getSelectedcategories(event: any){
    this.form.get('category')?.setValue(event.target.value);
  }


  getImagepath(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image')?.setValue(this.base64);
      console.log(this.base64);
    }
  } 

  addProduct(){
    const modal = this.form.value;
    this.service.createProduct(modal).subscribe((res=>{
      alert("The product has been added successfully");
      console.log(this.form)
    }))
  }

  update(item: any) {
    this.form.patchValue({
      title: item.title,
      price: item.price,
      category: item.category, 
      image: item.image,
      description: item.description,
    });
    this.base64 = item.image;
    console.log(this.form.value);
    // this.form.get('title')?.setValue(item.title);
    // this.form.get('price')?.setValue(item.price);
    // this.form.get('category')?.setValue(item.category);
    // this.form.get('image')?.setValue(item.image);
    // this.form.get('description')?.setValue(item.description);
  }
}






// filterCategory(event:any){
//   //   this.loading = true;
//   //     let value = event.target.value;
//   //     if(value == 'All'){
//   //       this.getproducts();
//   //     }else{
//   //       this.filterProductbycategory(value);
//   //     }
//   // } 