/**
 * Obtiene la ubicación actual del usuario en coordenadas (latitud y longitud)
 * @param options - Opciones opcionales para la geolocalización (timeout, enableHighAccuracy, maximumAge)
 * @returns Promise con las coordenadas { lat: number, lng: number } o null si hay error o el usuario deniega el permiso
 */
export function getCurrentLocation(options?: PositionOptions): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.error('Geolocalización no está soportada por este navegador');
      resolve(null);
      return;
    }

    const defaultOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      ...options
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        resolve(coordinates);
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error.message);
        resolve(null);
      },
      defaultOptions
    );
  });
}

/**
 * Calcula la distancia entre dos coordenadas geográficas usando la fórmula de Haversine
 * @param coord1 - Primera coordenada { lat: number, lng: number }
 * @param coord2 - Segunda coordenada { lat: number, lng: number }
 * @param unit - Unidad de medida: 'km' (kilómetros) o 'm' (metros). Por defecto 'km'
 * @returns Distancia entre las dos coordenadas en la unidad especificada
 */
export function getDistanceBetweenCoordinates(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number },
  unit: 'km' | 'm' = 'km'
): number {
  console.log('coord1', coord1);
  console.log('coord2', coord2);
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en kilómetros

  return unit === 'm' ? distance * 1000 : distance;
}

/**
 * Convierte grados a radianes
 * @param degrees - Grados a convertir
 * @returns Valor en radianes
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

