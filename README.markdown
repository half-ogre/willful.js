# About

Willful is a light-weight spec'ing library for Node.

# Use

* require("willfull")
* add a specification with the "the" method
* add behaviors with the "will" method
* signal the end of behavior verification with the "done" method
* node file-with-your-specs.js

# Example

    require("willful");
    var assert   = require("assert");
  
    // start a new specification:
    the("function I'm spec'ing", function (will) {

      // start a new behavior:
      will("exhibit the behavior I expect", function (done) {
        // test something via Node's built-in assert module
        assert.ok(true)

        // signal that the behavior's verification is done
        done();
      });
      
    });

# Credits

Willful's design took shape as I was using minitest.js, itself a very good spec'ing library for Node.