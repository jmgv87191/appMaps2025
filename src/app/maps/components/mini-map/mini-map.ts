import {  AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; 
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxkey



@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
  styleUrl: './mini-map.css'
})
export class MiniMap implements AfterViewInit  {

  async ngAfterViewInit() {

    if( !this.divElement()?.nativeElement ) return;

    await new Promise((resolve)=> setTimeout(resolve, 1000))


    const element = this.divElement()!.nativeElement

    const map = new mapboxgl.Map({
      container: element, 
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [-74.5, 40], 
      zoom: 8, 
    });

      const mapboxMarker = new mapboxgl.Marker({
        draggable:false,
      }).setLngLat( [-74.5, 40] ).addTo( map )
    
  }

  divElement = viewChild<ElementRef>('map')


}
