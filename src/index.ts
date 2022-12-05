import axios from 'axios';

axios.post('http://localhost:3000/users', {
  name: 'myName',
  age: 20
}); 