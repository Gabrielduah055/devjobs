import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Jobs } from 'src/app/types';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the job logo', () => {
    const job:Jobs = {
      id: 1,
      logo: 'https://example.com/logo.png',
      postedAt: '1 day ago',
      contract: 'full time',
      position: 'frontend developer',
      location: 'New York',
      company: '',
      logoBackground: '',
      website: '',
      apply: '',
      description: '',
      requirements: {
        content:'requirment content',
        items:['requirement item1', 'requirement item 2']
      },
      role: {
        content: 'role 1',
        items:['role 2', 'role 3']
      }
    }

    component.job = job;
    fixture.detectChanges();
    const logo = fixture.nativeElement.querySelector('.logo img');
    expect(logo.src).toEqual(job.logo)
  })

  it('should display the job information', () => {
    const job :Jobs = {
      id: 1,
      logo: '',
      logoBackground: '#ff0000',
      postedAt: '1 day ago',
      contract: 'Full-time',
      position: 'Software Engineer',
      company: 'ACME Inc.',
      location: 'New York, NY',
      website: '',
      apply: '',
      description: '',
      requirements: {
        content:'requirment content',
        items:['requirement item1', 'requirement item 2']
      },
      role: {
        content: 'role 1',
        items:['role 2', 'role 3']
      }
    }
    component.job = job;
    fixture.detectChanges();
    const time = fixture.nativeElement.querySelector('.time span:first-child');
    expect(time.textContent).toContain(job.postedAt);

    const position = fixture.nativeElement.querySelector('h4');
    expect(position.textContent).toContain(job.position)

    const company = fixture.nativeElement.querySelector('p');
    expect (company.textContent).toContain(job.company)

    const location = fixture.nativeElement.querySelector('.location p');
    expect(location.textContent).toContain(job.location)
  })
});
