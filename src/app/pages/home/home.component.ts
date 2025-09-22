import { Component, inject } from '@angular/core';
import { ApiUsersService } from '../../services/api-users/api-users.service';
import { IUser, IUsersPage } from '../../interfaces/iuser.interface';
import { UserCardComponent } from "../../shared/component/user-card/user-card.component";
import { toast } from 'ngx-sonner';
@Component({
  selector: 'app-home',
  imports: [ UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usersService = inject(ApiUsersService);
  usersResponse!: IUsersPage;
  usersList: IUser[] = [];
  currentPage: number = 1;

  ngOnInit(): void {
    this.loadUsers(this.currentPage);


  }

  async loadUsers(pageNumber?: number) {
    try{
      this.usersResponse= await this.usersService.getAllUsers(pageNumber);
      this.usersList = this.usersResponse.results;


    } catch (error) {
      toast.error('Error loading users');
    }
  }

  nextPage() {
    if(this.currentPage >= this.usersResponse.total_pages) return;

    this.currentPage += 1;
    this.loadUsers(this.currentPage);
  }

  previousPage() {
    if (!this.previousDisabled()) {
      this.currentPage -= 1;
      this.loadUsers(this.currentPage - 1);
    }
  }

  private previousDisabled(): boolean {
    return this.currentPage <= 1;
  }
}
