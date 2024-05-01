import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  @Input() data:any ={}
  @Output() item = new EventEmitter();
  addButton:boolean = false;
  amount:number = 0;

  constructor(private router: Router){
  }

  ngOnInit(): void {
    
  }
  add(){
    this.item.emit({item: this.data , quantity: this.amount})
  }
  navigateToDetails(id:number){
    this.router.navigate(['/details',id]);
  }
}
