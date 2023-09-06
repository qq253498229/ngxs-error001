import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
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
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new SystemAction.ResetConfig());
  }
}
