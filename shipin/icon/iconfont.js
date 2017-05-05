;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-bofang" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M647.953392 110.1057l123.517151 0 0 752.718457-123.517151 0 0-752.718457Z"  ></path>'+
      ''+
      '<path d="M252.529457 110.1057l123.517151 0 0 752.718457-123.517151 0 0-752.718457Z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-video" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M393.441279 74.78424c127.59605-30.905894 269.732258-10.556427 376.977817 68.236104 162.337295 110.00337 229.346455 332.312548 164.324556 515.751441-39.924291 116.734678-130.198318 214.808344-243.570411 263.612886-192.022385 86.599334-440.164928 18.818601-554.761919-159.726841C60.673359 653.879358 42.924113 511.131213 77.033979 384.445906 118.809431 234.967476 243.193323 113.795742 393.441279 74.78424zM498.089687 102.783944c-196.909695 3.667529-374.693798 166.913521-392.906601 363.211279C75.809081 681.109536 249.783415 895.767454 465.502501 914.585031c219.2454 30.136368 436.652941-151.166885 449.502597-371.481639C940.718737 310.703391 730.79668 91.308589 498.089687 102.783944z"  ></path>'+
      ''+
      '<path d="M387.315768 297.392224c117.958552 69.924559 235.935524 139.840932 351.593683 213.126029C623.997282 583.191412 505.588475 650.202619 390.991484 723.339336 382.280078 581.659523 389.303029 439.375959 387.315768 297.392224z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
