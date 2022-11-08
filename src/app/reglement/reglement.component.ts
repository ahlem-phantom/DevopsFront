import {Component, OnInit} from '@angular/core';
import {Reglement} from '../shared/Model/Reglement';
import {ReglementService} from '../shared/Service/Reglement.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reglement',
  templateUrl: './reglement.component.html',
  styleUrls: ['./reglement.component.css']
})
export class ReglementComponent implements OnInit {


  listReglement: any;
  form: boolean = false;
  reglement!: Reglement;
  closeResult!: string;

  constructor(private reglementService: ReglementService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllReg();
    this.reglement = {
      idReglement:null,
      dateReglement:null,
      payee:null,
      montantRestant:null,
      montantPaye:null
    }
  }

  getAllReg() {
    this.reglementService.getAllReglements().subscribe(res => this.listReglement = res)
  }

  addReglement(f: any) {
    this.reglementService.addReglement(f).subscribe(() => {
      this.getAllReg();
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
