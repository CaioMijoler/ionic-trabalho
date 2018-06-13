import { crudProvider } from './../../providers/crud/crud';
import { UserProvider } from './../../providers/user/user';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { User } from './../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Crud } from '../../models/crud.model';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-crud',
  templateUrl: 'crud.html',
})
export class CrudPage {

  user: User;
  crud: Crud;

  crudForm: FormGroup;

  constructor(
    public authProvider: AuthProvider,
    public crudProvider: crudProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider) {
      

  }

  ionViewWillLoad() {
    this.crud = this.navParams.get('crud');
    if (!this.crud) {
      this.crud = new Crud('', '', '');
    }

    this.crudForm = this.formBuilder.group({
      nome_produto: [this.crud.nome_produto, [Validators.required, Validators.minLength(3)]],
      valor: [this.crud.valor, [Validators.required, Validators.minLength(3)]],
      descricao: [this.crud.descricao, [Validators.required, Validators.minLength(3)]]
      
    });
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por Favor, Aguarde...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let form = this.crudForm.value;
    this.crud.nome_produto = form.nome_produto;
    this.crud.valor = form.valor;
    this.crud.descricao = form.descricao;
    
    
    if (!this.crud.$key) {
      this.crudProvider.create(this.crud)
      .then(() => {
        console.log('crud cadastrado!');
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
        this.showAlert(`Crud cadastrado!`);
      })
      .catch(err => {
        console.log(err);
        loading.dismiss();
        this.showAlert(`Erro ao cadastrar crud! ${err.message}`);
      });
    } else {
      this.crudProvider.edit(this.crud)
      .then(res => {
        console.log('Crud editado!');
        //this.navCtrl.setRoot(HomePage);
        loading.dismiss();
        this.showAlert(`Crud editado!`);
      })
      .catch(err => {
        console.log(err);
        loading.dismiss();
        this.showAlert(`Erro ao editar crud! ${err.message}`);
      });
    }
  }

  delete() {
    let loading: Loading = this.showLoading();
    let form = this.crudForm.value;
    this.crud.nome_produto = form.nome_produto;
    this.crud.valor = form.valor;
    this.crud.descricao = form.descricao;
    

    this.crudProvider.remove(this.crud)
      .then(() => {
        console.log('crud deletado!');
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
        this.showAlert(`crud deletado!`);
      })
      .catch(err => {
        console.log(err);
        loading.dismiss();
        this.showAlert(`Erro ao excluir crud! ${err.message}`);
      });
  }

}
