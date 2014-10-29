# TeaScript
TeaScript is a superset of JavaScript(ES 5) and it can be compiled into JavaScript. TeaScript adds a new operator `~` to simply and powerfully streamline asynchronous control flow. Say goodbye to callback pyramids finally.

[![Build Status](https://travis-ci.org/luin/teascript.png?branch=master)](https://travis-ci.org/luin/teascript)

## Sample

```javascript
var count = 0;
function delayTask(interval, callback) {
  setTimeout(function() {
    callback(null, count++);
  }, interval);
}

for (var i = 0; i < 10; ++i) {
  console.log(new Date(), delayTask(1000, ~));
  console.log('step' + i);
}
```

Output:

    Mon Oct 27 2014 20:58:26 GMT+0800 (CST) 0
    step0
    Mon Oct 27 2014 20:58:27 GMT+0800 (CST) 1
    step1
    Mon Oct 27 2014 20:58:28 GMT+0800 (CST) 2
    step2
    Mon Oct 27 2014 20:58:29 GMT+0800 (CST) 3
    step3
    Mon Oct 27 2014 20:58:30 GMT+0800 (CST) 4
    step4
    Mon Oct 27 2014 20:58:31 GMT+0800 (CST) 5
    step5
    Mon Oct 27 2014 20:58:32 GMT+0800 (CST) 6
    step6
    Mon Oct 27 2014 20:58:33 GMT+0800 (CST) 7
    step7
    Mon Oct 27 2014 20:58:34 GMT+0800 (CST) 8
    step8
    Mon Oct 27 2014 20:58:35 GMT+0800 (CST) 9
    step9

## Usage

    // Install tea-script module globally
    $ npm install -g tea-script
    // Run a TeaScript file
    $ tea script.tea
    // Compile the tea script and save `.js` file to the same dir
    $ tea --compile script.tea
    // Learn more
    $ tea --help

Write TeaScript is as easy as replacing callback functions the operator `~`, and the result will be returned synchronously. Any error will be throwed.

## Node Version

TeaScript requires node 0.11.x for the --harmony flag which exposes generators to your script. If you're running an earlier version of node you may install [n](https://github.com/visionmedia/n), a node version manager to quickly install 0.11.x:

    $ npm install -g n
    $ n 0.11.12

    $ tea script.tea

    // or
    $ tea --compile script.tea
    $ node --harmony script.js

## More examples

### Before:

```javascript
var async = require('async');
var userIds = [672, 282, 33, 4];
async.map(userIds, function(userId, callback) {
  User.findById(userId, function(err, user) {
    callback(err, user);
  });
}, function(err, users) {
  res.json(users);
});
```

### Now:

```javascript
var userIds = [672, 282, 33, 4];
res.json(userIds.map(function(userId) {
  return User.findById(userId, ~);
}));
```

### Before:

```javascript
User.findById(req.query.userId, function(err, user) {
    if (user) {
      user.getTasks(function(err, tasks) {
        if (tasks) {
          res.json(tasks);
        } else {
          res.json({ error: 'No tasks' });
        }
      });
    } else {
      res.json({ error: 'No user' });
    }
});
```

### Now(with TeaScript):

```javascript
var user = User.findById(req.query.userId);
if (user) {
  var tasks = user.getTasks(~);
  if (tasks) {
    res.json(tasks);
  } else {
    res.json({ error: 'No tasks' });
  }
} else {
  res.json({ error: 'No user' });
}
```
