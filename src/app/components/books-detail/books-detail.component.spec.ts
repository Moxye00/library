import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDetailComponent } from './books-detail.component';

describe('BooksDetailComponent', () => {
  let component: BooksDetailComponent;
  let fixture: ComponentFixture<BooksDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksDetailComponent]
    });
    fixture = TestBed.createComponent(BooksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
