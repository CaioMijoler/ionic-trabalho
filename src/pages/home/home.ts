import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';

import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { Crud } from '../../models/crud.model';

import { CrudPage } from '../crud/crud';

import { Observable } from 'rxjs/Observable';
import { crudProvider } from '../../providers/crud/crud';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  view: string = 'crud';

  cruds: Observable<Crud[]>

  public crudPage = CrudPage;

  constructor(
    public authProvider: AuthProvider,
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public menuController: MenuController,
    public crudProvider: crudProvider) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    // habilita o menu depois que usuário estiver logado
    this.menuController.enable(true, 'user-menu');

    this.cruds = this.crudProvider.mapListKeys<Crud>(this.crudProvider.cruds);
  }

  onCrudOpen(crud: Crud): void {
    this.navCtrl.push(CrudPage, {
      crud
    });
  }

  onLogout(): void {
    this.authProvider.logout();
  }

}
