// If you're using TextMate, Opt+Cmd+2 is your friend!

require("./spec_helper");

the("new Behavior() method", function(will) {
  
  will("set the behavior's parent specification", function(done) {
    var parentSpec = {},
        block = function() {},
        behavior = new willful.Behavior(parentSpec, "theDescription", block);
    assert.equal(parentSpec, behavior.parentSpecification);
    done();
  });
  
  will("set the behavior's description", function(done) {
    var block = function() {},
        behavior = new willful.Behavior(null, "theDescription", block);
    assert.equal("theDescription", behavior.description);
    done();
  });
  
  will("set the behavior's block", function(done) {
    var block = function() {},
        behavior = new willful.Behavior(null, "theDescription", block);
    assert.equal(block, behavior.block);
    done();
  });
  
  will("initialize the behavior's error to null", function(done) {
    var block = function() {},
        behavior = new willful.Behavior(null, "theDescription", block);
    assert.equal(null, behavior.error);
    done();
  });
  
  will("initialize the behavior's done state to false", function(done) {
    var block = function() {},
        behavior = new willful.Behavior(null, "theDescription", block);
    assert.equal(false, behavior.done);
    done();
  });
  
});

the("Behavior.prototype.run method", function(will) {
  
  will("will invoke the behavior's block", function(done) {
    var block = function() {
      done();
    };
    var behavior = new willful.Behavior(null, "theDescription", block);
    behavior.run();
  });
  
  will("will pass the done() function to the behavior's block", function(done) {
    var block = function(doneFunction) {
      assert.ok(typeof(doneFunction) === 'function');
      done();
    };
    var behavior = new willful.Behavior(null, "theDescription", block);
    behavior.run();
  });
  
  will("will catch an error behavior's block throws and set the behavior's error state", function(done) {
    var block = function() {
      throw "block error";
    };
    var behavior = new willful.Behavior(null, "theDescription", block);
    behavior.run();
    assert.equal("block error", behavior.error);
    done();
  });
  
});