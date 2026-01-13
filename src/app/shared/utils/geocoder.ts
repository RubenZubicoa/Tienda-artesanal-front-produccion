/**
 * Obtiene las coordenadas (latitud y longitud) de una dirección o ciudad usando Google Maps Geocoding API
 * @param address - Dirección o nombre de la ciudad (ej: "Madrid, España" o "New York, USA")
 * @returns Promise con las coordenadas { lat: number, lng: number } o null si no se encuentra
 */
export function getLocationFromAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve, reject) => {
    if (typeof google === 'undefined' || !google.maps) {
      reject(new Error('Google Maps API no está cargada'));
      return;
    }

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        const coordinates = {
          lat: location.lat(),
          lng: location.lng()
        };
        resolve(coordinates);
      } else {
        console.error(`Error al geocodificar "${address}":`, status);
        resolve(null);
      }
    });
  });
}

/**
 * Obtiene información detallada de una dirección o ciudad usando Google Maps Geocoding API
 * @param address - Dirección o nombre de la ciudad
 * @returns Promise con información detallada del resultado de geocodificación
 */
export function getLocationDetailsFromAddress(address: string): Promise<{
  coordinates: { lat: number; lng: number };
  formattedAddress: string;
  placeId: string;
  types: string[];
} | null> {
  return new Promise((resolve, reject) => {
    if (typeof google === 'undefined' || !google.maps) {
      reject(new Error('Google Maps API no está cargada'));
      return;
    }

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const result = results[0];
        const location = result.geometry.location;
        const details = {
          coordinates: {
            lat: location.lat(),
            lng: location.lng()
          },
          formattedAddress: result.formatted_address,
          placeId: result.place_id,
          types: result.types
        };
        resolve(details);
      } else {
        console.error(`Error al geocodificar "${address}":`, status);
        resolve(null);
      }
    });
  });
}