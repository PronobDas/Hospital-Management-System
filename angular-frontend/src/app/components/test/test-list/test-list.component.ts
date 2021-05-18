import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Test} from '../../../classes/test';
import {TestService} from '../../../services/test.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  tests: Observable<Test[]>;

  constructor(private testService: TestService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.subscription = this.testService.getListUpdateAlert().subscribe(
      (message) => {
        if (message) {
          this.reloadData();
        }
      }
    );
  }

  reloadData() {
    this.tests = this.testService.getAllTest();
  }

  testDetails(id: string) {
    this.router.navigate([ 'details', id ], { relativeTo: this.route });
  }

  addTest() {
    this.router.navigate([ 'add' ], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
