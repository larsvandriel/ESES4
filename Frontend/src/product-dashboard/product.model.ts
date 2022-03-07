export class Product {
  id?: string;
  name?: string;
  description?: string;
  eanNumber?: string;
  price?: number;
  imageLocation?: string;
  timeCreated?: Date;
  deleted?: boolean;
  timeDeleted?: Date;

  constructor(
    id?: string,
    name?: string,
    description?: string,
    eanNumber?: string,
    price?: number,
    imageLocation?: string,
    timeCreated?: Date,
    deleted?: boolean,
    timeDeleted?: Date
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.eanNumber = eanNumber;
    this.price = price;
    this.imageLocation = imageLocation;
    this.timeCreated = timeCreated;
    this.deleted = deleted;
    this.timeDeleted = timeDeleted;
  }
}
