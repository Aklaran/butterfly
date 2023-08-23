import { ObjectId } from "mongodb";

export default class Trick {
  constructor(
    public name: string,
    public category: string,
    public id?: ObjectId
  ) {}
}
