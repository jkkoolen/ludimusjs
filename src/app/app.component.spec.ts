import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('router-element'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected <router-element> text', () => {
    fixture.detectChanges();
    const router = de.nativeElement;
    expect(router.innerText).toMatch(/angular/i,
      '<h1> should say something about "Angular"');
  });
});
