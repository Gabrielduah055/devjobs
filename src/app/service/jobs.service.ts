import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Jobs } from '../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class JobsService {

  private jsonUrl = 'https://64281ee346fd35eb7c4bfc31.mockapi.io/dev';
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  public isDarkTheme$ = this.isDarkTheme.asObservable()

  constructor(private http: HttpClient) { }

  toggleTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.value)
  }

  getJobs() :Observable<Jobs[]> {
    return this.http.get<Jobs[]>(this.jsonUrl)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message)
    } else {
      console.error(
        `Status code ${error.status} ` + 
        `body was: ${error.error}` 
      )
    }
    return throwError(()=> 'Something went wrong while fetching jobs data. Please try again later.')
  }

  getJobById(id:number): Observable<Jobs> {
    const url = `${this.jsonUrl}/${id}`;
    return this.http.get<Jobs>(url).pipe(
      catchError(this.handleError)
    )
  }


}
