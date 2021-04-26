export default class Users {
  constructor() {
    this.users = [];
  }

  addUser = (id, name, room) => {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  };

  removeUser = id => {
    const user = this.getUser(id);
    if (user) this.users = this.users.filter(u => u.id !== id);
    return user;
  };

  getUser = id => this.users.find(user => user.id === id);

  getUserList = room => {
    const users = this.users.filter(user => user.room === room).map(user => user.name);
    return users;
  };
}
