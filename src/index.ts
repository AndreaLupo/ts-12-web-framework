import { UserForm } from "./views/UserForm";
import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";

const user = User.buildUser({ name: 'Andrea', age: 12 });

const root = document.getElementById('root');

if (root) {
  const userForm = new UserForm(
    root,
    user
  );
  userForm.render();
} else {
  throw new Error('Root element not found');
}

if (root) {
  const userEdit = new UserEdit(
    root,
    user
  );
  userEdit.render();
  console.log(userEdit);
} else {
  throw new Error('Root element not found');
}
