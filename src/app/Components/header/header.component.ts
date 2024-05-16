import { Component, Output, EventEmitter, Input } from '@angular/core';


enum theme{
  LightTheme = 'light-theme',
  DarkTheme = 'dark-theme'
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {



  @Input() theme:string = theme.LightTheme;
  @Output() switchTheme = new EventEmitter<void>();

  toggleTheme():void {
    this.switchTheme.emit();
  }
  
}
