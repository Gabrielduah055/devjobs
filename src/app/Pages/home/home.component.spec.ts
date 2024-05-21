import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HomeComponent } from './home.component';
import { JobsService } from 'src/app/service/jobs.service';
import { Jobs } from 'src/app/types';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let jobService : JobsService;
  const mockJobs:Jobs[] = [
    {
      position: 'Midweight Front-end', 
      location: 'United States', 
      contract: 'Full Time',
      id: 0,
      company: '',
      logo: '',
      logoBackground: '',
      postedAt: '',
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
    },
    {
      position: 'Fullstack Developer', 
      location: 'New Zealand', 
      contract: 'Part Time',
      id: 0,
      company: '',
      logo: '',
      logoBackground: '',
      postedAt: '',
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
  ];

  const mockCountries:string[] = ['United States', 'Russia', 'Japan', 'Germany', 'New Zealand']

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        BrowserAnimationsModule
      ], 
      declarations:[HomeComponent],
      providers:[JobsService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    jobService = TestBed.inject(JobsService)
    

    spyOn(jobService, 'getJobs').and.returnValue(of(mockJobs));
    spyOn(jobService,'getJobCountries').and.returnValue(of(mockCountries))

    fixture.detectChanges()
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search and getJobCountries on ngOnInit', () => {
    spyOn(component, 'search');
    component.ngOnInit();
    expect(component.search).toHaveBeenCalled();
    expect(jobService.getJobCountries).toHaveBeenCalled()
  })

  it('should search jobs based on criteria', fakeAsync(() => {
    component.searchTitle = 'Fullstack Developer';
    component.selectedCountry = 'New Zealand';
    component.fullTimeOnly = true;
    component.search();
    tick()

    expect(component.searchedJobs.length).toBe(0);
    if(component.searchedJobs.length > 0){
      expect(component.searchedJobs[0].position).toBe('Fullstack Developer')
    }
    
  }));

  it('should close the dropdown', () => {
    component.showDropDown = true;
    component.close();
    expect(component.showDropDown).toBe(false)
  })

  it('should sow load more button only if there are more jobs to load', () => {
    component.searchedJobs = mockJobs;
    component.endIndex = 1;
    expect(component.showLoadMoreButton()).toBe(true);

    component.endIndex = 2;
    expect(component.showLoadMoreButton()).toBe(false)
  })
});
