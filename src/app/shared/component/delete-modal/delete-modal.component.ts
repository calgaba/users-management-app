import { Component, inject, Input } from '@angular/core';
import { ApiUsersService } from '../../../services/api-users/api-users.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  private usersSrv = inject(ApiUsersService);

  @Input() userId!: string;
  @Input() userName = ''; // opcional, para mostrar en el mensaje

  /** Abre el toast de confirmación y ejecuta el delete si confirman */
  open() {
    toast(`¿Desea borrar a ${this.userName}?`, {
      description: 'Esta acción no se puede deshacer.',
      action: {
        label: 'Eliminar',
        onClick: async () => {
          try {
            const responseDel = await this.usersSrv.deleteUser(this.userId);
            const nameDeleted = responseDel.first_name + ' ' + responseDel.last_name;
            toast.success('Usuario ' + nameDeleted + ' eliminado correctamente');
          } catch (e) {
            toast.error('Error al eliminar usuario');
          }
        }

      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          //toast.info('Acción cancelada');
        }
      },
      duration: Number.POSITIVE_INFINITY
    });
  }
}
