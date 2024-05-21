import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JobsService } from 'src/app/service/jobs.service';
import { Jobs } from 'src/app/types';
import {animate, style, transition, trigger} from '@angular/animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms ease-out', style({opacity: 1})),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({opacity:0}))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  searchTitle:string = '';
  searchLocation: string = '';
  fullTimeOnly:boolean = false;
  searchedJobs: Jobs[] = [];
  countries:string[] = [];
  selectedCountry: string = '';
  
  jobs!: Observable<Jobs[]>;
  startIndex = 0;
  itemsPerPage = 12;
  endIndex:number = this.itemsPerPage;
  showDropDown:boolean = true;
  showLoadMore = true;
  showLocationDropdown:boolean = true
  showOverlay:boolean = true;


  constructor(private JobsService:JobsService){}



  ngOnInit(): void {
     this.jobs = this.JobsService.getJobs()
     this.search();

     this.JobsService.getJobCountries().subscribe((countries) => {
      this.countries = countries
     })
  }



  

  loadMore():void {
    this.endIndex += 1;

  }

  showLoadMoreButton(): boolean {
    return this.searchedJobs.length > this.endIndex;
  }

  search(): void {
    this.jobs.subscribe(jobs => {
      this.searchedJobs = jobs.filter(job => {
        let titleMatch =  job.position.toLowerCase().includes(this.searchTitle.toLowerCase());
        let locationMatch = this.selectedCountry === '' || job.location.toLowerCase().includes(this.selectedCountry.toLowerCase());
        let fullTimeMatch = !this.fullTimeOnly || !job.contract || job.contract.toLowerCase() === 'full time';

        return titleMatch && locationMatch && fullTimeMatch
      })

      this.showLoadMore = false
      this.showDropDown = !this.showDropDown
    })


  }

  toggleDropdown() {
    this.showDropDown = !this.showDropDown
  }

  close():void {
    this.showDropDown = false
  }

 

 
}
