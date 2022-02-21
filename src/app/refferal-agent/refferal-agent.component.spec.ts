import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferalAgentComponent } from './refferal-agent.component';

describe('RefferalAgentComponent', () => {
  let component: RefferalAgentComponent;
  let fixture: ComponentFixture<RefferalAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefferalAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferalAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
