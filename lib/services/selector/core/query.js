export class Query {
  name;
  orderBy;
  wheres;

  constructor({ name, orderBy, wheres }) {
    this.name = name,
    this.orderBy = orderBy,
    this.wheres = wheres;
  }

  evaluate() {
    const wheres = this.wheres.map(({ field, operator, value }) => ({
      field,
      operator,
      value: typeof value === "function" ? value() : value,
    }));
    return { name: this.name, orderBy: this.orderBy, wheres };
  }
}
