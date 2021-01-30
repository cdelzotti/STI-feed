import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageEditionComponent } from './message-edition.component';

describe('MessageEditionComponent', () => {
  let component: MessageEditionComponent;
  let fixture: ComponentFixture<MessageEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
