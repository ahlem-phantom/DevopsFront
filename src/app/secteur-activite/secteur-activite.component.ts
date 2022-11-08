import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecteurActivite} from '../shared/Model/Secteur-activite';
import {SecteurActiviteService} from '../shared/Service/Secteur-activite.service';

@Component({
  selector: 'app-secteur-activite',
  templateUrl: './secteur-activite.component.html',
  styleUrls: ['./secteur-activite.component.css']
})
export class SecteurActiviteComponent implements OnInit {

  listSec: any;
  form: boolean = false;
  sec!: SecteurActivite;
  closeResult!: string;

  constructor(private secteurActiviteService: SecteurActiviteService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllSec();
    this.sec = {
      idSecteurActivite:null,
      codeSecteurActivite:null,
      libelleSecteurActivite:null
    }
  }

  getAllSec() {
    this.secteurActiviteService.getAllSecteurActivites().subscribe(res => this.listSec = res)
  }

  addSec(p: any) {
    this.secteurActiviteService.addSecteurActivite(p).subscribe(() => {
      this.getAllSec();
      this.form = false;
    });
  }

  editSec(sec: SecteurActivite) {
    this.secteurActiviteService.editSecteurActivite(sec).subscribe();
  }

  deleteSec(idSec: any) {
    this.secteurActiviteService.deleteSecteurActivite(idSec).subscribe(() => this.getAllSec())
  }

  open(content: any, action: any) {
    if (action != null)
      this.sec = action
    else
      this.sec = new SecteurActivite();
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
