import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Create a Form with the following Controls and Validators
  // 1) Project Name (should not be empty)
  // 2) Mail (should not be a empty and a valid email)
  // 3) Project Status Dropdown, with three values: 'Stable', 'Critical', 'Finished'
  // 4) Submit Button

  // Add your own Validator which doesn't allow "Test" as a Project Name

  // Also implement that Validator as an async Validator (replace the other one)

  // Upon submitting the form, simply print the value to the console

  //  create form
  newProjectForm: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished']

  forbiddenName = 'Test';

  ngOnInit() {
    this.newProjectForm = new FormGroup({
      // 'projectName': new FormControl(null, [Validators.required, this.forbiddenProject.bind(this)]),
      'projectName': new FormControl(null, Validators.required, this.forbiddenProjectAsync.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    })
    // this.newProjectForm.statusChanges.subscribe((state) => {
    //   console.log(state);
    // });
  }

  onSubmit() {
    console.log('Submitted');
    // console.log(this.newProjectForm.value);
    console.log(this.newProjectForm);

  }

  // custom validator
  forbiddenProject(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenName.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  // Custom async Validator
  forbiddenProjectAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === this.forbiddenName) {
          resolve({ 'nameIsForbidden': true })
        } else {
          resolve(null)
        }
      }, 1500)
    })
    return promise;
  }

}
