import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { Alert, Linking, Platform } from "react-native";

import Util from "../util";

let location = {
  latitude: 21.5,
  longitude: 39.17,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121
};

class LocationHelper {
  getLocation() {
    return location;
  }

  getLocationAndDelta() {
    return {
      ...location,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
  }

  getProvidedLocationWithDelta = providedLocation => {
    return {
      ...providedLocation,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
  };

  setLocation(locationCoords) {
    location = {
      ...locationCoords
    };
  }

  updateLocation(callback, errorCallBack) {
    if (Util.isPlatformAndroid()) {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<h2>Use Location ?</h2>Carhub wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
        preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
        providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
      })
        .then(
          function(success) {
            this.getLocationGeneral(callback, errorCallBack);
          }.bind(this)
        )
        .catch(error => {
          console.log(error.message);
        });
    } else {
      this.getLocationGeneral(callback, errorCallBack);
    }
  }

  getLocationGeneral = (callback, errorCallBack) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        this.setLocation(location);

        if (callback) {
          callback(location);
        }

        navigator.geolocation.stopObserving();
      },
      error => {
        if (errorCallBack) {
          errorCallBack();
        } else {
          this.onLocationFailure();
        }
      },
      {
        enableHighAccuracy: Platform.OS != "android",
        timeout: 2000,
        maximumAge: 2000
      }
    );
  };

  onLocationFailure = () => {
    Util.showSettingsPopup(
      "Alert",
      "Mangwalo requires current location, please enable location to continue"
    );
  };

  stopListener() {
    LocationServicesDialogBox.stopListener();
  }

  calculateDistance(lat2, lon2) {
    const { latitude: lat1, longitude: lon1 } = location;

    if (!lat1 || !lon1 || !lat2 || !lon2) {
      return "-";
    }

    const R = 6371;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = Math.round(R * c);

    return `${d} km`;
  }

  openGoogleMapsApplication = (lat, lng, label = "") => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    const latLng = `${lat},${lng}`;

    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };
}

export default new LocationHelper();
