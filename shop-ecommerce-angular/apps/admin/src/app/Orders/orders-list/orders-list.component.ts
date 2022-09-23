import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '@shop-ecommerce-angular/orders';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  orders: any[] = [];
  Order_Status: any;

  constructor(
    private OrdersService: OrderService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { 
      
    }

  ngOnInit(): void {
    this.getCategories();

    this.Order_Status = {
      PENDING: {
        label: 'PENDING',
        color: 'primary'
      },
      PROCESSED: {
        label: 'PROCESSED',
        color: 'warning'
      },
      SHIPPED: {
        label: 'SHIPPED',
        color: 'warning'
      },
      DELIVERED: {
        label: 'DELIVERED',
        color: 'success'
      },
      FAILED: {
        label: 'FAILED',
        color: 'danger'
      },
    }
  }

  private getCategories(){
    this.OrdersService.getOrders().subscribe( order => {
      console.log(order)
      this.orders = order;
    })
  };

  onDelete(id: string,){
    this.confirmationService.confirm({
      message: 'Are you sure that you want delete this Order?',
      accept: () => {
        return this.OrdersService.deleteOrder(id).subscribe(response => {
          if(response?.data){
            this.getCategories();
            this.messageService.add({
              severity:'success', 
              summary:'Success', 
              detail:'Order is deleted'
            });
          }
        });
      },
      reject: () => {
        this.messageService.add({
          severity:'warn', 
          summary:'Warning', 
          detail:'Order is not deleted'
        });
      }
    });
  }
  onEdit(id: string){
    console.log(id);
    // return this.router.navigateByUrl(`categories/form/${id}`)
  }

}
