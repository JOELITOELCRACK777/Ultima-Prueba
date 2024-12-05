import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SolicitudFormularioService } from '../../servicios/solicitud-formulario/solicitud-formulario.service';
import { ProfesionalesService } from '../../servicios/tecnicos-de-la-empresa/profesionales.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent {
  formularioForm;
  datos_formulario: any;
  solicitud_formulario: any;
  constructor(private formBuild: FormBuilder, private solicitudFormularioSrv:SolicitudFormularioService, private SolicitudProfesionalSrv:ProfesionalesService){
    this.formularioForm = this.formBuild.group({
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      mensaje: ''
    });
  }
  ngOnInit(){
    this.obtenerSolicitudesProfesionaless();
  }
  enviarDatos(){
    this.solicitudFormularioSrv.registrarFormulario(this.formularioForm.value).subscribe(
      (response:any) => {
        
        this.datos_formulario = response.solicitud_formulario
        console.log(this.datos_formulario);        
        alert("Datos guardados correctamente");
        this.formularioForm.reset();
      },error => {
        console.log(error);
      }
    )   
  }

  obtenerSolicitudesProfesionaless(){
    this.SolicitudProfesionalSrv.obtenerSolicitudesProfesionales().subscribe(
      (response:any) => {        
        this.solicitud_formulario = response.profesionales;          
        console.log(this.solicitud_formulario);
      }, error => {
        console.log(error);
      }
    )
  }
}
