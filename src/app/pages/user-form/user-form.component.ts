import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiUsersService } from '../../services/api-users/api-users.service';
import { IUserDto } from '../../interfaces/iuser.interface';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private usersService = inject(ApiUsersService);

  isEdit = false;
  submitting = false;
  user: IUserDto = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
  };

  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [''], // requerido sólo en alta
    image: [''] // si decides incluir URL de imagen en el form
  });

  ngOnInit() {

    const id = this.getUserIdFromUrl();
    console.log("UserForm id:", id);
    this.isEdit = !!id;
    if (this.isEdit && id) {
      this.loadUser(id);
    } else {
      this.form.get('password')?.addValidators(Validators.required);
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
      if (this.user) {
        this.isEdit = true;
        this.form.patchValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          username: this.user.username,
          email: this.user.email,
          image: this.user.image
        });
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  invalid(ctrl: string) {
    const c = this.form.get(ctrl);
    return c && c.invalid && (c.dirty || c.touched);
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.submitting = true;

    const id = this.route.snapshot.paramMap.get('id');

    if (!(this.isEdit && id) ) {
      try{
        //const { password, ...dto } = this.form.value as any; // password no se envía en edición

        const createdUser = await
        this.usersService.createUser(this.form.value as any);
        console.log('Created User:', createdUser);


      } catch (error) {
        console.error('Error creating user:', error);
      }
    } else {
      try{
       const updateUser = await this.usersService.updateUser(id, this.form.value as any);
       console.log('updatedUser', updateUser);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }
}
