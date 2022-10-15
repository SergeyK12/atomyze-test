import { Component, OnInit, OnDestroy, DoCheck, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from './api.service';
import { DialogService } from './dialog.service';
import { AlertDialogComponent } from './alert/alert-dialog.component';
import { Subject, Subscription, SubscriptionLike, interval } from 'rxjs';
import { takeUntil, map, startWith, switchMap } from 'rxjs/operators';

export class Valuta{
    constructor(
      public name: string,
      public nominal: number,
      public value: number
    ){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnChanges, OnInit, DoCheck, OnDestroy {

  obje: SubscriptionLike;
  subscriptions: SubscriptionLike[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  infoObj: any;
  sum: any;
  interval: any;

  naga = 1;

  constructor(
    // private obje: Subscription,
    private api: ApiService,
    private dialogService: DialogService
  ){
  }

  sub() {
    // console.log(this.subscriptions);
    // console.log(this.obje);
    this.naga = 2;
  }
  unsub() {
    this.obje.unsubscribe();
    console.log(this.obje);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  upload(alert: boolean) {
    console.log(this.subscriptions);
    this.subscriptions.push(
      this.obje = interval(5000).pipe(
        takeUntil(this.destroy$),
        startWith(() => this.api.exchangeRates()),
        switchMap(() => this.api.exchangeRates()),
        map((val: any): any => {
          return val['Valute'];
        })
      ).subscribe(
        (resp) => {
          this.infoObj = resp;
          if (alert) {
            this.obje.unsubscribe();
            const data = {
              'title': 'Список успешно обновлен',
              confirmButtonText: 'OK'
            };
            this.dialogService.openDialog(AlertDialogComponent, data);
          }
        }, () => {
          const data = {
            'title': 'Произошла ошибка. Попробуйте обновить страницу',
            confirmButtonText: 'OK'
          };
          this.dialogService.openDialog(AlertDialogComponent, data);
        }
      )
    );
  }

  objectKeys(obj: object) {
    return Object.keys(obj);
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngOnInit() {
    setTimeout(()=>{
      this.naga = 2;
    },2000)
    // this.interval = setInterval(() => {
    //   this.upload(false);
    // }, 10000);
    // this.upload(false);
  }

  ngDoCheck() {
    console.log('ngDoCheck');
  }

  ngOnDestroy() {
    // clearInterval(this.interval);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    // this.obje.unsubscribe();
  }
}
