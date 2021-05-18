import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Test} from '../../../classes/test';
import {TestService} from '../../../services/test.service';

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.css']
})
export class TestEditComponent implements OnInit {
  test: Test = new Test();
  testId: string;

  testForm = this.fb.group({
    testName: [ '', Validators.required ],
    description: [ '', Validators.required ],
    sampleName: [ '', Validators.required ],
    unitPrice: [ '', Validators.required ],
  });

  constructor(private testService: TestService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.testId = this.route.snapshot.params['id'.toString()];
    this.testService.getTest(this.testId).subscribe(
      testData => {
        this.test = testData;
        console.log(this.test);
        this.testForm.patchValue({
          testName: this.test.testName,
          description: this.test.description,
          sampleName: this.test.sampleName,
          unitPrice: this.test.unitPrice
        });
      }
    );
  }

  update() {
    this.test = this.testForm.value;
    this.testService.updateTest(this.testId, this.test).subscribe(
      testData => {
        this.test = testData;
        this.testService.sendListUpdateAlert('Updated');
        this.goToList();
      }, error => console.log(error)
    );
  }

  onSubmit() {
    this.update();
  }

  goToList() {
    this.router.navigate([ 'tests/details', this.testId ]);
  }

  cancelAdd() {
    this.router.navigate([ 'tests' ]);
  }
}
