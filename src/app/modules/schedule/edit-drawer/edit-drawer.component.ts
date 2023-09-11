import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CronAction, CronSelector } from '../../../store';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { uuid } from '../../../shared/utils/common';
import { Observable, Observer } from 'rxjs';
import { CronService } from '../../../shared/service/cron/cron.service';

@Component({
  selector: 'app-edit-drawer',
  templateUrl: './edit-drawer.component.html',
  styleUrls: ['./edit-drawer.component.scss'],
})
export class EditDrawerComponent implements OnInit {
  private cronValidator = (control: UntypedFormControl) => new Observable((observer: Observer<ValidationErrors | null>) => {
    if (this.cronService.checkExpression(control.value)) {
      observer.next(null);
    } else {
      observer.next({error: true, formatError: true});
    }
    observer.complete();
  });

  myForm = this.fb.group({
    id: [uuid()],
    cron: ['* * * * * *', [Validators.required], [this.cronValidator]],
    message: ['提示消息', [Validators.required]],
  });
  @AutoUnsubscribe() cronDrawerFlag$ = this.store.select(CronSelector.cronDrawerFlag);

  constructor(
      private fb: FormBuilder,
      private store: Store,
      private ref: NzDrawerRef,
      private cronService: CronService,
  ) {
  }

  ngOnInit(): void {
    this.cronDrawerFlag$.subscribe(r => {
      if (!r) this.ref.close();
    });
  }

  submitForm() {
    this.store.dispatch(new CronAction.Save());
  }

}
