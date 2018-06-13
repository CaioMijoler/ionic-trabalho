import { BaseService } from '../base.service';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { Crud } from '../../models/crud.model';

import * as firebase from 'firebase/app';
/*
  Generated class for the TabalhoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class crudProvider extends BaseService {

  cruds: AngularFireList<Crud>;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {
    super();
    this.getcruds();
  }

  private getcruds(): void {
    console.log("Consulta crud");
    this.afAuth.authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          this.cruds= this.db.list<Crud>(`/cruds`,
            (ref: firebase.database.Reference) => ref.orderByChild('timestamp')
          );
        }
      });
  }

  create(crud: Crud): Promise<void> {
    return this.db.object<Crud>(`/cruds/${crud.$key}`)
      .set(crud)
      .catch(this.handlePromiseError);
  }

  edit(crud: Crud): Promise<void> {
    return this.db.object<Crud>(`/cruds/${crud.$key}`)
      .update({nome_produto: crud.nome_produto, valor: crud.valor, descricao: crud.descricao})
      .catch(this.handlePromiseError);
  }

  remove(crud: Crud): Promise<void> {
    return this.db.list<Crud>(`/cruds`)
      .remove(crud.$key)
      .catch(this.handlePromiseError);
  }
}
