import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmergencyService } from '../../../shared/services/emergency.service';

@Component({
  selector: 'app-record-emergencies',
  templateUrl: './record-emergencies.component.html',
  styleUrls: ['./record-emergencies.component.scss']
})
export class RecordEmergenciesComponent implements OnInit {
  isId: any
  codigoSinpad: any
  public page : number = 0
  //guardar codigo sinpad
  public dataRecord: any
  public UsuariodataRecord: any
  constructor(private params: ActivatedRoute,
    private router: Router,
    private emergencyService: EmergencyService) {
    this.isId = this.params.snapshot.paramMap.get('id');
    const words = this.isId.split(',');
    this.isId = words[0]
    this.codigoSinpad = words[1]

   }

  ngOnInit(): void {
    this.getEmergenciasRecord()
  }

  getEmergenciasRecord() {
    //llamar al backEnd
    this.emergencyService.getEmergenciesRecord(this.codigoSinpad).subscribe(
      response => {
        //obtener ultimo valor
        this.UsuariodataRecord = response[0]
        this.dataRecord = response



        function ordenar_id(a : any , b : any){
          if(a.id > b.id){
            return -1
          }
          if (a.id < b.id){
            return 1
          }
          return 0
        }

        this.dataRecord.sort(ordenar_id);
        this.createIndexEmergency(this.dataRecord.length);

      }
    )
  }

  createIndexEmergency(tamanio : number){
    let index = tamanio;
    this.dataRecord.forEach(async (element: any) => {
      element.index = index;
      await index--;
    })
  }


  detailEmergency(id: number) {
    this.router.navigate([`/emergencias/details/${id}`]).then(() => {});
  }

}
