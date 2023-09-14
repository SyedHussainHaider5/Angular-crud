import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  _education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z]+$')]),
      lastName: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
      email: new FormControl('',[Validators.required,Validators.email]),
      dob: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      education: new FormControl('',[Validators.required]),
      company: new FormControl('',[Validators.required,Validators.pattern('^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+$')]),
      experience: new FormControl('',[Validators.required]),
      package: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._toastr.success('Employee updated successfully')
              // alert('Employee updated successfully ');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._toastr.success('Employee added successfully')
            // alert('Employee added successfully ' + val.firstName);
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  get firstName(){
    return this.empForm.get('firstName');
  }

  get lastName(){
    return this.empForm.get('lastName');
  }
  
  get email(){
    return this.empForm.get('email');
  }

  get dob(){
    return this.empForm.get('dob');
  }
  get gender(){
    return this.empForm.get('gender');
  }
  get education(){
    return this.empForm.get('education');
  }
  get company(){
    return this.empForm.get('company');
  }
  get experience(){
    return this.empForm.get('experience');
  }
  get package(){
    return this.empForm.get('package');
  }

}
