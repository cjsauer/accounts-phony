Phony = {
  user: {
    _id: "phony-user-id",
    username: "phony-user",
    emails: [ { address: "phony@example.com", verified: true } ],
    createdAt: Date.now(),
    profile: {
      name: "Phony User"
    }
  }
};

if(Meteor.isServer) {
  Accounts.registerLoginHandler(function(loginRequest) {
    //Let's make sure that we are only handling login requests
    //  that contain the 'phony' field.
    if(!loginRequest.phony) {
      return undefined;
    }

    var userId = null;
    var user = Meteor.users.findOne({_id: loginRequest.user._id});
    if(!user) {
      userId = Meteor.users.insert(loginRequest.user);
    } else {
      userId = user._id;
    }

    return {
      userId: userId
    };
  });

}

if(Meteor.isClient) {
  Meteor.loginWithPhony = function(userObj, callback) {
    var loginRequest = { phony: true, user: userObj };

    Accounts.callLoginMethod({
      methodArguments: [loginRequest], 
      userCallback: callback
    });
  };
}
