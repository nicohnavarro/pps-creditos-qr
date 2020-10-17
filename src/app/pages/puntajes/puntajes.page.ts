import { Component, OnInit } from '@angular/core';
import { IParticipante } from 'src/app/interfaces/IParticipantes';
import { PuntajesService } from 'src/app/services/puntajes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.page.html',
  styleUrls: ['./puntajes.page.scss'],
})
export class PuntajesPage implements OnInit {

  usuarios=[];
  puntajes: IParticipante[] = [];
  constructor(private usuariosSvc:UsuariosService,private puntajeSvc: PuntajesService) {
    usuariosSvc.getUsuarios().subscribe(data =>{
      this.usuarios=data;
      console.log(this.usuarios)
    });
    this.puntajeSvc.getPuntajes().subscribe(data => {
      this.puntajes = data
      this.puntajes = this.puntajes.sort((a,b)=> b.puntos-a.puntos)
    })
   }

  ngOnInit() {

  }

}
