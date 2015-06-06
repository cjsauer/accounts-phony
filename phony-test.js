var Phony = Package['csauer:accounts-phony'].Phony;

Tinytest.add('Meteor.loginWithPhony()', function (test) {
  if(Meteor.isClient) {
    Meteor.loginWithPhony(Phony.user, function() {
      test.equal(Meteor.userId(), "phony-user-id");
    });
  }
});

Tinytest.add('Meteor.loginWithPhony() callback is working', function(test){
  if(Meteor.isClient) {
    setTestVar = function(value) { 
      test.equal(value, 5);
    };
    console.log(Package);
    Meteor.loginWithPhony(Phony.user, function() {
      setTestVar(5);
    });
  }
});
