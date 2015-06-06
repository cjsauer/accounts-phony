# accounts-phony

This package can be used to aid in the testing of Meteor apps. It is most useful when you require a user to be logged in, but don't care about details of logging in itself. 

### How to use

First install the package `meteor add csauer:accounts-phony`. 

You can now use the package like so:

```
Meteor.loginWithPhony(Phony.user);
```

Please note that you can pass any user object in as an argument. The Phony object is exported with a sample user that you can access with `Phony.user`. This user is created in the database if it does not already exist automatically. 
