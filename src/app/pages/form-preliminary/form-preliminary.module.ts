import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormPreliminaryRoutingModule } from './form-preliminary-routing.module';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarLesionadosComponent } from './agregar-lesionados/agregar-lesionados.component';
import { AgregarPersonalPrimRespComponent } from './agregar-personal-prim-resp/agregar-personal-prim-resp.component';
import { AgregarServicioInfraestructuraComponent } from './agregar-servicio-infraestructura/agregar-servicio-infraestructura.component';

import { AgregarInsfrasServicBasicosComponent } from './agregar-insfras-servic-basicos/agregar-insfras-servic-basicos.component';
import { AgregarInsfraestructuraCulturalComponent } from './agregar-insfraestructura-cultural/agregar-insfraestructura-cultural.component';
import { AgregarNecesidadesPriorAsistComponent } from './agregar-necesidades-prior-asist/agregar-necesidades-prior-asist.component';
import { AgregarNecesidadesRecursosComponent } from './agregar-necesidades-recursos/agregar-necesidades-recursos.component';
import { AgregarNecesidadAtencionComponent } from './agregar-necesidad-atencion/agregar-necesidad-atencion.component';
import { AgregarNecesidadAgropecuariosComponent } from './agregar-necesidad-agropecuarios/agregar-necesidad-agropecuarios.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgregarDanioInstalacionVehiculoComponent } from './agregar-danio-instalacion-vehiculo/agregar-danio-instalacion-vehiculo.component';
import { AgregarInfraestructuraEducativaComponent } from './agregar-infraestructura-educativa/agregar-infraestructura-educativa.component';
import { AgregarInfraestructuraTransporteComponent } from './agregar-infraestructura-transporte/agregar-infraestructura-transporte.component';
import { AgregarInfraestructuraTransPuenteComponent } from './agregar-infraestructura-trans-puente/agregar-infraestructura-trans-puente.component';
import { AgregarLocalsPublicosComponent } from './agregar-locals-publicos/agregar-locals-publicos.component';
import { CrearInformacionGeneralComponent } from './crear-informacion-general/crear-informacion-general.component';
import { AgregarInfraestructuraRiesgoReservaComponent } from './agregar-infraestructura-riesgo-reserva/agregar-infraestructura-riesgo-reserva.component';
import { AgregarInfraestructuraRiesgoDefensaComponent } from './agregar-infraestructura-riesgo-defensa/agregar-infraestructura-riesgo-defensa.component';


@NgModule({
    declarations: [
        CreateComponent,
        AgregarLesionadosComponent,
        AgregarPersonalPrimRespComponent,
        AgregarServicioInfraestructuraComponent,
        AgregarDanioInstalacionVehiculoComponent,
        AgregarInfraestructuraEducativaComponent,
        AgregarInfraestructuraTransporteComponent,
        AgregarInfraestructuraTransPuenteComponent,
        AgregarLocalsPublicosComponent,
        AgregarInsfrasServicBasicosComponent,
        AgregarInsfraestructuraCulturalComponent,
        AgregarNecesidadesPriorAsistComponent,
        AgregarNecesidadesRecursosComponent,
        AgregarNecesidadAtencionComponent,
        AgregarNecesidadAgropecuariosComponent,
        CrearInformacionGeneralComponent,
        AgregarInfraestructuraRiesgoReservaComponent,
        AgregarInfraestructuraRiesgoDefensaComponent
    ],
    imports: [
        CommonModule,
        FormPreliminaryRoutingModule,
        SharedModule,
        NgSelectModule
    ]
})
export class FormPreliminaryModule { }
