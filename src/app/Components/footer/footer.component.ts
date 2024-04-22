import { Component, OnInit } from '@angular/core';
import { Jobs } from 'src/app/types';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  jobDetail$!:Observable<Jobs>

  constructor(private jobService: JobsService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const jobId = params['id'];
      this.jobDetail$ = this.jobService.getJobById(jobId)
      console.log("job Id:", jobId)
    })
  }
}
