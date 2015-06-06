Tinytest.add('Meteor.loginWithPhony()', function (test) {
  if(Meteor.isClient) {
    Meteor.loginWithPhony(Phony.user);
    test.equal(Meteor.userId(), "phony-user-id");
  }
});
