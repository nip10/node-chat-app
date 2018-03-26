"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = function Users() {
  var _this = this;

  _classCallCheck(this, Users);

  this.addUser = function (id, name, room) {
    var user = { id: id, name: name, room: room };
    _this.users.push(user);
    return user;
  };

  this.removeUser = function (id) {
    var user = _this.getUser(id);
    if (user) _this.users = _this.users.filter(function (u) {
      return u.id !== id;
    });
    return user;
  };

  this.getUser = function (id) {
    return _this.users.filter(function (user) {
      return user.id === id;
    })[0];
  };

  this.getUserList = function (room) {
    var users = _this.users.filter(function (user) {
      return user.room === room;
    });
    var namesArray = users.map(function (user) {
      return user.name;
    });
    return namesArray;
  };

  this.users = [];
};

module.exports = { Users: Users };