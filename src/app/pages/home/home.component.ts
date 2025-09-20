import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiUsersService } from '../../services/api-users/api-users.service';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usersService = inject(ApiUsersService);

  ngOnInit(): void {
    this.loadUsers(2);


  }

  async loadUsers(pageNumber?: number) {
    try{
      const users = await this.usersService.getAllUsers(pageNumber);
      console.log("Users", users);

      const user = await this.usersService.getUserById('63740fede2c75d8744f80a49');
      console.log("GetUser:",user);

      const newUser = { userName: 'newUser', password: 'password123',
        firstName: 'New', lastName: 'User', email: 'correo@email.com' };
      const createdUser = await this.usersService.createUser(newUser);
      console.log('Created User:', createdUser);

      const updatedUser = { userName: 'updatedUser', password: 'newpassword123',
      firstName: 'Updated', lastName: 'User', email: 'correo@email.com' };
      const updateUser = await this.usersService.updateUser('63740fede2c75d8744f80a49', updatedUser);
      console.log('updatedUser', updateUser);

      const deleteResponse = await this.usersService.deleteUser('63740fede2c75d8744f80a49');
      console.log('Delete Response:', deleteResponse);

    } catch (error) {
      console.error('Error loading users:', error);
    }
  }
}
