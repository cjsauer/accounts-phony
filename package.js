Package.describe({
  name: 'csauer:accounts-phony',
  version: '0.0.3',
  summary: 'A fake login method for testing Meteor apps',
  documentation: 'README.md',
  git: 'https://github.com/cjsauer/accounts-phony'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('accounts-base');
  api.addFiles('phony.js', ['client', 'server']);
  api.export('Phony', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('accounts-base');
  api.use('csauer:accounts-phony');
  api.addFiles('phony-test.js');
});
