import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  /**
   * 
   * @returns Don't know which are the keys, but they are strings; values are functions
   */
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#test': this.onButtonClick,
      'mouseenter:h1': this.onHoverHeader,
      'click:#set-age': this.onSetAgeClick,
      'click:#set-name': this.onSetNameClick
    };
  }

  onButtonClick(): void {
    console.log('Hi there!');
  }
  onHoverHeader(): void {
    console.log('H1 was hovered over!');
  };
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };
  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');

    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  }

  template(): string {
    return `
      <div>
        <h1>User form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input/>
        <button id="set-name">Change name</button>
        <button id="set-age">Set random age</button>
      </div>
    `;
  }


}