import { User } from "./models/User";

const user = new User({ name: 'mnef', age: 12 });
user.set({ name: 'newName' });

console.log(user.get('name'), user.get('age'));