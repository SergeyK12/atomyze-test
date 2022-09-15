import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { DialogService } from './dialog.service';
import { AlertDialogComponent } from './alert/alert-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  infoObj: any;
  sum: any;
  interval: any;

  constructor(
    private api: ApiService,
    private dialogService: DialogService
  ){}

  upload(alert: boolean) {
    this.api.exchangeRates().subscribe(
      (resp) => {
        this.infoObj = resp;
        if (alert) {
          const data = {
            'title': 'Список успешно обновлен',
            confirmButtonText: 'OK'
          };
          this.dialogService.openDialog(AlertDialogComponent, data);
        }
      }, () => {
        clearInterval(this.interval);
        const data = {
          'title': 'Произошла ошибка. Попробуйте обновить страницу',
          confirmButtonText: 'OK'
        };
        this.dialogService.openDialog(AlertDialogComponent, data);
      }
    );
  }

  objectKeys(obj: object) {
    return Object.keys(obj);
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.upload(false);
    }, 10000);
    this.upload(false);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
