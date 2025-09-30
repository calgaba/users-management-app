import { Component, Input, inject } from '@angular/core';
import { ApiUsersService } from '../../../services/api-users/api-users.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  private usersSrv = inject(ApiUsersService);
  private router = inject (Router);

  @Input() userId!: string;
  @Input() userName = '';

  open() {
    toast(`¿Desea borrar a ${this.userName || 'este usuario'}?`, {
      description: 'Esta acción no se puede deshacer.',
      action: {
        label: 'Eliminar',
        onClick: async () => {
          try {
            const res = await this.usersSrv.deleteUser(this.userId);
            const nameDeleted = `${res.first_name} ${res.last_name}`;
            toast.success(`Usuario ${nameDeleted} eliminado correctamente`);
            this.router.navigateByUrl('/home');

          } catch {
            toast.error('Error al eliminar usuario');
          }
        }
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          console.log('Cancelando borrado');
        }
      },
      duration: Number.POSITIVE_INFINITY
    });
  }
}
