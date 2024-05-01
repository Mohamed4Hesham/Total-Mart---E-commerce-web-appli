import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../../cart.service';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {

  constructor(
    private service: CartService,
    private formBuilder: FormBuilder,
    private productsService : ProductsService
  ) {} 

  carts: any[] = []; 
  form!: FormGroup; 
  details: any; 
  products: any [] = [];


  ngOnInit(): void {
    this.form = this.formBuilder.group({ 
      start: [''],
      end: ['']
    });
    this.getAllcarts();
    this.applyFilters();
  }

  getAllcarts() {
    this.service.getCarts().subscribe((res: any) => {
      this.carts = res;
    });
  }

  applyFilters(){
    let date = this.form.value
    this.service.getCarts(date).subscribe((res: any) => {
      this.carts = res;
    })
  }

  deleteCart(id:any){
    this.service.deleteThecart(id).subscribe(res =>{
      this.getAllcarts();
      alert("the cart has been deleted successfully")
    })
  }

  viewDetails(index: number) {
    this.products = []; // Clear the products array before populating it with new data
    this.details = this.carts[index]; // Get the cart details
    // Iterate over each product in the cart and fetch its details
    for (let product of this.details.products) {
        // Fetch the product details from the service
        this.productsService.getProductbyid(product.productId).subscribe(res => {
            // Push the product details along with its quantity to the products array
            this.products.push({ item: res, quantity: product.quantity });
        });
    }
    console.log(this.details);
}

}


















  // total:any;
  // itemsNumber:any;
  // loading:boolean = false;
  // success:boolean = true;
  // ShowCongrats:boolean = false;




  // getCartsproducts(){
  //   if("cart" in localStorage){
  //     this.cartproducts=JSON.parse(localStorage.getItem("cart")!);
  //     console.log(this.cartproducts);
  //   }
  //   this.getTotalprice();
  //   this.getItemsnumber();
  //   this.addCart();
  // }

  // getTotalprice(){
  //   this.total=0;
  //   for(let x in this.cartproducts){
  //     this.total += this.cartproducts[x].item.price * this.cartproducts[x].quantity;
  //   }
  // }

  // getItemsnumber(){
  //   this.itemsNumber = this.cartproducts.length;
  // }

  // clearShoppingcart(){
  //   this.cartproducts = [];
  //   this.total= 0;
  //   this.itemsNumber = 0;
  //   this.addCart();
  //   localStorage.removeItem('cart');
  // }

  // deleteItemfromtheCart(index: number){
  //   this.cartproducts.splice(index, 1);
  //   this.getTotalprice();
  //   this.getItemsnumber();
  //   this.addCart();
  //   localStorage.setItem('cart', JSON.stringify(this.cartproducts));
  // } 

  // addCart(){
  //   let products = this.cartproducts.map(item =>{
  //     return {productId:item.item.id, quantity:item.quantity};
  //   });
  //   let Model ={
  //     userId: 5,
  //     date: new Date(),
  //     products:products
  //   };
  //   console.log(Model);
  // }

  // postCart(){
  //   this.service.createNewcart(model).subscribe(res=>{
  //   this.success =true;
  // })
  // }

  // placeOrder(){
  //   this.ShowCongrats = true;
  // }