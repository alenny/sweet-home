import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnChineseComponent } from './learn-chinese.component';

describe('LearnChineseComponent', () => {
  let component: LearnChineseComponent;
  let fixture: ComponentFixture<LearnChineseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnChineseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnChineseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
