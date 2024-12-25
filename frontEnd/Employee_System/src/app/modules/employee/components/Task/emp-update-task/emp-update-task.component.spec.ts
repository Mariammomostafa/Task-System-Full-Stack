import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpUpdateTaskComponent } from './emp-update-task.component';

describe('EmpUpdateTaskComponent', () => {
  let component: EmpUpdateTaskComponent;
  let fixture: ComponentFixture<EmpUpdateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpUpdateTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpUpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
