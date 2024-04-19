import { Component, Inject, OnInit, Renderer2, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'devjobs';

  theme: theme = this.getThemeFromLocalStorage() || 'light-theme';

  constructor(@Inject(DOCUMENT) private readonly document: Document, private readonly renderer:Renderer2) {}

  toggleTheme():void {
    const newTheme = this.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.document.body.classList.replace(this.theme, newTheme);
    this.theme = newTheme;
    this.addThemeLocalStorage(this.theme)
    console.log('click is worlig')
  }

  addThemeLocalStorage(theme: theme):void {
    localStorage.setItem('theme', theme);
  }

  getThemeFromLocalStorage(): theme {
    return localStorage.getItem('theme') as theme
  }

  
  ngOnInit(): void {
    this.renderer.addClass(this.document.body, this.theme)
  }
}

type theme = 'light-theme' | 'dark-theme';