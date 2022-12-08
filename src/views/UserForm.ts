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
      'click:#set-name': this.onSetNameClick,
      'click:#save-model': this.onSaveClick
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
  onSaveClick = (): void => {
    this.model.save();
  }

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get("name")}"/>
        <button id="set-name">Change name</button>
        <button id="set-age">Set random age</button>
        <button id="save-model">Save user</button>
      </div>
    `;
  }


}