import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsuComponent } from './dsu.component';

describe('DsuComponent', () => {
  let component: DsuComponent;
  let fixture: ComponentFixture<DsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
