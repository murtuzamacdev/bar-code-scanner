import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {Router} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  barCodes = [];
  selectedBarcode;

  constructor(
    private barcodeScanner: BarcodeScanner,
    public router: Router
  ) { }

  onClick() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.selectedBarcode = barcodeData
      alert(barcodeData)
    }).catch(err => {
      console.log('Error', err);
      alert(err)
    });
  }
} 
