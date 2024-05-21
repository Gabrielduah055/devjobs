import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { JobsService } from 'src/app/service/jobs.service';
import { Jobs, Requirements } from 'src/app/types';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';




import { DetailsComponent } from './details.component';
import { ActivatedRoute } from '@angular/router';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let jobService:JobsService;

  const mockJobs:Jobs[] =[
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
  ]

  const mockJobsService = {
    getJobById:jasmine.createSpy('getJobById').and.returnValue(of(mockJobs[0])),
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports:[HttpClientTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers:[
        {provide:JobsService, useValue:mockJobsService},
        {provide: ActivatedRoute, useValue:{params:of({id:'123'})}}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    jobService = TestBed.inject(JobsService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getJobById with the correct jobID', () => {
    fixture.detectChanges();
    expect(mockJobsService.getJobById).toHaveBeenCalledWith('123')
  });

  it('should display job details', (done) => {
    fixture.detectChanges();
    component.jobDetail$.subscribe(() => {
      fixture.detectChanges()
      const compile = fixture.nativeElement;

      done()
    })
  })
});
