import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  searchedJobs: Jobs[] = []
 
  jobs!: Observable<Jobs[]>;
  startIndex = 0;
  itemsPerPage = 12;
  endIndex:number = this.itemsPerPage;
  showDropDown:boolean = true;
  showLoadMore = true;

  showOverlay:boolean = true;


  constructor(private JobsService:JobsService){}

  ngOnInit(): void {
     this.jobs = this.JobsService.getJobs()
     this.search();
  }

  loadMore():void {
    this.endIndex += this.itemsPerPage;

  }

  showLoadMoreButton(): boolean {
    return this.jobs ? this.endIndex < this.searchedJobs.length : false;
  }

  search(): void {
    this.jobs.subscribe(jobs => {
      this.searchedJobs = jobs.filter(job => {
        let titleMatch = !this.searchTitle || job.position.toLowerCase().includes(this.searchTitle.toLowerCase());
        let locationMatch = !this.searchLocation || job.location.toLowerCase().includes(this.searchLocation.toLowerCase());
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


 

 
}
