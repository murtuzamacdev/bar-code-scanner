import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router'

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  scannedItems = [];
  username = localStorage.getItem(window.history.state.username)

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
      this.scannedItems.push(barcodeData)
    }).catch(err => {
      console.log('Error', err);
      alert(err)
    });
  }

  removeItem(index) {
    this.scannedItems.splice(index, 1)
  }

  onDone() {
    console.log('on done',this.username + '_scannedItems' )
    localStorage.setItem(this.username + '_scannedItems', JSON.stringify(this.scannedItems));
    this.router.navigateByUrl('/login')
  }

}
