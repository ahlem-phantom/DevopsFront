import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Operateur } from '../shared/Model/Operateur';
import { OperateurService } from '../shared/Service/Operateur.service';

@Component({
  selector: 'app-operateur',
  templateUrl: './operateur.component.html',
  styleUrls: ['./operateur.component.css']
})
export class OperateurComponent implements OnInit {

  listOperateurs: any;
  form: boolean = false;
  operateur!: Operateur;
  closeResult!: string;

  constructor(private operateurService: OperateurService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllOperateurs();
    this.operateur = {
      idOperateur:null,
      nom:null,
      prenom:null,
      password:null
    }
  }

  getAllOperateurs() {
    this.operateurService.getAllOperateurs().subscribe(res => this.listOperateurs = res)
  }

  addOperateur(o: any) {
    this.operateurService.addOperateur(o).subscribe(() => {
      this.getAllOperateurs();
      this.form = false;
    });
  }

  editOperateur(operateur: Operateur) {
    this.operateurService.editOperateur(operateur).subscribe();
  }

  deleteOperateur(idOperateur: any) {
    this.operateurService.deleteOperateur(idOperateur).subscribe(() => this.getAllOperateurs())
  }

  open(content: any, action: any) {
    if (action != null)
      this.operateur = action
    else
      this.operateur = new Operateur();
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
