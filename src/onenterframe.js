(function(_import) {
  "use strict";
  var _requestAF = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

//constants
  var DEFAULT = "default";
  var DEFAULTFRM = -1;
  var ERROMESSAGE = "you can only extend classes";

  //---
  var _export = function() {
    this.frameRate = DEFAULTFRM;
    this.lastTime = 0;
    this.frameNumber = 0;
    this.interValHandle = "";
    this.enterframeEventQue = {};
    this.atuoPublish();
  };

  _export.fn = _export.prototype;
  /**
   *
   * @param handle
   * @param func
   * @param callback
   * @param params
   * @returns {_export.fn}
   */
  _export.fn.onEnterFrame = function(handle, func, callback, params) {
    var _handle = handle || DEFAULT;
    this.enterframeEventQue[_handle] = func;
    if (callback)
      callback(params);
    return this;
  };

  /**
   *
   * @param handle
   * @param callback
   * @returns {_export.fn}
   */

  _export.fn.deleteEnterFrame = function(handle, callback) {
    var _handle = handle || DEFAULT;
    delete this.enterframeEventQue[_handle];
    if (callback)
      callback();
    return this;
  };

  /**
   *
   * @param framerate
   * @returns {_export.fn}
   */

  _export.fn.setFrameRate = function(framerate) {
    if (framerate < 1) {
      framerate = DEFAULTFRM;
    } else if (framerate > 60) {
      framerate = 60;
    }
    this.frameRate = framerate;

    this.restartFrame();
    return this;
  };

  /**
   *
   * @returns {number}
   */

  _export.fn.getInterval = function() {
    var interval = (1000 / this.frameRate);
    return interval;
  };

  /**
   *
   * @returns {number}
   */

  _export.fn.getFrameNumber = function() {
    return this.frameNumber;
  };

  /**
   *
   * @returns {*|_export.fn.frameRate}
   */

  _export.fn.getFrame = function() {
    return this.frameRate;
  };
  /**
   *
   */

  _export.fn.restartFrame = function() {
    clearInterval(this.interValHandle);
    this.atuoPublish();
  };

  /**
   *
   * @returns {_export.fn}
   */
  _export.fn.updateFrameNumber = function() {
    this.frameNumber++;
    if (this.frameNumber > 1000) {

    }
    return this;
  };

  /**
   *
   * @returns {_export.fn}
   */
  _export.fn.atuoPublish = function() {

    var that = this;
    var step = function() {
      that.updateFrameNumber();
      var eventTimeStamp = new Date().getTime();
      for (var i in that.enterframeEventQue) {
        var enventParam = {
          frame: that.getFrameNumber(),
          handle: i,
          eventTime: eventTimeStamp,
          lastTime: that.lastTime,
          readableEventTime: eventTimeStamp,
          source: that.enterframeEventQue[i].toString(),
          toString: function() {
            return "framerate:" +
              (that.frameRate === -1 ? " MAX " : that.frameRate ) +
              " Current frame: " +
              this.frame +
              " Timeline: " +
              this.readableEventTime;
          }
        };
        that.enterframeEventQue[i](enventParam);
      }

      if (_requestAF !== null && that.getFrame() === DEFAULTFRM) {
        _requestAF(step);
      }
      this.lastTime = new Date().getTime();
    };

    if (_requestAF !== null && that.getFrame() === DEFAULTFRM) {
      _requestAF(step);
    } else {
      this.interValHandle = setInterval(step, this.getInterval());
    }
    return this;
  };
  _export.fn.extend = function(classFunc) {
    if (!!(classFunc && classFunc.constructor && classFunc.call && classFunc.apply)) {
      classFunc.prototype.frameEvent = new _export();
      return this;
    } else {
      throw ERROMESSAGE;
    }
  };

  _import.prototype.frameEvent = new _export();

}(Window));
