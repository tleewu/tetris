(function(){
  if(typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Util = Tetris.Util = {};

  Util.inherits = function(ChildClass, ParentClass){
    var Surrogate = function() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Array.prototype.addPosition = function (x,y) {
    for (var i = 0; i < this.length; i++) {
      this[i][0] += y;
      this[i][1] += x;
    }
    return this;
  };

  Array.prototype.clone = function () {
    // this monkey patch method clones an array within an array
    var clonedArray = [];
    for (var i = 0; i < this.length; i++ ) {
      clonedArray.push(this[i].slice(0));
    }
    return clonedArray;
  };

  Array.prototype.addAnotherArray = function (anotherArray) {
    var newArray = [];
    for (var i = 0; i < this.length; i++) {
      newArray.push(this[i]+anotherArray[i]);
    }
    return newArray;
  };

  Array.prototype.isFullLine = function () {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === 0) {
        return false;
      }
    }
    return true;
  };

  Array.prototype.indexOfArray = function (array) {
    // function is for arrays of arrays
    for (var i = 0; i < this.length; i++) {
      if (this[i][0] === array[0] && this[i][1] === array[1]){
        return i;
      }
    }
  };

})();
