
import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Notifiq, NotifiqType } from '../models/notifiq';
import { ToastController } from '@ionic/angular';
@Injectable()
export class NotifiqService {

  public subjeqt = new Subject<Notifiq>();
  public idx = 0;

  constructor(public toastController: ToastController) {
  }


  getObservable(): Observable<Notifiq> {
    return this.subjeqt.asObservable();
  }

  async info(title: string, message: string, timeout = 5000) {
    this.subjeqt.next(new Notifiq(this.idx++, NotifiqType.info, title, message, timeout));
  }

  async success(title: string, message: string, timeout = 6000) {
    this.subjeqt.next(new Notifiq(this.idx++, NotifiqType.success, title, message, timeout));
  }

  async warning(title: string, message: string, timeout = 5000) {
    this.subjeqt.next(new Notifiq(this.idx++, NotifiqType.warning, title, message, timeout));
  }

  async error(title: string, messagex: string, timeout = 6000) {
    if (messagex !== 'Given token not valid for any token type') {
      const toast = await this.toastController.create({
        message: messagex,
        duration: timeout,
        position: 'top',
        cssClass: ['notify', 'notify--warning'],
        mode: 'ios',
        buttons: [{
          role: 'cancel',
          text: 'ok'
        }]
      });
      toast.present();
    }
  }

}
