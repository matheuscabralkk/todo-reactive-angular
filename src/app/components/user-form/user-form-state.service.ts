import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {map, Observable, of, Subject, tap} from "rxjs";

export interface UserFormState {
  form: FormGroup;
}

@Injectable()
export class UserFormStateService {

  public state$: Observable<UserFormState>;

  public formPatch$ = new Subject<User>();

  private form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    username: new FormControl('', [
      Validators.required,
    ]),
    street: new FormControl('', [
      Validators.required,
    ]),
    suite: new FormControl('', [
      Validators.required,
    ]),
    city: new FormControl('', [
      Validators.required,
    ]),
    zipcode: new FormControl('', [
      Validators.required,
    ]),
    lat: new FormControl(null, [
      Validators.required,
    ]),
    lng: new FormControl(null, [
      Validators.required,
    ]),
  });

  constructor() {
    this.state$ = of(this.form).pipe(
      map((form) => ({
        form
      }))
    );
    this.formPatchWatcher().subscribe();
  }

  private formPatchWatcher() {
    return this.formPatch$.pipe(
      tap((user) => {
        this.form.patchValue({
          name: user.name,
          email: user.email,
          username: user.username,
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
          lat: user.address.geo.lat,
          lng: user.address.geo.lng
        });
      })
    )
  }
}
