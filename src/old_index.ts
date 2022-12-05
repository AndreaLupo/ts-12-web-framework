import { User } from "./models/User";

const user = new User({ name: 'mnef', age: 12 });
user.set({ name: 'newName' });

console.log(user.get('name'), user.get('age'));

user.on('change', () => {
  console.log('change1');
});
user.on('change', () => {
  console.log('change2');
});
user.on('save', () => {
  console.log('Save was triggered!');
});

user.trigger('save');