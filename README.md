# accounts-phony [![Build Status](https://travis-ci.org/cjsauer/accounts-phony.svg?branch=master)](https://travis-ci.org/cjsauer/accounts-phony)

This package can be used to aid in the testing of Meteor apps. It is most useful when you require a user to be logged in, but don't care about details of logging in itself. Note that it does not run on the production server. 

### How to use

First install the package `meteor add csauer:accounts-phony`. 

You can now use the package like so:

```
//Must be accessed this way because it is a debug only package
var Phony = Package['csauer:accounts-phony'].Phony;
Meteor.loginWithPhony(Phony.user);
```

Please note that you can pass any user object in as an argument. The Phony object is exported with a sample user that you can access with `Phony.user`. This user is created in the database if it does not already exist automatically. 

Here's a quick example of how to use this package while testing with the `xolvio:cucumber` package:

```cucumber
Feature: Phony login
  
  Scenario: User is logged in
    Given: I am logged in
    Then: I should see my username
```

```javascript
// In a step definition file
this.Given(/^I am logged in$/, function () {

  var login = function(done) {
    Meteor.loginWithPhony(Package['csauer:accounts-phony'].Phony.user, done);
  };

  browser.url(process.env.ROOT_URL);
  browser.timeoutAsyncScript(5000);
  browser.executeAsync(login);
});
```

You can also create your own user to log in. For example:

```javascript
// In a step definition file
this.Given(/^I am logged in$/, function () {
  
  var login = function(done) {
    var fakeUser = {
      _id: "phony-user-id",
      username: "phony-user",
      emails: [ { address: "phony@example.com", verified: true } ],
      createdAt: Date.now(),
      profile: {
        name: "Phony User"
      },
      "services" : {
        "facebook" : {
          "accessToken" : "__fake_token__",
          "expiresAt" : 1438797800881,
          "id" : "__fake_id__",
          "email" : "phony@example.com",
          "name" : "Phony McPhony",
          "first_name" : "Phony",
          "last_name" : "McPhony",
          "link" : "https://www.facebook.com/app_scoped_user_id/__fake_id__/",
          "gender" : "male",
          "locale" : "en_US"
        },
      },
      roles: {
        __global_roles__: ['user']
      }
    };
    Meteor.loginWithPhony(fakeUser, done);
  };

  browser.timeoutsAsyncScript(5000).
  browser.executeAsync(login);
});
```

Of course you might want to pull that user out into a fixture for cleaner code. You can see that with this method you can integreate `accounts-phony` with other packages to test all aspects of your code.
