import { ModalVerSolicitudComponent } from './modal-ver-solicitud/modal-ver-solicitud.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { etLocale } from 'ngx-bootstrap/chronos';
import TextPlacement from 'ol/style/TextPlacement';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';

@Component({
  selector: 'app-solicitud-credenciales',
  templateUrl: './solicitud-credenciales.component.html',
  styleUrls: ['./solicitud-credenciales.component.scss']
})
export class SolicitudCredencialesComponent implements OnInit {

  public value : "";
  public filtros: FormGroup;

  constructor(private fb: FormBuilder,
    public alert: AlertService,
    private modalService: NgbModal) {
    this.filtros = this.fb.group({
      textoBusqueda: [null],
      fechaInicio: [null],
      fechaFin: [null]
    });

    this.solicitudesFiltradas = this.filtrarSolicitudes();

    this.filtros.valueChanges.subscribe(() => {
      this.solicitudesFiltradas = this.filtrarSolicitudes();
    })

  }

  solicitudesFiltradas: any[] = [];

  solicitudes: any = [
    {
      id: 1,
      fechaSolicitud: "01/09/2022",
      titulo: 'Sr.',
      genero: 'MASCULINO',
      tipoDocumento: 'DNI',
      numeroDocumento: '12345678',
      nombresApellidos: "Daniel Vallejos",
      paisResidencia: 'PERÚ',
      provinciaResidencia: 'LIMA',
      distritoResidencia: 'LIMA',
      direccionResidencia: 'LIMA',
      codigoPostal: '446',
      celular: '987654321',
      telefono: '',
      fax: '',
      OrganizacionInstitucion: "INDECI",
      cargo: 'JEFE DE LA INSTITUCIÓN',
      email: 'dvallejos@gmail.com',
      estado: "POR APROBAR",
      evento: 'Evento 01 02/10/2022',
      institucion: 'INDECI',
      perfiles: 'EXCON, PARTICIPANTE'
    },
    {
      id: 2,
      fechaSolicitud: "05/09/2022",
      titulo: 'Sr.',
      genero: 'MASCULINO',
      tipoDocumento: 'DNI',
      numeroDocumento: '478948459',
      nombresApellidos: "Antony Barboza",
      paisResidencia: 'PERÚ',
      provinciaResidencia: 'LIMA',
      distritoResidencia: 'LIMA',
      direccionResidencia: 'LIMA',
      codigoPostal: '446',
      celular: '987654321',
      telefono: '',
      fax: '',
      OrganizacionInstitucion: "SENAHMI",
      cargo: 'JEFE DE LA INSTITUCIÓN',
      email: 'dvallejos@gmail.com',
      estado: "POR APROBAR",
      evento: 'Evento 01 02/10/2022',
      institucion: 'INDECI',
      perfiles: 'EXCON, PARTICIPANTE'
    },
    {
      id: 3,
      fechaSolicitud: "10/09/2022",
      titulo: 'Sr.',
      genero: 'MASCULINO',
      tipoDocumento: 'DNI',
      numeroDocumento: '478948459',
      nombresApellidos: "Daniel Salazar",
      paisResidencia: 'PERÚ',
      provinciaResidencia: 'LIMA',
      distritoResidencia: 'LIMA',
      direccionResidencia: 'LIMA',
      codigoPostal: '446',
      celular: '987654321',
      telefono: '',
      fax: '',
      OrganizacionInstitucion: "ANA",
      cargo: 'JEFE DE LA INSTITUCIÓN',
      email: 'dvallejos@gmail.com',
      estado: "APROBADO",
      evento: 'Evento 01 02/10/2022',
      institucion: 'INDECI',
      perfiles: 'EXCON, PARTICIPANTE'
    },
    {
      id: 4,
      fechaSolicitud: "01/10/2022",
      titulo: 'Sr.',
      genero: 'MASCULINO',
      tipoDocumento: 'DNI',
      numeroDocumento: '478948459',
      nombresApellidos: "Eli Diaz",
      paisResidencia: 'PERÚ',
      provinciaResidencia: 'LIMA',
      distritoResidencia: 'LIMA',
      direccionResidencia: 'LIMA',
      codigoPostal: '446',
      celular: '987654321',
      telefono: '',
      fax: '',
      OrganizacionInstitucion: "IGP",
      cargo: 'JEFE DE LA INSTITUCIÓN',
      email: 'dvallejos@gmail.com',
      estado: "NO APROBADO",
      evento: 'Evento 01 02/10/2022',
      institucion: 'INDECI',
      perfiles: 'EXCON, PARTICIPANTE'
    },
    {
      id: 5,
      fechaSolicitud: "01/10/2022",
      titulo: 'Sr.',
      genero: 'MASCULINO',
      tipoDocumento: 'DNI',
      numeroDocumento: '478948459',
      nombresApellidos: "Marlon Goanzales",
      paisResidencia: 'PERÚ',
      provinciaResidencia: 'LIMA',
      distritoResidencia: 'LIMA',
      direccionResidencia: 'LIMA',
      codigoPostal: '446',
      celular: '987654321',
      telefono: '',
      fax: '',
      OrganizacionInstitucion: "IGP",
      cargo: 'JEFE DE LA INSTITUCIÓN',
      email: 'dvallejos@gmail.com',
      estado: "POR APROBAR",
      evento: 'Evento 01 02/10/2022',
      institucion: 'INDECI',
      perfiles: 'EXCON, PARTICIPANTE'
    },
    {
      id: 6,
      fechaSolicitud: "01/10/2022",
      titulo: 'Sr.',
      genero: 'MASCULINO',
      tipoDocumento: 'DNI',
      numeroDocumento: '478948459',
      nombresApellidos: "Jose Rojas",
      paisResidencia: 'PERÚ',
      provinciaResidencia: 'LIMA',
      distritoResidencia: 'LIMA',
      direccionResidencia: 'LIMA',
      codigoPostal: '446',
      celular: '987654321',
      telefono: '',
      fax: '',
      OrganizacionInstitucion: "IGP",
      cargo: 'JEFE DE LA INSTITUCIÓN',
      email: 'dvallejos@gmail.com',
      estado: "NO APROBADO",
      evento: 'Evento 01 02/10/2022',
      institucion: 'INDECI',
      perfiles: 'EXCON, PARTICIPANTE'
    }
]

  ngOnInit(): void {
  }

  aprobarUsuario(id: number){
    this.alert.questionAlertAction('¿Que desea realizar?', '', 'Aprobar', "No aprobar", TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.isConfirmed) {
          this.solicitudes.map((solicitud: any) => solicitud.id == id? solicitud.estado = 'APROBADO' : solicitud.estado);
        }
        else if (result.isDenied) {
          this.solicitudes.map((solicitud: any) => solicitud.id == id? solicitud.estado = 'NO APROBADO': solicitud.estado);
          this.alert.toastInfo(`Usuario no aprobado`);
        }
      }
    )
  }

  limpiarFecha() {
    this.filtros.get('fechaInicio')?.reset();
    this.filtros.get('fechaFin')?.reset();
  }

  verSolicitud(id: number){
    const modalRef = this.modalService.open(ModalVerSolicitudComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static'
    });
    modalRef.componentInstance.solicitud = this.solicitudes.find((x) => x.id == id);
    modalRef.result.then((res) => {

    }, (reason) => {

    })
  }


  filtrarSolicitudes(): any[] {
    const textoBusqueda = this.filtros.controls['textoBusqueda'].value;
    const fechaInicio = this.filtros.controls['fechaInicio'].value;
    const fechaFin = this.filtros.controls['fechaFin'].value;
    if(fechaInicio && fechaFin){
      let dateInicio =  moment(fechaInicio,"DD/MM/YYYY");
      let dateFin =  moment(fechaFin,"DD/MM/YYYY");
      return this.solicitudes.filter((solicitud: any) => {
        let date = moment(solicitud.fechaSolicitud,"DD/MM/YYYY");
        if(textoBusqueda){
          let text = textoBusqueda.toLocaleLowerCase();
          return (date.isBetween(dateInicio, dateFin, 'days', '[]') && (
            String(solicitud.id) == text ||
            solicitud.nombresApellidos.toLocaleLowerCase().indexOf(text) !== -1 ||
            solicitud.institucion.toLocaleLowerCase().indexOf(text) !== -1 ||
            solicitud.estado.toLocaleLowerCase().indexOf(text) !== -1
          ));
        }else{
          return date.isBetween(dateInicio, dateFin, 'days', '[]');
        }
      });
    }else{
      if(textoBusqueda){
        return this.solicitudes.filter((solicitud: any) => {
          let text = textoBusqueda.toLocaleLowerCase();
          return (
            String(solicitud.id) == text ||
            solicitud.nombresApellidos.toLocaleLowerCase().indexOf(text) !== -1 ||
            solicitud.institucion.toLocaleLowerCase().indexOf(text) !== -1 ||
            solicitud.estado.toLocaleLowerCase().indexOf(text) !== -1
          );
        });
      }else{
        return this.solicitudes;
      }
    }
  }

  setClassEstado(estado: string): any{
    if(estado === 'POR APROBAR')
      return 'bg bg-warning';
    if(estado === 'APROBADO')
      return 'bg bg-success';
    if(estado === 'NO APROBADO')
      return 'bg bg-danger';
  }

}
