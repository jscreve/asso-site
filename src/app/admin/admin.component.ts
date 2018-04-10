import {Component, OnInit} from '@angular/core';
import {ReceiptService} from '../services/receipt.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public receiptYear: number;

  constructor(private _receiptService: ReceiptService) {
  }

  ngOnInit() {
  }

  public generateReceipt() {
    console.log(this.receiptYear);
    this._receiptService.get(this.receiptYear).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
