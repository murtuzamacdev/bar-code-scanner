import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
// import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

declare let window: any; // <--- Declare it like this

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  constructor(
    public barcodeScanner: BarcodeScanner,
    public router: Router,
    // public file: File,
    public fileOpener: FileOpener
  ) { }
  // fileOpener = new FileOpener();

  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },
  {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];

  scannedItems = [];
  checkoutItems = [];
  username = localStorage.getItem('loggedInUser')

 

  ngOnInit() { 
    alert('fffss');
    console.log('ffffss' + File.dataDirectory)
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


  excelExport() {
    // alert('Work in Progress! This is where we will generate excel report.')
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, 'test');
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    // console.log(this.file)
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    window.resolveLocalFileSystemURL(File.externalRootDirectory, (fs) => {

      console.log('file system open: ' + fs.name);
      let filename = 'barcodeAppExcel' + new Date().getTime() + '.xlsx'
      fs.getFile(filename, { create: true, exclusive: false }, (fileEntry) => {
        console.log("fileEntry is file?" + fileEntry.isFile.toString());
        this.writeFile(fileEntry, data, filename);

      }, () => { });

    }, () => { });
  }
 
  writeFile(fileEntry, dataObj, filename) {
    let me = this;
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

      fileWriter.onwriteend = function () {
        alert('File save successfully!');
        console.log("Successful file write...", fileEntry);
        alert(fileEntry.nativeURL)
        me.fileOpener.open( fileEntry.nativeURL, EXCEL_TYPE)
          .then(() => alert('File is opened'))
          .catch(e => alert(e));
        // readFile(fileEntry);
      };

      fileWriter.onerror = function (e) {
        console.log("Failed file write: " + e.toString());
      };

      // If data object is not passed in,
      // create a new Blob instead.
      if (!dataObj) {
        // dataObj = new Blob(['some file data'], { type: 'text/plain' });
      }

      fileWriter.write(dataObj);
    });
  }
}
