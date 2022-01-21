import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Output() goToLoginEvent = new EventEmitter();
  public regFormGroup = this._fb.group({
      loginControl: [null, Validators.required],
      passwordControl: [null, Validators.required],
      emailControl: [null, Validators.required],
      phoneControl: [null, Validators.required],
    }
  );
  public isHiddenPassword = false;
  public isHumanIdentified = false;

  constructor(
    private _fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
  }

  public _goToLogin() {
    this.goToLoginEvent.emit();
  }
}
