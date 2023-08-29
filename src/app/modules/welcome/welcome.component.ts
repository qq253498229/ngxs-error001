import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  constructor(
      private notification: NotificationService,
  ) {
  }

  ngOnInit() {
  }

  test() {
    this.notification.create(`这是标题`, `这是提醒内容`);
  }

}
