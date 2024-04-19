import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JobsService } from 'src/app/service/jobs.service';
import { Jobs } from 'src/app/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTitle:string = '';
  searchLocation: string = '';
  fullTimeOnly:boolean = false;
  searchedJobs: Jobs[] = []
 
  jobs!: Observable<Jobs[]>;
  startIndex = 0;
  itemsPerPage = 12;
  endIndex:number = this.itemsPerPage
  constructor(private JobsService:JobsService){}

  ngOnInit(): void {
     this.jobs = this.JobsService.getJobs()
     this.search();
  }

  loadMore():void {
    this.startIndex += this.itemsPerPage;
    this.endIndex += this.itemsPerPage
  }

  showLoadMoreButton(): boolean {
    return this.jobs ? this.endIndex < (this.jobs as any).length: true;
  }

  search(): void {
    this.jobs.subscribe(jobs => {
      this.searchedJobs = jobs.filter(job => {
        let titleMatch = job.position.toLowerCase().includes(this.searchTitle.toLowerCase());
        let locationMatch = job.location.toLowerCase().includes(this.searchLocation.toLowerCase());
        let fullTimeMatch = !this.fullTimeOnly || job.contract;

        return titleMatch && locationMatch && fullTimeMatch
      })
    })
  }


 
}
