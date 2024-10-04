import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersConsultationsComponent } from './users-consultations.component';

describe('UsersConsultationsComponent', () => {
  let component: UsersConsultationsComponent;
  let fixture: ComponentFixture<UsersConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersConsultationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
