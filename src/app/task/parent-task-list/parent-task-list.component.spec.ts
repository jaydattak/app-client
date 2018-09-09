import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentTaskListComponent } from './parent-task-list.component';

describe('ParentTaskListComponent', () => {
  let component: ParentTaskListComponent;
  let fixture: ComponentFixture<ParentTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
