import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  /* 
  on(eventName: string, callback: Callback): void {
    this.events.on(eventName, callback);
  }
  */

  /**
   * Returns the reference to the function on the Eventing class.
   */
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll()).then((response: AxiosResponse): void => {
      this.trigger('save');
    })
      .catch(() => {
        this.trigger('error');
      })
  }
}

/**
 * Reminder of how 'this' works in javascript:
 * 
 */

/*
const colors = {
  color: 'red',
  printColor() {
    console.log(this.color);
  }
};
colors.printColor(); // ok!

const printColor = colors.printColor;
printColor(); // ACCESS error on this.color!!
*/