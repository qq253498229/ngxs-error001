import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CronAction, CronSelector } from '../../../store/cron';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';

@Component({
  selector: 'app-edit-drawer',
  templateUrl: './edit-drawer.component.html',
  styleUrls: ['./edit-drawer.component.scss'],
})
export class EditDrawerComponent implements OnInit {
  myForm = this.fb.group({
    id: [''],
    cron: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });
  @AutoUnsubscribe() cronDrawerFlag$ = this.store.select(CronSelector.cronDrawerFlag);

  constructor(
      private fb: FormBuilder,
      private store: Store,
      private ref: NzDrawerRef,
  ) {
  }

  ngOnInit(): void {
    //触发全部校验规则，显示错误信息
    this.myForm.markAllAsTouched();
    this.cronDrawerFlag$.subscribe(r => {
      if (!r) this.ref.close();
    });
  }

  submitForm() {
    this.store.dispatch(new CronAction.Save());
  }

}
