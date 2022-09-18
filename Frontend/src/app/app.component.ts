import { Component, OnInit } from '@angular/core';
import { UsersService } from 'projects/users/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  constructor(private usersService: UsersService){

  }
  
  ngOnInit(): void {
    this.usersService.initAppSession();
  }
}