import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Test} from '../../../classes/test';
import {TestService} from '../../../services/test.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {

  testId: string;
  test: Test;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private testService: TestService) {
  }

  ngOnInit(): void {
    this.test = new Test();
    this.route.params.subscribe(
      (params: Params) => {
        this.testId = params['id'.toString()];
        this.testService.getTest(this.testId).subscribe(
          testData => {
            this.test = testData;
          }
        );
      }
    );
  }

  deleteTest(id: string) {
    this.testService.deleteTest(id).subscribe(
      data => {
        this.testService.sendListUpdateAlert('Deleted');
      },
      error => console.log(error)
    );
    this.router.navigate([ 'tests' ]);
  }

  updateTest(id: string) {
    this.router.navigate([ 'tests/update', id ]);
  }
}
