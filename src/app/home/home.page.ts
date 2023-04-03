import { Component } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  subscription: any;
  locationCoords: any;
  apiResponse: any;

  latitude: any = 0;
  longitude: any = 0;


  constructor(private diagnostic: Diagnostic, private geolocation: Geolocation, private alertController: AlertController, public plt: Platform, private androidPermissions: AndroidPermissions, private locationAccuracy: LocationAccuracy,



  ) {
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
  }

  async checkLocationEnabled() {
    return new Promise((resolve, reject) => {
      this.diagnostic.isLocationEnabled().then((isEnabled) => {
        console.log(isEnabled);
        if (isEnabled === false) {
          this.showToast('Please turn on Location Service');
          resolve(false);
        } else if (isEnabled === true) {
          this.checkGPSPermission().then((response) => {
            console.log('checkGPSPermission-checkLocationEnabled');
            this.apiResponse = response;
            if (this.apiResponse === false) {
              reject(false);
            } else {
              resolve(this.apiResponse);
            }
          })
            .catch((e) => {
              console.log('checkGPSPermission-checkLocationEnabled');
              reject(false);
            });
        }
      })
        .catch((e) => {
          this.showToast('Please turn on Location');
          reject(false);
        });
    });
  }
  showToast(arg0: string) {
    throw new Error('Method not implemented.');
  }
  //Check if application having GPS access permission
  async checkGPSPermission() {
    return new Promise((resolve, reject) => {
      const data = this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
        (result: { hasPermission: any; }) => {
          console.log(result.hasPermission);
          if (result.hasPermission) {
            console.log('hasPermission-YES');
            //If having permission show 'Turn On GPS' dialogue
            this.askToTurnOnGPS().then((response) => {
              console.log('askToTurnOnGPS-checkGPSPermission');
              if (this.apiResponse === false) {
                reject(this.apiResponse);
              } else {
                resolve(this.apiResponse);
              }
            });
          } else {
            console.log('hasPermission-NO');
            //If not having permission ask for permission
            this.requestGPSPermission().then((response) => {
              console.log('requestGPSPermission-checkGPSPermission');
              this.apiResponse = response;
              if (this.apiResponse === false) {
                reject(this.apiResponse);
              } else {
                resolve(this.apiResponse);
              }
            });
          }
        },
        (err: any) => {
          alert(err);//aler error
          reject(false);
        });
    });
  }
  async requestGPSPermission() {
    return new Promise((resolve, reject) => {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          console.log("4");
        } else {
          //Show 'GPS Permission Request' dialogue
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(() => {
            // call method to turn on GPS
            this.askToTurnOnGPS().then((response) => {
              console.log('SwitchTOSetting-requestGPSPermission');
              this.apiResponse = response;
              if (this.apiResponse === false) {
                reject(this.apiResponse);
              } else {
                resolve(this.apiResponse);
              }
            });
          },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error);
              reject(false);
            });
        }
      });
    });
  }
  async askToTurnOnGPS() {
    return new Promise((resolve, reject) => {
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((resp) => {
        console.log('location accuracy');
        // When GPS Turned ON call method to get Accurate location coordinates
        if (resp['code'] === 0) {
          resolve(this.apiResponse);
          this.getLocationCoordinates().then((cords) => {
            console.log(cords, 'coords');
            this.apiResponse = cords;
            if (this.apiResponse === false) {
              reject(false);
            } else {
              resolve(this.apiResponse);
            }
          });
        }
        (error: any) => {
          alert('Error requesting location permissions');
          reject(false);
        }
      });
    });
  }
  async getLocationCoordinates() {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.locationCoords.latitude = resp.coords.latitude;
        this.locationCoords.longitude = resp.coords.longitude;
        this.locationCoords.accuracy = resp.coords.accuracy;
        this.locationCoords.timestamp = resp.timestamp;
        console.log('get locc');
        resolve(this.locationCoords);
      }).catch((error) => {
        //console.log('error getting location');
        this.alert();
        reject(false);
      });
    });
  }
  async alert() {
    console.log('alert() called');
    const alert = await this.alertController.create({
      header: 'Location permission required',
      message: 'Please grant location permission access in app settings to use this feature',
      buttons: [
        {
          text: 'Ok',
          role: 'Ok'
        },
        {
          text: 'Go to setting',
          handler: () => {
            this.diagnostic.switchToSettings()
          }
        },
      ]
    });
    await alert.present();
  }

  ngOnInit() {
    return new Promise((resolve) => {
      this.plt.ready().then((readySource) => {
        console.log('Platform ready from', readySource);
        this.checkGPSPermission();
      });
    })
  }

  // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
  //   result => {
  //     if (result.hasPermission) {
  //       // Location permission is granted
  //       this.locationAccuracy.canRequest().then((canRequest: boolean) => {
  //         if (canRequest) {
  //           // Request location accuracy
  //           this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
  //             () => {
  //               // Location is turned on
  //             },
  //             error => console.log('Error requesting location accuracy: ' + JSON.stringify(error))
  //           );
  //         }
  //       });
  //     } else {
  //       // Location permission is not granted, request it
  //       this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
  //         () => {
  //           // Permission granted, request location accuracy
  //           this.locationAccuracy.canRequest().then((canRequest: boolean) => {
  //             if (canRequest) {
  //               this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
  //                 () => {
  //                   // Location is turned on
  //                 },
  //                 error => console.log('Error requesting location accuracy: ' + JSON.stringify(error))
  //               );
  //             }
  //           });
  //         },
  //         error => console.log('Error requesting location permission: ' + JSON.stringify(error))
  //       );
  //     }
  //   },
  //   error => console.log('Error checking location permission: ' + JSON.stringify(error))
  // );


}
