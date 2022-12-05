interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  // array of strings as key
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) { }

  get(propName: string): (string | number) {
    return this.data[propName];
  }

  set(update: UserProps): void {
    // copy props from the second object into the first object
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callback => {
      callback();
    });
  }
}