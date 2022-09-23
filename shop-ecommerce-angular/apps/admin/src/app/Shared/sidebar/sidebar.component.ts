import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shop-ecommerce-angular/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.AuthService.Logout();
  }
}
