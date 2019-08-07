import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  
  scannedItems = [];
  checkoutItems = [];
  username = localStorage.getItem('loggedInUser')

  constructor(
    private barcodeScanner: BarcodeScanner,
    public router: Router
  ) { }

  ngOnInit() {
    var storedNames = JSON.parse(localStorage.getItem(this.username + '_scannedItems'));
    console.log('test', storedNames)
    this.scannedItems = storedNames || [] 
  }

  onScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.checkoutItems.push(barcodeData)
    }).catch(err => {
      console.log('Error', err);
      alert(err)
    });
  }

  removeItem(index) {
    this.checkoutItems.splice(index, 1)
  }


  excelExport(){
    alert('Work in Progress! This is where we will generate excel report.')
  }
}
