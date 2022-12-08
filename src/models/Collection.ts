import { HasId, Model, ModelAttributes } from './Model';
import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";


export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing(); // running after the on = this.events.on

  constructor(public rootUrl: string,
    /**
     * function that converts a property object K in the corresponding Model class T.
     */
    public deserialize: (json: K) => T) {

  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        const modelValue: T = this.deserialize(value);
        this.models.push(modelValue);
      });
      this.trigger('change');
    });
  }
}