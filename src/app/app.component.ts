import { Component } from '@angular/core';
import { Geolocation ,GeolocationOptions, Geoposition, PositionError} from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import  { Diagnostic } from '@ionic-native/diagnostic/ngx'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';






@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private geolocation: Geolocation, 
    private alertController: AlertController, 
    private platform: Platform,
    private diagnostic: Diagnostic,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy


    ) { 
     // this.initializeApp(); 
    }


    // checkLocationPermission(){
    //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
    //     result => {
    //       if (result.hasPermission) {
    //         // Location permission is granted
    //         this.locationAccuracy.canRequest().then((canRequest: boolean) => {
    //           if (canRequest) {
    //             // Request location accuracy
    //             this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    //               () => {
    //                 // Location is turned on
    //               },
    //               error => console.log('Error requesting location accuracy: ' + JSON.stringify(error))
    //             );
    //           }
    //         });
    //       } else {
    //         // Location permission is not granted, request it
    //         this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
    //           () => {
    //             // Permission granted, request location accuracy
    //             this.locationAccuracy.canRequest().then((canRequest: boolean) => {
    //               if (canRequest) {
    //                 this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    //                   () => {
    //                     // Location is turned on
    //                   },
    //                   error => console.log('Error requesting location accuracy: ' + JSON.stringify(error))
    //                 );
    //               }
    //             });
    //           },
    //           error => console.log('Error requesting location permission: ' + JSON.stringify(error))
    //         );
    //       }
    //     },
    //     error => console.log('Error checking location permission: ' + JSON.stringify(error))
    //   );
    // }

    // ngOnInit() {
    //   this.checkLocationPermission()
    // }
    //requestruntimepermission
  //ye portion uncomment karna hai 
  // initializeApp() {
  //     this.platform.ready().then(() => {
  //       this.diagnostic.requestRuntimePermission((status:any) =>{
  //         switch(status){
  //           case this.diagnostic.permissionStatus.GRANTED:
  //               console.log("Permission granted to use the permission for app");
  //               this.checkLocationEnabled();
  //               break;
  //           case this.diagnostic.permissionStatus.NOT_REQUESTED:
  //               console.log("Permission to use the camera has not been requested yet");
  //               break;
  //           case this.diagnostic.permissionStatus.DENIED_ONCE:
  //               console.log("Permission denied to use the location for app - ask again?");
  //               this.showRetryAlert();
  //               break;
  //           case this.diagnostic.permissionStatus.DENIED_ALWAYS:
  //               console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
  //               break;
  //         }
  //       })
        
        // this.geolocation.getCurrentPosition().then((resp) => {
        //   console.log(resp);
        // }).catch((error) => {
        //   console.log('Error getting location', error);
        //   if (error.code === 1) { // Permission denied
        //     this.showRetryAlert();
        //   }
        // });
      // });
      
  //}

  // permissionApp(){
  //   this.diagnostic.requestRuntimePermission((status:any) =>{
  //     switch(status){
  //       case this.diagnostic.permissionStatus.GRANTED:
  //           console.log("Permission granted to use the permission for app");
  //           this.checkLocationEnabled();
  //           break;
  //       case this.diagnostic.permissionStatus.NOT_REQUESTED:
  //           console.log("Permission to use the camera has not been requested yet");
  //           break;
  //       case this.diagnostic.permissionStatus.DENIED_ONCE:
  //           console.log("Permission denied to use the location for app - ask again?");
  //           this.showRetryAlert();
  //           break;
  //       case this.diagnostic.permissionStatus.DENIED_ALWAYS:
  //           console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
  //           break;
  //     }
  //   })
  // }
  // async showRetryAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Location Permission',
  //     message: 'Please enable location access to use this app.',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Permission denied');
  //         }
  //       },
  //       {
  //         text: 'Retry',
  //         handler: () => {
  //           console.log('Retrying location permission');
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
  
  // checkLocationEnabled() {
  //   this.diagnostic.isLocationEnabled().then((enabled) => {
  //     if (!enabled) {
  //       this.showLocationServicesAlert();  
  //     } else {
  //       console.log('already have permission')
  //     }
  //   }).catch((error) => {
  //     console.log('Error checking location', error);
  //   });
  // }
  
  // async showLocationServicesAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Location Services Required',
  //     message: 'Please enable location services to use this app.',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Location services denied');
  //         }
  //       },
  //       {
  //         text: 'Enable',
  //         handler: () => {
  //           console.log('Enabling location services');
  //           this.diagnostic.switchToLocationSettings();
  //           //this.checkLocationEnabled();
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
  // async showRetryAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Location Permission',
  //     message: 'Please enable location access to use this app.',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Permission denied');
  //         }
  //       },
  //       {
  //         text: 'Retry',
  //         handler: () => {
  //           console.log('Retrying location permission');
  //           this.geolocation.getCurrentPosition().then((resp) => {
  //             console.log(resp);
  //           }).catch((error) => {
  //             console.log('Error getting location', error);
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
  // async showRetryAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Location Permission',
  //     message: 'Please enable location access to use this app.',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Permission denied');
  //         }
  //       },
  //       {
  //         text: 'Retry',
  //          handler: () => {
  //           console.log('Retrying location permission');
  //           this.diagnostic.isLocationEnabled().then(async (enabled) => {
  //              if (!enabled) {
  //               const alert = await this.alertController.create({
  //                 header: 'Location Required',
  //                 message: 'Please enable location services to use this app',
  //                 buttons: [
  //                   {
  //                     text: 'Cancel',
  //                     role: 'cancel',
  //                     handler: () => {
  //                       console.log('Location request cancelled by user');
  //                     },
  //                   },
  //                   {
  //                     text: 'Settings',
  //                     handler: () => {
  //                       console.log('Opening location settings');
  //                       this.diagnostic.switchToLocationSettings();
  //                     },
  //                   },
  //                 ],
  //               });
  //              alert.present();
  //             } else {
  //               console.log('Location is already enabled');
  //               this.geolocation.getCurrentPosition().then((resp) => {
  //                 console.log(resp);
  //               }).catch((error) => {
  //                 console.log('Error getting location', error);
  //               });
  //             }
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

}

