import { Component, OnInit, Input} from '@angular/core';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  title ='Hello Angular';
  new_item = "";
  constructor(private ss: ShareService) {}
  
  ngOnInit() {
  }

  add(){
    this.list.push(this.new_item);
    this.new_item = "";
  }

  get count_items(){
    return this.list.length;
  }

  remove(index){
    this.list.splice(index, 1);
  }

  get list(){
    return this.ss.list;
  }

}
