import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../core/services/usuario.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  birthdayUsers: any[] = [];
  showNotifications: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getBirthdayUsers().subscribe(
      users => {
        this.birthdayUsers = users;
      },
      error => {
        console.error('Error al obtener los usuarios de cumpleaños:', error);
      }
    );
  }

  toggleNotificationMobile(): void {
    this.showNotifications = !this.showNotifications;
  }
}
