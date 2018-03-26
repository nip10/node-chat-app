'use strict';

var _users = require('./users');

describe('Users', function () {
  var users = void 0;
  beforeEach(function () {
    users = new _users.Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('should add new user', function () {
    var user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office Fans'
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toContainEqual(expect.objectContaining(user));
  });

  it('should remove a user', function () {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user that does not exist', function () {
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', function () {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find a user that does not exist', function () {
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toBeUndefined();
  });

  it('should return names for node course', function () {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', function () {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });
});