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

 
  jobs!: Observable<Jobs[]>;
  startIndex = 0;
  itemsPerPage = 12;
  endIndex:number = this.itemsPerPage
  constructor(private JobsService:JobsService){}

  ngOnInit(): void {
     this.jobs = this.JobsService.getJobs()
  }

  loadMore():void {
    this.startIndex += this.itemsPerPage;
    this.endIndex += this.itemsPerPage
  }

  showLoadMoreButton(): boolean {
    return this.jobs ? this.endIndex < (this.jobs as any).length: true;
  }

 

  



 
}
