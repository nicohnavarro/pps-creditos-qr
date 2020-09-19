import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.page.html',
  styleUrls: ['./puntajes.page.scss'],
})
export class PuntajesPage implements OnInit {

  usuarios=[];
  constructor(private usuariosSvc:UsuariosService) {
    usuariosSvc.getUsuarios().subscribe(data =>{
      this.usuarios=data;
      console.log(this.usuarios)
    });
   }

  ngOnInit() {

  }

}
