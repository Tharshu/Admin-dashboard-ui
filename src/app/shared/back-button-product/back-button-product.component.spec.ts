import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButtonProductComponent } from './back-button-product.component';

describe('BackButtonProductComponent', () => {
  let component: BackButtonProductComponent;
  let fixture: ComponentFixture<BackButtonProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackButtonProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackButtonProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
