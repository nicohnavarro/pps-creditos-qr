import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario = JSON.parse(localStorage.getItem('usuario'));

  opciones: BarcodeScannerOptions = {
    preferFrontCamera: false, // iOS and Android
    showFlipCameraButton: true, // iOS and Android
    showTorchButton: true, // iOS and Android
    torchOn: true, // Android, launch with the torch switched on (if available)
    prompt: "Escanear el DNI", // Android
    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    formats: "PDF_417,QR_CODE", // default: all but PDF_417 and RSS_EXPANDED --QR_CODE
    orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
    disableAnimations: true, // iOS
    disableSuccessBeep: false // iOS and Android
  }

  constructor(private barcodeScanner: BarcodeScanner) {

  }

  scanCode(){
    this.barcodeScanner.scan(this.opciones).then(result => {
      alert("We got a barcode\n" +
      "Result: " + result.text + "\n" +
      "Format: " + result.format + "\n" +
      "Cancelled: " + result.cancelled);

     }).catch(err => {
      alert("Scanning failed: " + err);
     });
  }




}
