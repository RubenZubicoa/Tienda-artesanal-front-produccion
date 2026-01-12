import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapMarker } from './map.models';
import { getCurrentLocation } from '../../utils/location';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  @Input() zoom: number = 11;
  @Input() markerTitle: string = 'Ubicación';
  @Input() markers: MapMarker[] = [];
  @Input() height: string = '70vh';
  
  @Output() mapClick = new EventEmitter<{ lat: number, lng: number }>();
  @Output() markerClick = new EventEmitter<string>();

  private map: any;
  private marker: any = null;

  ngAfterViewInit(): void {
    getCurrentLocation().then(currentLocation => {
      console.log('currentLocation', currentLocation);
      this.initMap(currentLocation ?? { lat: this.latitude, lng: this.longitude });  
      this.markers.forEach(marker => {
        this.addMarker(marker);
      });
    });

  }

  ngOnDestroy(): void {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markers']) {
      getCurrentLocation().then(currentLocation => {
        console.log('currentLocation', currentLocation);
        this.initMap(currentLocation ?? { lat: this.latitude, lng: this.longitude });  
        this.markers.forEach(marker => {
          this.addMarker(marker);
        });
      });
    }
  }

  private initMap(location: { lat: number, lng: number }): void {
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps API no está cargada. Verifica que el script esté incluido en index.html');
      return;
    }

    const mapOptions = {
      center: { lat: location.lat, lng: location.lng },
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    this.map.addListener('click', (event: any) => {
      this.mapClick.emit({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    });
  }

  private addMarker(marker: MapMarker): void {
    const markerElement = new google.maps.Marker({
      position: { lat: marker.lat, lng: marker.lng },
      map: this.map,
      title: this.markerTitle,
      draggable: marker.draggable ?? false,
    });

    if (marker.isClickable) {
      markerElement.addListener('click', () => {
        this.markerClick.emit(marker.id);
      });
    }
  }

  public setCenter(lat: number, lng: number): void {
    if (this.map) {
      this.map.setCenter({ lat, lng });
    }
  }

  public setZoom(zoom: number): void {
    if (this.map) {
      this.map.setZoom(zoom);
    }
  }

  public getCurrentPosition(): { lat: number, lng: number } | null {
    if (this.marker) {
      const position = this.marker.getPosition();
      return {
        lat: position.lat(),
        lng: position.lng()
      };
    }
    return null;
  }


}
