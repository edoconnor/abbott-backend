import mongodb from "mongodb";

export interface State {
  name: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  capital: string;
  plates: string;
  flags: string;
  _id?: mongodb.ObjectId;
}
