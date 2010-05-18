//TODO: lots and lots of error handling, particularly argument guarding

var specifications = [];

exports.Reporter = function(deps) {
  this.deps = deps || {
    sys: require("sys")
  };
  
  this.colors = {
    reset: "\x1B[0m",
    red: "\x1B[1;31m",
    green: "\x1B[1;32m"
  };
}

exports.Reporter.prototype.makeBehaviorLabel = function(behavior) {
  return "The " + behavior.parentSpecification.description + " will " + behavior.description;
}

exports.Reporter.prototype.reportError = function(behavior, error) {
  var sys = this.deps.sys;
  
  sys.puts(this.colors.red + "FAILED: " + this.colors.reset + this.makeBehaviorLabel(behavior));
  sys.puts(error.stack);
  sys.puts(""); 
}

exports.Reporter.prototype.reportNotDone = function(behavior) {
  var sys = this.deps.sys;
  
  sys.puts(this.colors.red + "FAILED: " + this.colors.reset + this.makeBehaviorLabel(behavior));
  sys.puts("  Not done().");
  sys.puts("");
}

exports.Reporter.prototype.reportBehavior = function(behavior) {
  if (behavior.error) {
    this.reportError(behavior, behavior.error);
    return false;
  }
  else if(!behavior.done) {
    this.reportNotDone(behavior);
    return false;
  }
  else {
    return true;
  }
}

exports.Reporter.prototype.reportSpecification = function(specification) {
  var passed = 0, 
      failed = 0;
  
  var self = this;
  specification.behaviors.forEach(function (behavior) {
    self.reportBehavior(behavior) ? passed++ : failed++;
  });
  
  return {
    passed: passed,
    failed: failed
  };
}

exports.Reporter.prototype.report = function(specifications) {
  var sys = this.deps.sys;
  
  sys.puts("");
  var passedBehaviors = 0, 
      failedBehaviors = 0,
      passedSpecs = 0,
      failedSpecs = 0;

  var self = this;
  specifications.forEach(function(specification) {
    result = self.reportSpecification(specification);
    passedBehaviors += result.passed;
    failedBehaviors += result.failed;
    result.failed > 0 ? failedSpecs++ : passedSpecs++;
  });

  if (failedBehaviors > 0)
    sys.puts(this.colors.red + "FAILED. " + this.colors.reset + failedBehaviors + " behaviors failed in " + failedSpecs + " specifications.");
  else
    sys.puts(this.colors.green + "PASSED. " + this.colors.reset + passedBehaviors + " behaviors passed in " + passedSpecs + " specifications.");

  sys.puts("");
}

var reporter = new exports.Reporter();

exports.Behavior = function(parentSpecification, description, block) {
  this.block = block;
  this.description = description;
  this.done = false;
  this.error = null;
  this.parentSpecification = parentSpecification;
};

exports.Behavior.prototype.run = function () {
  var self = this;
  try {
    self.block(function() { self.done = true; });
  }
  catch(error) {
    self.error = error;
  }
};

exports.Specification = function(description, block) {
  this.behaviors = [];
  this.block = block;
  this.description = description;
};

exports.Specification.prototype.run = function () {
  var self = this;
  this.block(function(description, block) {
    var behavior = new exports.Behavior(self, description, block);
    self.behaviors.push(behavior);
    behavior.run();
  });
};

global.the = function(description, block) {
  var spec = new exports.Specification(description, block);
  specifications.push(spec);
  spec.run();
};

process.addListener("exit", function () {
  reporter.report(specifications);
});