import { Component, inject, Injectable } from '@angular/core';
import { IUser, IUserDto, IUsersPage } from '../../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api-users',
  imports: [],
  templateUrl: './api-users.service.html',
  styleUrl: './api-users.service.css'
})

@Injectable({
  providedIn: 'root'
})

export class ApiUsersService {

  private http = inject(HttpClient);
  private urlBase: string = 'https://peticiones.online/api/users/';

  async getAllUsers(page?: number): Promise<IUsersPage> {

    let params = {};

    if (page) {
      params = { page: page.toString() };
    }
    return await firstValueFrom(this.http.get<IUsersPage>(this.urlBase, { params }));
  }

  async getUserById(id: string): Promise<IUser> {
    const urlUser = this.urlBase + id;
    return await firstValueFrom(this.http.get<IUser>(urlUser));
  }

  async createUser(user: IUserDto): Promise<IUserDto> {
    const body = { ...user };
    return await firstValueFrom(this.http.post<IUserDto>(this.urlBase, body));
  }

  async updateUser(id: string, user: IUserDto): Promise<IUser> {
    const body = { ...user };
    return await firstValueFrom(this.http.put<IUser>(this.urlBase + id, body));
  }

  async deleteUser(id: string): Promise<IUser> {
    return await firstValueFrom(this.http.delete<IUser>(this.urlBase + id));
  }

}
