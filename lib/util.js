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

})();
