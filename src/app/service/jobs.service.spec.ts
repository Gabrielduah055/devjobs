import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Jobs } from '../types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


import { JobsService } from './jobs.service';

describe('JobsService', () => {
  let service: JobsService;
  let HttpClient:HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[JobsService]
    });
    service = TestBed.inject(JobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
