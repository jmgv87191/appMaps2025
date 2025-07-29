import {  AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
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

  divElement = viewChild<ElementRef>('map')
  lngLat = input.required< { lng:number, lat: number } >()
  zoom = input<number>(14);

  async ngAfterViewInit() {

    if( !this.divElement()?.nativeElement ) return;

    await new Promise((resolve)=> setTimeout(resolve, 1000))


    const element = this.divElement()!.nativeElement

    const map = new mapboxgl.Map({
      container: element, 
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: this.lngLat(), 
      zoom: this.zoom(),
      interactive:false
    });

      const mapboxMarker = new mapboxgl.Marker({
        draggable:false,
      }).setLngLat( this.lngLat()).addTo( map )
    
  }



}
