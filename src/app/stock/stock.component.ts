import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Stock} from '../shared/Model/Stock';
import {StockService} from '../shared/Service/Stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  listStocks: any;
  form: boolean = false;
  stock!: Stock;
  closeResult!: string;

  constructor(private stockService: StockService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllStockss();

    this.stock = {
      idStock: null,
      libelleStock:null,
      qte:null,
      qteMin:null
    }
  }

  getAllStockss() {
    this.stockService.getAllStocks().subscribe(res => this.listStocks = res)
  }

  addStock(p: any) {
    this.stockService.addStock(p).subscribe(() => {
      this.getAllStockss();
      this.form = false;
    });
  }

  editStock(stock: Stock) {
    this.stockService.editStock(stock).subscribe();
  }

  deleteStock(idStock: any) {
    this.stockService.deleteStock(idStock).subscribe(() => this.getAllStockss())
  }

  open(content: any, action: any) {
    if (action != null)
      this.stock = action
    else
      this.stock = new Stock();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.form = false;
  }
}
