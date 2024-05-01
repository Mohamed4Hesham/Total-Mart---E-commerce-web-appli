import { Component, EventEmitter, Input, OnInit, Output, input, output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit {
  @Input() title:string ='';
  @Input() data:any[] =[];
  @Input() select =''
  @Output() selectedValue = new EventEmitter()
  constructor(){} 

  ngOnInit(): void {  
  }

  detectChanges(event:any){
    this.selectedValue.emit(event)
  } 

}
