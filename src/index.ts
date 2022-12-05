import { User } from "./models/User";

const user = new User({ name: 'mnef', age: 12 });

console.log(user.get('name'), user.get('age'));