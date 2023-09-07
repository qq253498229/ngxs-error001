import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDrawerComponent } from './edit-drawer.component';

describe('EditDrawerComponent', () => {
  let component: EditDrawerComponent;
  let fixture: ComponentFixture<EditDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDrawerComponent]
    });
    fixture = TestBed.createComponent(EditDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
