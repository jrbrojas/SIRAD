import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Emergency } from 'src/app/shared/models/emergency.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { EmergencyService } from 'src/app/shared/services/emergency.service';

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.scss']
})
export class ObservacionComponent implements OnInit {

  public createEstado: FormGroup;

  @Input() public idEmergencia: any;
  public detailsEmergency: any;
  constructor(
    public activemodal: NgbActiveModal, 
    private emergencyService: EmergencyService, 
    private alert: AlertService,
    private fb: FormBuilder,
    
  ){
    this.createEstado = this.fb.group({
      estadoEmergencia: ['',[Validators.required]],
      nota: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getDetailsEmergency()
  }

  closeModal(){
    this.activemodal.close();
  }

  getDetailsEmergency() {
    this.emergencyService.getEmergencyById(this.idEmergencia).subscribe(res => {
      this.detailsEmergency = res;
    });
  }

  observarForm() {    
    const dataU: Emergency = {
      id: this.idEmergencia,
      estadoEmergencia: 2,
 /*      nota: this.createEstado.value.nota */
    }
    this.alert.questionAlertConfirm('¿Est&aacute;s Seguro de Observar?', '', 'S&iacute;, Observar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {          
          this.emergencyService.updateEmergency(dataU).subscribe((res: any) => {
            this.alert.toastSuccess(`${res.message}`);
            this.closeModal();
          });
        }
      }
    );
  }

  revisarForm() { 
    const dataU: Emergency = {
      id: this.idEmergencia,
      estadoEmergencia: 3,
/*       nota: this.createEstado.value.nota */
    }
    this.alert.questionAlertConfirm('Est&aacute;s Seguro de Revisar?', '', 'S&iacute;, Revisar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.emergencyService.updateEmergency(dataU).subscribe((res: any) => {
            this.alert.toastSuccess(`${res.message}`);
            this.closeModal();
          });
        }
      }
    );
  }

  aprobarForm() {  
    const dataU: Emergency = {
      id: this.idEmergencia,
      estadoEmergencia: 4,
/*       nota: this.createEstado.value.nota */
    }   
    this.alert.questionAlertConfirm('Est&aacute;s Seguro de Aprobar?', '', 'S&iacute;, aprobar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.emergencyService.updateEmergency(dataU).subscribe((res: any) => {
            this.alert.toastSuccess(`${res.message}`);
            this.closeModal();
          });
        }
      }
    );
  }

}
