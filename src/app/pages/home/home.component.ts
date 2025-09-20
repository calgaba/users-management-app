import { Component, inject } from '@angular/core';
import { ApiUsersService } from '../../services/api-users/api-users.service';
import { IUser, IUsersPage } from '../../interfaces/iuser.interface';
import { UserCardComponent } from "../../shared/component/user-card/user-card.component";
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
      console.log("loadUsersPage", pageNumber);
      this.usersResponse= await this.usersService.getAllUsers(pageNumber);
      this.usersList = this.usersResponse.results;
      console.log("Users", this.usersResponse);

      // const user = await this.usersService.getUserById('63740fede2c75d8744f80a49');
      // console.log("GetUser:",user);

      // const newUser = { userName: 'newUser', password: 'password123',
      //   firstName: 'New', lastName: 'User', email: 'correo@email.com' };
      // const createdUser = await this.usersService.createUser(newUser);
      // console.log('Created User:', createdUser);

      // const updatedUser = { userName: 'updatedUser', password: 'newpassword123',
      // firstName: 'Updated', lastName: 'User', email: 'correo@email.com' };
      // const updateUser = await this.usersService.updateUser('63740fede2c75d8744f80a49', updatedUser);
      // console.log('updatedUser', updateUser);

      // const deleteResponse = await this.usersService.deleteUser('63740fede2c75d8744f80a49');
      // console.log('Delete Response:', deleteResponse);

    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  nextPage() {
    if(this.currentPage >= this.usersResponse.total_pages) return;

    this.currentPage += 1;
    this.loadUsers(this.currentPage);
  }

  previousPage() {
    console.log("previousPage", this.currentPage);

    if (!this.previousDisabled()) {
      this.currentPage -= 1;
      this.loadUsers(this.currentPage - 1);
    }
  }

  private previousDisabled(): boolean {
    return this.currentPage <= 1;
  }
}
