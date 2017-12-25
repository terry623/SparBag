import {
  Meteor
} from 'meteor/meteor';
import {
  Template
} from 'meteor/templating';
import './index.html';

if (Meteor.isClient) {
  Template.register.events({
    'submit form': function (event) {
      event.preventDefault();
      var usernameVar = event.target.username.value;
      var emailVar = event.target.email.value;
      var password1Var = event.target.password1.value;
      var passportnumberVar = event.target.passportnumber.value;
      Accounts.createUser({
        username: usernameVar,
        email: emailVar,
        password: password1Var,
        profile: {
          passportnumber: passportnumberVar
        }
      });
    }
  });
  Template.login.events({
    'submit form': function (event) {
      event.preventDefault();
      var usernameVar = event.target.username.value;
      var passwordVar = event.target.password.value;
      Meteor.loginWithPassword(usernameVar, passwordVar);
    }
  });
}