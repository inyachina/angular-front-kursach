import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.components.scss']
})
export class LoginComponent implements OnInit {
  @Output() goToRegistrationEvent = new EventEmitter();

  public loginFormGroup = this._fb.group({
    loginControl: [null, Validators.required],
    passwordControl: [null, Validators.required],
  });
  public isHidden = true;

  constructor(private _fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  public _goToRegistration() {
    this.goToRegistrationEvent.emit();
  }
}
