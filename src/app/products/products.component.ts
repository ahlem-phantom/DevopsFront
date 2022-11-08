import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../shared/Model/Product';
import {ProductService} from '../shared/Service/Product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listProducts: any;
  form: boolean = false;
  product!: Product;
  closeResult!: string;

  constructor(private productService: ProductService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllProducts();

    this.product = {
      idProduit: null,
      codeProduit: null,
      libelleProduit: null,
      prix: null,
      dateCreation: null,
      dateDerniereModification: null

    }
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(res => this.listProducts = res)
  }

  addProduct(p: any) {
    this.productService.addProduct(p).subscribe(() => {
      this.getAllProducts();
      this.form = false;
    });
  }

  editProduct(product: Product) {
    this.productService.editProduct(product).subscribe();
  }

  deleteProduct(idProduct: any) {
    this.productService.deleteProduct(idProduct).subscribe(() => this.getAllProducts())
  }

  open(content: any, action: any) {
    if (action != null)
      this.product = action
    else
      this.product = new Product();
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
