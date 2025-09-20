import { Component, inject, Injectable } from '@angular/core';
import { IUserDto } from '../../interfaces/iuser.interface';
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

  async getAllUsers(page?: number): Promise<IUserDto[]> {
    // Lógica para obtener todos los usuarios

    let params = {};

    if (page) {
      params = { page: page.toString() };
    }
    return await firstValueFrom(this.http.get<IUserDto[]>(this.urlBase, { params }));
  }

  async getUserById(id: string) {
    // Lógica para obtener un usuario por ID
    const urlUser = this.urlBase + id;
    return await firstValueFrom(this.http.get<IUserDto>(urlUser));
  }

  async createUser(user: IUserDto) {
    // Lógica para crear un nuevo usuario
    const body = { ...user };
    return await firstValueFrom(this.http.post(this.urlBase, body));
  }

  async updateUser(id: string, user: IUserDto) {
    // Lógica para actualizar un usuario existente
    const body = { ...user };
    return await firstValueFrom(this.http.put(this.urlBase + id, body));
  }

  async deleteUser(id: string) {
    // Lógica para eliminar un usuario
    return await firstValueFrom(this.http.delete(this.urlBase + id));
  }

}
