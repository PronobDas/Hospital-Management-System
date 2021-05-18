import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Test} from '../../../classes/test';
import {TestService} from '../../../services/test.service';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.css']
})
export class TestAddComponent implements OnInit {
  test = new Test();
  testId: string;
  submitted = false;

  // Build Report Form
  testForm = this.fb.group({
    testName: [ '', Validators.required ],
    description: [ '', Validators.required ],
    sampleName: [ '', Validators.required ],
    unitPrice: [ '', Validators.required ],
  });

  constructor(private testService: TestService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    this.test = this.testForm.value;
    this.testService.createTest(this.test).subscribe(
      testData => {
        this.test = testData;
        console.log(this.test);
        this.testId = this.test.id;
        this.test = new Test();
        this.testService.sendListUpdateAlert('Added');
        this.goToList();
      }, error => console.log(error)
    );
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  goToList() {
    this.router.navigate([ 'tests/details', this.testId ]);
  }

  cancelAdd() {
    this.router.navigate([ 'tests' ]);
  }

}
