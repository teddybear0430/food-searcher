import { useState, useEffect } from 'react';
import { useStaticLatAndLng } from '~/stores/useStaticLatAndLng';

/**
 * 位置情報の習得とGeolocation APIが有効になっているかをチェックする処理をまとめたフック
 * */
export const useGeolocated = () => {
  const [isAvailable, setAvailable] = useState(false);
  const [_, setPosition] = useStaticLatAndLng();

  useEffect(() => {
    if ('geolocation' in navigator) {
      setAvailable(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setPosition({
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => {
          setAvailable(false);

          if (error && !isAvailable) {
            window.alert('位置情報が有効になっていません');
          }
        }
      );
    } else {
      setAvailable(false);
    }
  }, [isAvailable, setPosition]);

  return {
    isAvailable,
  };
};
