import { User } from "../models/User";

export class UserForm {

  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

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

  template(): string {
    return `
      <div>
        <h1>User form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input/>
        <button id="test">Click me</button>
        <button id="set-age">Set random age</button>
      </div>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}