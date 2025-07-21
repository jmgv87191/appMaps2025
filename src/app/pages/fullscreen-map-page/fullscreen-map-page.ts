import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { DecimalPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxkey

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [ DecimalPipe ],
  templateUrl: './fullscreen-map-page.html',
  styleUrl: './fullscreen-map-page.css'
})
export class FullscreenMapPage implements AfterViewInit {

  divElement = viewChild<ElementRef>('map')
  map = signal<mapboxgl.Map | null>(null) 

  zoomEffect = effect(()=>{
    if (!this.map())return;

    this.map()?.setZoom( this.zoom() )
    // this.map()?.zoomTo( this.zoom() )

  })

  zoom = signal(14)

  async ngAfterViewInit() {

    if( !this.divElement()?.nativeElement ) return;

    await new Promise((resolve)=> setTimeout(resolve, 1000))


    const element = this.divElement()!.nativeElement
    console.log('element')

    const map = new mapboxgl.Map({
    	container: element, // container ID
    	style: 'mapbox://styles/mapbox/streets-v12', // style URL
    	center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom(), 
    });

    this.mapListeners(map);
  }

  mapListeners( map: mapboxgl.Map ){
  
    map.on('zoomend',(event)=>{
      const newZoom = event.target.getZoom()
      this.zoom.set(newZoom)
    })
    this.map.set( map )
  }

}
