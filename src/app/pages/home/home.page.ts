import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { IParticipante } from 'src/app/interfaces/IParticipantes';
import { IUser } from 'src/app/interfaces/IUser';
import { PuntajesService } from 'src/app/services/puntajes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: IUser = JSON.parse(localStorage.getItem('usuario'));
  jugador: IParticipante;
  puntos10 = "8c95def646b6127282ed50454b73240300dccabc"
  puntos50 = "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172"
  puntos100 = "2786f4877b9091dcad7f35751bfcf5d5ea712b2f"
  puntajes: IParticipante[] = [];
  opciones: BarcodeScannerOptions = {
    preferFrontCamera: false, // iOS and Android
    showFlipCameraButton: true, // iOS and Android
    showTorchButton: true, // iOS and Android
    torchOn: true, // Android, launch with the torch switched on (if available)
    prompt: "Escanear el DNI", // Android
    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    formats: "PDF_417,QR_CODE", // default: all but PDF_417 and RSS_EXPANDED --QR_CODE
    orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
    disableAnimations: true, // iOS
    disableSuccessBeep: false // iOS and Android
  }

  constructor(private barcodeScanner: BarcodeScanner, private router: Router, private puntajeSvc: PuntajesService, public toastController: ToastController) {
    this.puntajeSvc.getPuntajes().subscribe(data => {
      this.puntajes = data
      this.jugador = this.puntajes.filter(aux => aux.usuario == this.usuario.correo)[0]
      console.log(this.jugador)
    })

  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color
    });
    toast.present();
  }
  scanCode() {
    this.barcodeScanner.scan(this.opciones).then(result => {
      // alert("We got a barcode\n" +
      //   "Result: " + result.text + "\n" +
      //   "Format: " + result.format + "\n" +
      //   "Cancelled: " + result.cancelled);
      switch (result.text) {
        case this.puntos10:
          this.cargarPuntos(this.jugador, 10)
          break;
        case this.puntos50:
          this.cargarPuntos(this.jugador, 50)
          break;
        case this.puntos100:
          this.cargarPuntos(this.jugador, 100)
          break;

        default:
          break;
      }


    }).catch(err => {
      alert("Scanning failed: " + err);
    });


  }

  goPuntajes() {
    this.router.navigate(['/puntajes']);
  }

  limpiarPuntaje() {
    this.jugador.puntos = 0
    this.jugador.codigo10 = true;
    this.jugador.codigo50 = true;
    this.jugador.codigo100 = true;
    this.puntajeSvc.sumarPuntaje(this.jugador)
    this.presentToast('Volviste a tener 0 puntos', 'warning');
  }

  cargarPuntos(participante: IParticipante, puntos) {
    console.log(puntos)
    try {
      if (participante.admin) {
        this.validarJuego(participante, puntos);
      }
      else {
        console.log(participante)
        this.validarJuego(participante, puntos);

      }

    } catch (err) {
      this.presentToast(err.message, 'danger');
    }



  }

  validarJuego(participante: IParticipante, puntos) {
    switch (puntos) {
      case 10:
        if (participante.codigo10) {
          console.log(puntos)
          participante.puntos += puntos
          participante.codigo10 = false
          this.puntajeSvc.sumarPuntaje(participante);
          this.presentToast('Sumaste 10 puntos', 'success');
        }
        else {
          throw new Error("Lo siento, ya no puedes cargar 10 puntos :(")
        }
        break;
      case 50:
        if (participante.codigo50) {
          console.log(puntos)
          participante.puntos += puntos
          participante.codigo50 = false
          if (participante.admin) {
            participante.codigo50 = true
          }
          this.puntajeSvc.sumarPuntaje(participante);
          this.presentToast('Sumaste 50 puntos', 'success');
        }
        else {
          throw new Error("Lo siento, ya no puedes cargar 50 puntos :(")
        }
        break;
      case 100:
        if (participante.codigo100) {
          console.log(puntos)
          participante.puntos += puntos
          participante.codigo100 = false
          if (participante.admin) {
            participante.codigo100 = true
          }
          this.puntajeSvc.sumarPuntaje(participante);
          this.presentToast('Sumaste 100 puntos', 'success');
        }
        else {
          throw new Error("Lo siento, ya no puedes cargar 100 puntos :(")
        }
        break;

      default:
        break;
    }
  }


}
