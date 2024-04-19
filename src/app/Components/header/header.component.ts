import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() theme:string = 'light-theme';
  @Output() switchTheme = new EventEmitter();

  toggleTheme():void {
    this.switchTheme.emit();
  }
  
}
