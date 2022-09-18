import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopNavComponent } from './shop-nav.component';

describe('ShopNavComponent', () => {
  let component: ShopNavComponent;
  let fixture: ComponentFixture<ShopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
