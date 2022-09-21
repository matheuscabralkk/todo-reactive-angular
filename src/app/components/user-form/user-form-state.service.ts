import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";

@Injectable()
export class UserFormStateService {

  createUserForm = new FormGroup({
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

  constructor() { }

  patchForm(user: User) {
    this.createUserForm.patchValue({
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

  }
}
