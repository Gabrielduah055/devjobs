import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  let component :AppComponent;
  let fixture:ComponentFixture<AppComponent>
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'devjobs'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('devjobs');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('devjobs app is running!');
  });


  it('should toggle theme when toggleTheme method is called', () => {
    const initialTheme = component.theme;
    component.toggleTheme();
    expect(component.theme).not.toEqual(initialTheme)

    expect(document.body.classList.contains(component.theme)).toBeTruthy();
  })
  
  it('should update localstorage when toggletheme method is called', () => {
    spyOn(localStorage, 'setItem');
    component.toggleTheme();
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', component.theme)
  })

  it('should initialize witht he correct theme class added to body', () => {
    const getThemeFromLocalStorage = localStorage.getItem('theme') || 'light-theme';
    expect(document.body.classList.contains(getThemeFromLocalStorage)).toBeTruthy()
  })
});
