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

  fileOpener = new FileOpener();

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

  constructor(
    private barcodeScanner: BarcodeScanner,
    public router: Router,
    // private file: File,
    // private fileOpener: FileOpener
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

    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024,  (fs)=> {
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      console.log(data)
      console.log('file system open: ' + fs.name + fs);
      this.createFile(fs.root, "murtuzaabc.xlsx", false, data);
    });




    //   this.fileOpener.open(data, 'application/pdf')
    // .then(() => console.log('File is opened'))
    // .catch(e => console.log('Error opening file', e));this.fileOpener.open('path/to/file.pdf', 'application/pdf')
    // .then(() => console.log('File is opened'))
    // .catch(e => console.log('Error opening file', e));

    // const link = document.createElement('a');
    // // create a blobURI pointing to our Blob
    // link.href = URL.createObjectURL(data);
    // link.download = fileName;
    // // some browser needs the anchor to be in the doc
    // document.body.append(link);
    // link.click();
    // link.remove();
    // // in case the Blob uses a lot of memory
    // window.addEventListener('focus', e=>URL.revokeObjectURL(link.href), {once:true});
    // // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  createFile(dirEntry, fileName, isAppend, blob) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, { create: true, exclusive: false },  (fileEntry) =>{

      this.writeFile(fileEntry, blob, isAppend);

    });

  }
  writeFile(fileEntry, dataObj, isAppend) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

      fileWriter.onwriteend = function () {
        console.log("Successful file write...");
        console.log(fileEntry)
        // readFile(fileEntry);
      };

      fileWriter.onerror = function (e) {
        console.log("Failed file write: " + e.toString());
      };

      // If data object is not passed in,
      // create a new Blob instead.
      // if (!dataObj) {
      //   dataObj = new Blob(dataObj, { type: 'text/plain' });
      // }

      fileWriter.write(dataObj);
    });
  }

  // readFile(fileEntry) {

  //   fileEntry.file(function (file) {
  //     var reader = new FileReader();

  //     reader.onloadend = function () {
  //       console.log("Successful file read: " + this.result);
  //       displayFileData(fileEntry.fullPath + ": " + this.result);
  //     };

  //     reader.readAsText(file);

  //   });
  // }
}
