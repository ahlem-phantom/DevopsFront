import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Facture } from '../shared/Model/Facture';
import { FactureService } from '../shared/Service/Facture.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  listFactures: any;
  form: boolean = false;
  facture!: Facture;
  closeResult!: string;

  constructor(private factureService: FactureService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllFactures();
    this.facture = {
      idFacture:null,
      dateCreationFacture:null,
      montantFacture:null,
      dateDerniereModificationFacture:null,
      montantRemise:null,
      archivee:null
    }
  }

  getAllFactures() {
    this.factureService.getAllFactures().subscribe(res => this.listFactures = res)
  }

  addFacture(f: any) {
    this.factureService.addFacture(f).subscribe(() => {
      this.getAllFactures();
      this.form = false;
    });
  }

  open(content: any) {
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
