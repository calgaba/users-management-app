import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiUsersService } from '../../services/api-users/api-users.service';
import { IUserDto } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
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
    image: ['', [Validators.required]]
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

  mandatory(ctrl: string) {
    const controlValue = this.form.get(ctrl);
    return controlValue && controlValue.invalid && (controlValue.dirty || controlValue.touched)
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.submitting = true;

    const id = this.route.snapshot.paramMap.get('id');

    if (!(this.isEdit && id) ) {
      try {
        const createdUser = await
        this.usersService.createUser(this.form.value as any);
        toast.success(`Usuario ${createdUser.first_name} ${createdUser.last_name} creado correctamente`);
        this.form.reset();
      } catch (error) {
        toast.error('Error al crear usuario');
      }
    } else {
      try{
        const updateUser = await this.usersService.updateUser(id, this.form.value as any);
        toast.success(`Usuario ${updateUser.first_name} ${updateUser.last_name} actualizado correctamente`);

      } catch (error) {
        toast.error('Error al actualizar usuario');
      }
    }
    this.router.navigate(['/home']);
  }
}
