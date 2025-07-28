import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl'; 
import { environment } from '../../../environments/environment';
mapboxgl.accessToken = environment.mapboxkey
import { v4 as UUIDv4 } from 'uuid'
import { JsonPipe } from '@angular/common';
import { filter } from 'rxjs';

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}


@Component({
  selector: 'app-markers-page',
  imports: [ JsonPipe ],
  templateUrl: './markers-page.html',
  styleUrl: './markers-page.css'
})
export class MarkersPage implements AfterViewInit {

  divElement = viewChild<ElementRef>('map')
  map = signal<mapboxgl.Map | null>(null) 
  markers = signal <Marker[]> ([] )





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

      const mapboxMarker = new mapboxgl.Marker({
        draggable:false, color:color
      }).setLngLat( coords ).addTo( map )
    
      const newMarker: Marker ={
        id: UUIDv4(),
        mapboxMarker: mapboxMarker
      }

      // this.markers.set( [newMarkerm, ...this.markers()] )
      this.markers.update( (markers)=>[ newMarker, ...markers ] )

      console.log(this.markers())

  }

  flyToMarker( lngLat: LngLatLike ){
    if (!this.map()) return;

    this.map()?.flyTo({
      center:lngLat,
    })

  }

  deleteMarker( marker: Marker ){

    if( !this.map ) return;
    const map = this.map()!;

    marker.mapboxMarker.remove()

    this.markers.set(  this.markers().filter( (m)=> m.id !== marker.id ) )

  }

}
