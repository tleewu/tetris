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

})();
