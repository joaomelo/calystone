export class Query {
  name;
  orderBy;
  wheres;

  constructor({ name, orderBy, wheres }) {
    this.name = name,
    this.orderBy = orderBy,
    this.wheres = wheres;
  }
}
