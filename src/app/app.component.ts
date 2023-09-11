import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CronService } from './shared/service/cron/cron.service';
import { SystemAction } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  constructor(
      private store: Store,
      private cronService: CronService,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new SystemAction.ResetConfig());
    let cronJob = this.cronService.createJob('* * * * * *', () => {
      this.store.dispatch(new SystemAction.UpdateSystemTime(new Date().getTime()));
    });
    this.cronService.putJob(`systemTimeJob`, cronJob);
    cronJob.start();
  }
}
