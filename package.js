Package.describe({
  name: 'csauer:accounts-phony',
  version: '0.0.1',
  summary: 'A fake login method for testing Meteor apps',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('phony.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('phony');
  api.addFiles('phony-tests.js');
});
