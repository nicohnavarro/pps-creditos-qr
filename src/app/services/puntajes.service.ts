import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IParticipante } from '../interfaces/IParticipantes';

@Injectable({
  providedIn: 'root'
})
export class PuntajesService {
  private puntajesCollection: AngularFirestoreCollection<IParticipante>;
  private listado: Observable<IParticipante[]>;
  private puntajeDoc: AngularFirestoreDocument<IParticipante>

  constructor(private db: AngularFirestore) {
    this.puntajesCollection = db.collection<IParticipante>('puntajes');
    this.listado = this.puntajesCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  getPuntajes() {
    return this.listado;
  }

  addPuntajes(puntaje:IParticipante){
    this.puntajesCollection.add(puntaje);
  }

  sumarPuntaje(participante: IParticipante) {
    this.puntajeDoc = this.db.doc(`puntajes/${participante.id}`);
    this.puntajeDoc.update(participante)

  }

}
