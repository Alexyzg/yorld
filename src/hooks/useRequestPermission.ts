import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const permission =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

export const checkPermission = async () => {
  return await check(permission);
};

export const requestLocationPermission = async () => {
  let permissionStatus = await checkPermission();
  if (permissionStatus === RESULTS.DENIED) {
    try {
      permissionStatus = await request(permission);
    } catch (e) {
      console.log(e);
    }
  }
  return permissionStatus === RESULTS.GRANTED;
};
