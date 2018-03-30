import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeInfosComponent} from './home-infos.component';

describe('HomeInfosComponent', () => {
  let component: HomeInfosComponent;
  let fixture: ComponentFixture<HomeInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeInfosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
