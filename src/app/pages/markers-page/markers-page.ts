import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; 
import { environment } from '../../../environments/environment';
mapboxgl.accessToken = environment.mapboxkey

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.html',
  styleUrl: './markers-page.css'
})
export class MarkersPage implements AfterViewInit {

  divElement = viewChild<ElementRef>('map')
  map = signal<mapboxgl.Map | null>(null) 






  async ngAfterViewInit() {
    if( !this.divElement()?.nativeElement ) return;

    await new Promise((resolve)=> setTimeout(resolve, 1000))

    const element = this.divElement()!.nativeElement

    const map = new mapboxgl.Map({
      container: element, 
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [-122.409850, 37.793085], 
      zoom: 14, 
    });

/*     const marker = new mapboxgl.Marker({
      draggable:false, color:'black'
    }).setLngLat([-122.409850, 37.793085]).addTo(map)
     */







    this.mapListeners(map);
  }
  
  mapListeners(map: mapboxgl.Map){

    map.on('click',(event)=> this.mapClick(event))

    this.map.set(map)
  }
  
  mapClick( event: mapboxgl.MapMouseEvent ){

    const coords = event.lngLat
    const map =this.map()!
    const color = '#xxxxxx'.replace(/x/g, (y) =>
    (Math.random() *16 |  0).toString(16)
    )

      const marker = new mapboxgl.Marker({
      draggable:false, color:color
    }).setLngLat( coords ).addTo( map )
    

  }


}
