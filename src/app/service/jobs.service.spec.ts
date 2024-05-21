import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Jobs } from '../types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


import { JobsService } from './jobs.service';

describe('JobsService', () => {
  let service: JobsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[JobsService]
    });
    service = TestBed.inject(JobsService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retura an observable<JObs>', () => {
    const mockJobs: Jobs[] = [
      {
        id: 1, 
        position: 'job 1', 
        description: 'Description 1',
        company: 'company',
        logo: 'logo2.png',
        logoBackground: 'background2.png',
        postedAt: 'position 2',
        contract: '2024-05-16',
        location: 'location 2',
        website: 'website',
        apply: 'apply',
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

    service.getJobs().subscribe(jobs => {
      expect(jobs.length).toBe(1)
      expect(jobs).toEqual(mockJobs)
    });

    const req = httpTestingController.expectOne('https://64281ee346fd35eb7c4bfc31.mockapi.io/dev')
    expect(req.request.method).toBe('GET');

    req.flush(mockJobs)
  });

  it('should handle errors properly when fetching all jobs', () => {
    const errorMessage = '404 Not Found';

    service.getJobs().subscribe(
      () => fail('expected an error'),
      error => {
        expect(error).toBeTruthy();
        expect(error).toBe('Something went wrong while fetching jobs data. Please try again later.')
      }
    );

    const req = httpTestingController.expectOne('https://64281ee346fd35eb7c4bfc31.mockapi.io/dev');
    req.error(new ErrorEvent(errorMessage), {status:404});
  });

  it('should handle errors when getting a job by id', () => {
    const errorMessage = '404 Not Found';

    service.getJobById(1).subscribe(
      ()=> fail,
      error => {
        expect(error).toBeTruthy();
        expect(error).toBe('Something went wrong while fetching job data by ID. Please try again later')
      }
    )

    const req = httpTestingController.expectOne('https://64281ee346fd35eb7c4bfc31.mockapi.io/dev/1');
    req.error(new ErrorEvent(errorMessage), {status:404});
  })
});
