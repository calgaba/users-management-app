import { Component, Input} from '@angular/core';
import { IUser } from '../../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { DeleteModalComponent } from "../delete-modal/delete-modal.component";

@Component({
  selector: 'app-user-card',
  imports: [RouterLink, DeleteModalComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() user!: IUser ;

}
