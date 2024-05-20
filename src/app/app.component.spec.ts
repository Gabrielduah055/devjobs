import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { AppComponent } from './app.component';
import { Renderer2 } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


describe('AppComponent', () => {
  let component :AppComponent;
  let fixture:ComponentFixture<AppComponent>
  let docmentSpy:jasmine.SpyObj<Document>;
  let rendereSpy:jasmine.SpyObj<Renderer2>


  beforeEach(() => {
    const documentSpyObj = jasmine.createSpyObj('Document', ['body','querySelector', 'querySelectorAll']);
    documentSpyObj.body = document.createElement('div')
    documentSpyObj.body.classList = {replace:jasmine.createSpy}
    documentSpyObj.querySelector = jasmine.createSpy().and.returnValue(document.createElement('div'));
    documentSpyObj.querySelectorAll = jasmine.createSpy().and.returnValue([]);
    const rendereSpyObj = jasmine.createSpyObj('Rederer2', ['addClass', 'removeClass']);

    TestBed.configureTestingModule({
      declarations:[AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports:[
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule
      ],
      providers:[
        {provide:DOCUMENT, useValue:documentSpyObj},
        {provide: Renderer2, useValue:rendereSpyObj}
      ]
    })
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    docmentSpy = TestBed.inject(DOCUMENT) as jasmine.SpyObj<Document>;
    rendereSpy = TestBed.inject(Renderer2) as jasmine.SpyObj<Renderer2>;
  })

  it('should toggle theme correctly', () => {
    const initialTheme = component.theme;
    const newTheme = initialTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    const isLightTheme = initialTheme === 'light-theme' && newTheme === 'dark-theme';
  
    component.toggleTheme();
  
    expect(docmentSpy.body.classList.replace).toHaveBeenCalledWith(initialTheme, newTheme);
    expect(component.theme).toEqual(newTheme);
    expect(localStorage.getItem('theme')).toEqual(newTheme);
  
    const toggleInside = docmentSpy.body.querySelector('.toggle-inside') as HTMLElement;
    if (isLightTheme) {
      expect(toggleInside.style.left).toEqual('70%');
    } else {
      expect(toggleInside.style.left).toEqual('25%');
    }
  });

  it('should add theme to local storage', () => {
    const theme = 'dark-theme';
    component.addThemeLocalStorage(theme);
    expect(localStorage.getItem('theme')).toEqual(theme)
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'devjobs'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('devjobs');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('devjobs app is running!');
  // });
});
