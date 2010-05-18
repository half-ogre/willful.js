# About

Willful is a simple spec'ing library for [Node](http://github.com/ry/node "Node").

# Use

* require("willful")
* add a specification with the "the" method
* add behaviors with the "will" method
* signal the end of behavior verification with the "done" method
* run: node file-with-your-specs.js

# Example

    require("willful");
    var assert = require("assert");
  
    // start a new specification:
    the("function I'm spec'ing", function(will) {

      // start a new behavior:
      will("exhibit the behavior I expect", function(done) {
        // test something via Node's built-in assert module
        assert.ok(true)

        // signal that the behavior's verification is done
        done();
      });
      
      // start a second behavior (one that will fail):
      will("not exhibit the behavior I expect", function(done) {
        assert.equal(true, false)
        done();
      });
      
    });

# To-Do

* add a verbose reporting option
* add an option to format reports as HTML (and maybe XML)
* maybe extend Node's built-in asserts (for things like assert.true and assert.null)
* better component-ize Reporter so that customizing reporting is easier

# Credits

Willful's design took shape as I was using [minitest.js](http://github.com/botanicus/minitest.js "minitest.js"), itself a very good spec'ing library for Node.