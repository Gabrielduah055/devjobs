import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Jobs } from 'src/app/types';
import { JobsService } from 'src/app/service/jobs.service';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let jobsServiceSpy : jasmine.SpyObj<JobsService>

  beforeEach(() => {

    const jobsServiceSpyObj = jasmine.createSpyObj('JobsService', ['getJobById']);

    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers:[
        {provide:JobsService, useValue:jobsServiceSpyObj},
        {
          provide:ActivatedRoute,
          useValue: {
            params:of({id:1})
          }
        }
      ]
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    jobsServiceSpy = TestBed.inject(JobsService) as jasmine.SpyObj<JobsService>
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch job detail on component initialization', () => {
    const mockJob: Jobs = {
      id: 1,
      company: '',
      logo: '',
      logoBackground: '',
      position: '',
      postedAt: '',
      contract: '',
      location: '',
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

    jobsServiceSpy.getJobById.and.returnValue(of(mockJob));
    component.ngOnInit();

    expect(jobsServiceSpy.getJobById).toHaveBeenCalledOnceWith(1)
    expect(component.jobDetail$).toBeTruthy();
    component.jobDetail$.subscribe((job) => {
      expect(job).toEqual(mockJob)
    })
  })

  it('shoulud handle error when fetching job detail', () => {
    const errorMessage = '404 Not Found';
    jobsServiceSpy.getJobById.and.throwError(errorMessage);
  })
});
