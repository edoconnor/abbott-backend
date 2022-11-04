import mongodb from "mongodb";

export interface State {
  name: string;
  capital: string;
  postal: string;
  standard: string;
  plates: string;
  _id?: mongodb.ObjectId;
}
