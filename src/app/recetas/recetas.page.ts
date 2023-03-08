import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {
  map: L.Map;
  
  constructor() { }

  ngOnInit() { }

  ionViewDidEnter() {
    console.log('OnviewDidEnter');
    this.loadMap();
  }

  loadMap() {
    console.log('loadMap');

    let latitud = 36.934583;
    let longitud = -5.500740;
    let zoom = 17;
    this.map = L.map('mapId').setView([latitud, longitud], zoom);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(this.map);

    L.circle([36.935587, -5.498785], {color: 'green',radius: 10,}).addTo(this.map);
    var marker = L.marker([36.935587, -5.498785]).addTo(this.map);marker.bindPopup('Recoja aqui su pedido').openPopup();}}
