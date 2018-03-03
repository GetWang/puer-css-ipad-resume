/* 事件工具 */
var eventUtil = {
  addEventHandler: function (el, eType, handler) {
    if (!!el.addEventListener) {
      el.addEventListener(eType, handler, false);
    } else if (!!el.attachEvent) {
      el.attachEvent('on' + eType, handler);
    } else {
      el['on' + eType] = handler;
    }
  },
  getEventTarget: function (event) {
    return event.target || event.srcElement;
  }
};

/* Class 类名工具 */
var classUtil = {
  addClass: function (el, className) {
    el.className = el.className + ' ' + className;
  },
  removeClass: function (el, className) {
    var arr = el.className.split(' ');
    var ret = arr.filter(function (value) {
      if (value !== className) {
        return true;
      }
    });
    el.className = ret.join(' ');
  },
  hasClass: function (el, className) {
    var arr = el.className.split(' ');
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === className) {
        return true;
      }
    }
    return false;
  },
  toggleClass: function (el, className) {
    if (classUtil.hasClass(el, className)) {
      classUtil.removeClass(el, className);
    } else {
      classUtil.addClass(el, className);
    }
  }
};

(function () {
  var addEventHandler = eventUtil.addEventHandler,
      addClass = classUtil.addClass,
      removeClass = classUtil.removeClass,
      toggleClass = classUtil.toggleClass;

  var colorDots = document.getElementsByClassName('color-dots')[0],
      currDot = document.querySelector('.current', colorDots),
      currColor = currDot.dataset.color;

  var ipadEl = document.getElementsByClassName('device-ipad-pro')[0],
      ipadHomeBtn = document.querySelector('.device-homeBtn', ipadEl),
      ipadHomeCover = document.querySelector('.homeCover', ipadEl),
      iCoverInfo = document.querySelector('.info', ipadHomeCover);

  var watchEl = document.getElementsByClassName('device-apple-watch')[0],
      watchDate = document.querySelector('.date', watchEl),
      watchTime = document.querySelector('.Time', watchEl),
      monthEl = document.querySelector('.month', watchDate),
      dayEl = document.querySelector('.day', watchTime),
      hourEl = document.querySelector('.hour', watchDate),
      minuteEl = document.querySelector('.minute', watchDate);

  var enMonth = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  };

  addEventHandler(colorDots, 'click', function (e) {
    var target = eventUtil.getEventTarget(e);
    if (target === colorDots || target === currDot) {
      return undefined;
    }
    removeClass(currDot, 'current');
    removeClass(ipadEl, 'device-' + currColor);
    currDot = target;
    currColor = currDot.dataset.color;
    addClass(currDot, 'current');
    addClass(ipadEl, 'device-' + currColor);
  });

  addEventHandler(ipadHomeBtn, 'click', function (e) {
    toggleClass(ipadHomeCover, 'open');
    toggleClass(iCoverInfo, 'open');
  });

  function updateTime () {
    var currTime = new Date();
    monthEl.innerText = enMonth[currTime.getMonth()];
    dayEl.innerText = currTime.getDate();
    hourEl.innerText = padTime(currTime.getHours());
    minuteEl.innerText = padTime(currTime.getMinutes());
  }

  function padTime (num) {
    if (num < 10) {
      return '0' + num.toString();
    }
    return num;
  }

  updateTime();
  setInterval(updateTime, 2000);

})();