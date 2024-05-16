import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable, catchError, map, throwError } from 'rxjs';
import { Jobs } from '../types';


@Injectable({
  providedIn: 'root'
}) 
export class JobsService {

  private jsonUrl = 'https://64281ee346fd35eb7c4bfc31.mockapi.io/dev';


  constructor(private http: HttpClient) { }

  

  getJobs() :Observable<Jobs[]> {
    return this.http.get<Jobs[]>(this.jsonUrl)
    .pipe(
      catchError(this.handleJobsError)
    )
  }


  private handleJobsError(error:HttpErrorResponse): Observable<never> {
    console.error('error occurred while fetching jobs:', error);
    return throwError(() => 'Something went wrong while fetching jobs data. Please try again later.')
  }

  private handleJobsByIdError(error:HttpErrorResponse): Observable<string> {
    console.error('error occurd while fetching jobs by ID:', error);
    return throwError('Something went wrong while fetching job data by ID. Please try again later')
  }

  getJobById(id: number): Observable<Jobs> {
    const url = `${this.jsonUrl}/${id}`;
    return this.http.get<Jobs>(url).pipe(
      catchError(error => this.handleJobsByIdError(error).pipe(map(errorMessage => {
        throw new Error(errorMessage);
      })))
    )
  }


}
