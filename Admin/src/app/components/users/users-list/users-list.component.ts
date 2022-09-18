import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { ConfirmationService, MessageService } from 'primeng/api';
import { getUsers } from 'src/app/models/users';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: getUsers[] = [];

  constructor(
    private UsersService: UsersService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    // private router: Router
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(){
    this.UsersService.getUsers().subscribe( user => {
      this.users = user.data;
      const usersData = [];
      for(let element of this.users){
        let object = {
          _id: element._id,
          firstname: element.firstname,
          lastname: element.lastname,
          avatar: element.avatar,
          email: element.email,
          login: element.login,
          details: [
            {
              _id: element._id,
              roles: element.roles,
              enable: element.enable,
              provider: element.provider,
              age: element.age,
              createdAt: element.createdAt,
              updatedAt: element.updatedAt
            }
          ]
        }
        usersData.push(object);
      }
      this.users = usersData;
    })
  };

  onDelete(id: string,){
    this.confirmationService.confirm({
      message: 'Are you sure that you want delete this User?',
      accept: () => {
        return this.UsersService.deleteUser(id).subscribe(response => {
          if(response.hasOwnProperty('data')){
            this.getUsers();
            this.messageService.add({
              severity:'success', 
              summary:'Success', 
              detail:'User is deleted'
            });
          }
        });
      },
      reject: () => {
        this.messageService.add({
          severity:'warn', 
          summary:'Warning', 
          detail:'User is not deleted'
        });
      } 
    });
  }
  onEdit(id: string){
    // return this.router.navigateByUrl(`categories/form/${id}`)
  }

  onChange(id: string){
    return this.UsersService.enableUser(id).subscribe();
  };

}
