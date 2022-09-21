import {Address} from "../../models/address";

export type NewUserDialogDTO = {
  id: number;
  name: string;
  username: string;
  email: string;
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  lat: number,
  lng: number
  editMode: boolean;
}
