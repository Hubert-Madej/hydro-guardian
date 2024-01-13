import { Component, Input, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.scss'],
})
export class AppMapComponent implements OnInit {
  @Input() latitude: number;
  @Input() longitude: number;

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];

  get mapOptions() {
    return {
      layers: [
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }),
      ],
      zoom: 16,
      center: { lat: this.latitude, lng: this.longitude },
    };
  }

  ngOnInit() {
    this.updateMarkers();
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.updateMarkers();
  }

  private updateMarkers() {
    this.markers.forEach((marker) => marker.removeFrom(this.map));
    this.markers = [];

    const marker = Leaflet.marker([this.latitude, this.longitude]).bindPopup(`<b>Asset Location</b>`).addTo(this.map);

    this.markers.push(marker);
  }
}
