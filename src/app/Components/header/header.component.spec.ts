import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents;

  });

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
   


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default theme as light-theme', () => {
    expect(component.theme).toBe('light-theme');
  })

  it('should emit switchTheme event when toggletheme is called',() => {
    spyOn(component.switchTheme, 'emit');
    component.toggleTheme();
    expect(component.switchTheme.emit).toHaveBeenCalledTimes(1)
  })

  it('should update theme when input changes', () => {
    component.theme = 'dark-theme';
    fixture.detectChanges();
    expect(component.theme).toBe('dark-theme');
  });
});
