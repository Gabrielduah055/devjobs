import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { JobsService } from 'src/app/service/jobs.service';
import { Jobs, Requirements } from 'src/app/types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  jobDetail$!:Observable<Jobs>
  jobRequirement!:Observable<Requirements>


  constructor(private JobsService: JobsService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const jobId = params['id'];
        this.jobDetail$ = this.JobsService.getJobById(jobId)
        console.log("job Id:", jobId)
      })
  }
}
