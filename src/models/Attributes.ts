import { UserProps } from "./User";

export class Attributes<T> {
  constructor(private data: T) { }

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set(update: T): void {
    // copy props from the second object into the first object
    Object.assign(this.data as Object, update);
  }
}


const attrs = new Attributes<UserProps>({
  id: 5,
  age: 10,
  name: 'Carlo'
});

const name = attrs.get('name');
const age = attrs.get('age');
const id = attrs.get('id');
// const notExisting = attrs.get('notExisting'); // type error here! Not a field in UserProps