// If you're using TextMate, Opt+Cmd+2 is your friend!

require("./spec_helper");

the("Reporter.prototype.makeBehaviorLabel method", function(will) {
  
  will("make a label in the format of \"The #<parent description> will #<behavior description\"", function(done) {
    var reporter = new willful.Reporter();
    var label = reporter.makeBehaviorLabel({
      description: "behavior description",
      parentSpecification: {
        description: "parent description"
      }
    });
    assert.equal("The parent description will behavior description", label);
    done();
  });

});

the("Reporter.prototype.reportError method", function(will) {
  
  will("report the error's stack", function(done) {
    var output = "";
    var stubs = {
      sys: function() {}
    };
    stubs.sys.puts = function(string) {
      output += string;
    }
    var stubBehavior = {
      description: "behavior description",
      parentSpecification: {
        description: "parent description"
      }
    };
    var stubError = {
      stack: "theStack"
    };
    var reporter = new willful.Reporter(stubs);
    reporter.reportError(stubBehavior, stubError);
    assert.ok(output.match(/theStack/));
    done();
  });
  
  will("prefix the behavior's label with 'FAILED' in red", function(done) {
    var output = "";
    var stubs = {
      sys: function() {}
    };
    stubs.sys.puts = function(string) {
      output += string;
    }
    var stubBehavior = {
      description: "behavior description",
      parentSpecification: {
        description: "parent description"
      }
    };
    var stubError = {
      stack: "theStack"
    };
    var reporter = new willful.Reporter(stubs);
    reporter.reportError(stubBehavior, stubError);
    assert.ok(output.match(/.\[1\;31mFAILED\: .\[0m/));
    done();
  });

});

the("Reporter.prototype.reportNotDone method", function(will) {
  
  will("report 'not done()'", function(done) {
    var output = "";
    var stubs = {
      sys: function() {}
    };
    stubs.sys.puts = function(string) {
      output += string;
    }
    var stubBehavior = {
      description: "behavior description",
      parentSpecification: {
        description: "parent description"
      }
    };
    var reporter = new willful.Reporter(stubs);
    reporter.reportNotDone(stubBehavior);
    assert.ok(output.match(/Not done\(\)/));
    done();
  });
  
  will("prefix the behavior's label with 'FAILED' in red", function(done) {
    var output = "";
    var stubs = {
      sys: function() {}
    };
    stubs.sys.puts = function(string) {
      output += string;
    }
    var stubBehavior = {
      description: "behavior description",
      parentSpecification: {
        description: "parent description"
      }
    };
    var reporter = new willful.Reporter(stubs);
    reporter.reportNotDone(stubBehavior);
    assert.ok(output.match(/.\[1\;31mFAILED\: .\[0m/));
    done();
  });

});

the("Reporter.prototype.reportBehavior method", function(will) {
  
  will("report an error when the behavior's error state is not null", function(done) {
    var output = "";
    var stubs = {
      sys: function() {}
    };
    stubs.sys.puts = function(string) {
      output += string;
    }
    var stubBehavior = {
      error: {
        stack: "theStack"
      },
      description: "behavior description",
      parentSpecification: {
        description: "parent description"
      }
    };
    var reporter = new willful.Reporter(stubs);
    reporter.reportBehavior(stubBehavior);
    assert.ok(output.match(/theStack/));
    done();
  });
  
  will("return false when the behavior's error state is not null", function(done) {
    var stubs = {
      sys: function() {}
    };
    stubs.sys.puts = function(string) {};
    var stubBehavior = {
      error: {
        stack: "theStack"
      },
      description: "behavior description",
      parentSpecification: {
        description: "parent description"
      }
    };
    var reporter = new willful.Reporter(stubs);
    var result = reporter.reportBehavior(stubBehavior);
    assert.equal(false, result);
    done();
  });
  
  will("report 'not done()' when the behavior's done state is false", function(done) {
    var output = "";
    var stubs = {
      sys: function() {}
    };
    stubs.sys.puts = function(string) {
      output += string;
    }
    var stubBehavior = {
      description: "behavior description",
      done: false,
      parentSpecification: {
        description: "parent description"
      }
    };
    var reporter = new willful.Reporter(stubs);
    reporter.reportBehavior(stubBehavior);
    assert.ok(output.match(/Not done\(\)/));
    done();
  });
  
  will("return false when the behavior's done state is false", function(done) {
    var stubs = {
      sys: function() {}
    };
    stubs.sys.puts = function(string) {};
    var stubBehavior = {
      description: "behavior description",
      done: false,
      parentSpecification: {
        description: "parent description"
      }
    };
    var reporter = new willful.Reporter(stubs);
    var result = reporter.reportBehavior(stubBehavior);
    assert.equal(false, result);
    done();
  });
  
  will("return true when there are no errors and the behavior's done state is true", function(done) {
    var stubs = {
      sys: function() {}
    };
    stubs.sys.puts = function(string) {};
    var stubBehavior = {
      description: "behavior description",
      done: true,
      parentSpecification: {
        description: "parent description"
      }
    };
    var reporter = new willful.Reporter(stubs);
    var result = reporter.reportBehavior(stubBehavior);
    assert.equal(true, result);
    done();
  });
  
});

the("Reporter.prototype.reportSpecification method", function(will) {
  
  will("return an object with the number of passed and failed behaviors in the specification", function(done) {
    var stubs = {
      sys: function() {}
    };
    stubs.sys.puts = function(string) {};
    var stubSpecification = {
      behaviors: [{
        description: "first behavior description",
        done: false,
        parentSpecification: {
          description: "parent description"
        }
      }, {
        description: "second behavior description",
        error: {
          stack: "theStack"
        },
        parentSpecification: {
          description: "parent description"
        }
      }, {
        description: "third behavior description",
        done: true,
        parentSpecification: {
          description: "parent description"
        }
      }]
    };
    var reporter = new willful.Reporter(stubs);
    var result = reporter.reportSpecification(stubSpecification);
    assert.equal(1, result.passed);
    assert.equal(2, result.failed);
    done();
  });
  
});

the("Reporter.prototype.report method", function(will) {
  
  will("will report failure when there are failed behaviors", function(done) {
    var output = "";
    var stubs = {
      sys: function() {}
    };
    stubs.sys.puts = function(string) {
      output += string;
    };
    var stubSpecifications = [{
      behaviors: [{
        description: "first behavior description",
        done: false,
        parentSpecification: {
          description: "first parent description"
        }
      }, {
        description: "second behavior description",
        error: {
          stack: "theStack"
        },
        parentSpecification: {
          description: "first parent description"
        }
      }, {
        description: "third behavior description",
        done: true,
        parentSpecification: {
          description: "first parent description"
        }
      }]
    }, {
      behaviors: [{
        description: "first behavior description",
        done: true,
        parentSpecification: {
          description: "second parent description"
        }
      }]
    }];
    var reporter = new willful.Reporter(stubs);
    reporter.report(stubSpecifications);
    assert.ok(output.match(/.\[1\;31mFAILED\. .\[0m/));
    assert.ok(output.match(/2 behaviors failed in 1 specifications./));
    done();
  });
  
});