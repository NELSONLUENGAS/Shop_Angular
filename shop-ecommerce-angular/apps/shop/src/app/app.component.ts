import { Component, OnInit } from '@angular/core';
import { UserService } from '@shop-ecommerce-angular/users';

@Component({
  selector: 'shop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private userService: UserService){}
  title = 'shop';

  ngOnInit():void{
    this.userService.initAppSession();
  }
}
