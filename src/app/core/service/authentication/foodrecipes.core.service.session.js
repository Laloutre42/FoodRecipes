(function () {
  'use strict';

  angular.module('foodrecipes.core.service.session', [])
    .service('SessionService', function () {

      this.user = {
        id: null,
        name: null,
        role: null,
        email: null
      };

      this.create = function (id, name, role, email) {
        this.user.id = id;
        this.user.name = name;
        this.user.role = role;
        this.user.email = email;
      };

      this.destroy = function () {
        this.user.id = null;
        this.user.name = null;
        this.user.role = null;
        this.user.email = null;
      };

      this.getUser = function () {
        return (this.user.id !== null) ? this.user : null;
      };

    });
})();
