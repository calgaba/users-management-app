import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ApiUsersService } from '../../services/api-users/api-users.service';
import { DeleteModalComponent } from "../../shared/component/delete-modal/delete-modal.component";

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink, DeleteModalComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  user: IUser = {
    id: 0,
    _id: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    image: ''
  };
  usersService = inject(ApiUsersService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.getUserIdFromUrl();
    if (id) {
      this.loadUser(id);
    }
  }

  // TODO poner en Utils
  getUserIdFromUrl(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  async loadUser(id: string) {
    try {
      this.user = await this.usersService.getUserById(id);
      console.log("GetUser:", this.user);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }



}
