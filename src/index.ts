/* import axios from 'axios';

axios.post('http://localhost:3000/users', {
  name: 'myName',
  age: 20
});  */

/* import { User } from "./models/User";

const user = new User({ id: 1 });

// user.fetch();

// update user
user.set({ name: 'NEW NAME', age: 40 });
user.save();

// new user
const baby = new User({ name: 'Carletto', age: 2 });
baby.save();


user.events.on('change', () => {
  console.log('change!');
});
user.events.trigger('change'); */

import { User } from "./models/User";

const user = new User({ name: 'Other one', age: 1 });

/* BAD!!!! 
user.attributes.get('id')
user.attributes.get('name')
user.attributes.get('age')

user.sync.save(...); 
*/

user.on('change', () => {
  console.log('changed!');
});

console.log(user.get('name'));

// user.trigger('change');
user.set({ name: 'New name' });