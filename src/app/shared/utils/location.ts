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
        console.log('Ubicación actual obtenida:', coordinates);
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

