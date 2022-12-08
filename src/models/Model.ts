import { AxiosPromise, AxiosResponse } from 'axios';
/**
 * Use interface so that the implementation for the specific model class can change.
 */

export interface ModelAttributes<T> {
  set(update: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

type Callback = () => void;

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) { }


  /**
   * Returns the reference to the function on the Eventing class.
   * 
   * Can do this only because events and attributes are created directly in the constructor parameters.
   * If they where created inside the constructor body, that would throw an error, since in the compiled javascript
   * these declaration will be at the top of the constructor body, i.e. before the class is instantiated.
   */
  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;
  /* get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  } */

  set(update: T): void {
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