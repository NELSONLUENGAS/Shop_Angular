import { Component, OnInit } from '@angular/core';
import { getUsers } from '../../models/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '@shop-ecommerce-angular/users';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: getUsers[] = [];

  constructor(
    private UsersService: UserService, 
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
      for(const element of this.users){
        const object = {
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
          if(response?.data){
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
    console.log(id);
    // return this.router.navigateByUrl(`categories/form/${id}`)
  }

  onChange(id: string){
    return this.UsersService.enableUser(id).subscribe();
  };

}
