import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public data: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Aquí puedes cargar datos de una API o un servicio
    this.data = [
      { name: 'Ventas', value: 1500 },
      { name: 'Ingresos', value: 2500 },
      { name: 'Clientes', value: 750 }
      // Agrega más datos según sea necesario
    ];
  }
}