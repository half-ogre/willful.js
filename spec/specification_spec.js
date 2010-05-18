// If you're using TextMate, Opt+Cmd+2 is your friend!

require("./spec_helper");

the("new Specification() method", function(will) {
  
  will("set the specification's description", function(done) {
    var block = function() {};
    var spec = new willful.Specification("theDescription", block);
    assert.equal("theDescription", spec.description);
    done();
  });
  
  will("set the specification's block", function(done) {
    var block = function() {};
    var spec = new willful.Specification("theDescription", block);
    assert.equal(block, spec.block);
    done();
  });
  
  will("initialize the specification's behaviors array", function(done) {
    var block = function() {};
    var spec = new willful.Specification("theDescription", block);
    assert.ok(spec.behaviors instanceof Array);
    assert.equal(0, spec.behaviors.length);
    done();
  });
  
});

the("Specification.prototype.run method", function(will) {
  
  will("invoke the specification's block", function(done) {
    var block = function() {
      done();
    };
    var spec = new willful.Specification("theDescription", block);
    spec.run();
  });
  
  will("pass the will() function to the specification's block", function(done) {
    var block = function(willFunction) {
      assert.ok(typeof(willFunction) === 'function');
      done();
    };
    var spec = new willful.Specification("theDescription", block);
    spec.run();
  });
  
  will("push a new behavior into the behaviors array when the will() function is invoked", function(done) {
    var block = function(willFunction) {
      willFunction("theBehaviorDescription", function(doneFunction) { });
    };
    var spec = new willful.Specification("theDescription", block);
    spec.run();
    assert.equal(1, spec.behaviors.length);
    assert.equal("theBehaviorDescription", spec.behaviors[0].description);
    done();
  });
  
  will("run a new behavior when add with the will() function", function(done) {
    var block = function(willFunction) {
      willFunction("theBehaviorDescription", function(doneFunction) {
        done();
      });
    };
    var spec = new willful.Specification("theDescription", block);
    spec.run();
  });
  
});