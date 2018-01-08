/**
 * Created by aaron.goshine on 19/02/15.
 */

var callback = function () {
};

var eventHandler = function (event) {
  var windowframe = document.getElementById('windowFrame12');
  windowframe.innerHTML = event.toString();
};

var classFuncEventHandler_30 = function (event) {
  var classFrames = document.getElementById('classFrames30');
  classFrames.innerHTML = event.toString();
};

var classFuncEventHandler_60 = function (event) {
  var classFrames = document.getElementById('classFrames60');
  classFrames.innerHTML = event.toString();
};

var requestAFHandler = function (event) {
  var classFrames = document.getElementById('requestAnimationFrame');
  classFrames.innerHTML = event.toString();
};

window.onload = function () {
  // frameEvent can becalled on the window by deafult
  window.frameEvent.onEnterFrame('handleFrameOnWindow', eventHandler, callback);
  window.frameEvent.setFrameRate(12);

  var Class_RAF = function () {
  };
  // window will extend your class peacefull
  window.frameEvent.extend(Class_RAF);
  var instance = new Class_RAF();
  instance.frameEvent.setFrameRate(-1);
  instance.frameEvent.onEnterFrame('requestAnimationFrame', requestAFHandler);

  var Class_30 = function () {
  };
  // window will extend your class peacefull
  window.frameEvent.extend(Class_30);
  var instance_t = new Class_30();
  instance_t.frameEvent.setFrameRate(30);
  instance_t.frameEvent.onEnterFrame('handleFrameOnClassFunc_30', classFuncEventHandler_30);

  var Class_60 = function () {
  };
  // window will extend your class peacefull
  window.frameEvent.extend(Class_60);
  var instance_s = new Class_60();
  instance_s.frameEvent.setFrameRate(60);
  instance_s.frameEvent.onEnterFrame('handleFrameOnClassFunc_60', classFuncEventHandler_60);
  // frameEvent.deleteEnterFrame ("handleFrameOnClassFunc_60");
};

