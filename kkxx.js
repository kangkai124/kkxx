import { content, she, although, iWant } from './520'

new Vue({
  el: '#start',
  data: {
    content,
    play: true,
    she,
    days: getDays(),
    although,
    iWant,
    innerHeight: window.innerHeight || document.documentElement.clientHeight
  },
  mounted () {
    this.togglePlay()
  },
  methods: {
    indexScroll () {
      const height = window.innerHeight || document.documentElement.clientHeight
      const start = window.scrollY
      const duration = Math.abs(start - height) / height * 1000
      scrollTop(window, start, height, duration)
    },
    togglePlay () {
      if (this.play) {
        document.querySelector('audio').pause()
      } else {
        document.querySelector('audio').play()
      }
      this.play = !this.play
    },
    handleScroll(id, margin) {
      let top = Math.floor(document.querySelector(id).getBoundingClientRect().top)
      if (margin) top -= margin
      const height = window.innerHeight || document.documentElement.clientHeight
      const scrollY = window.scrollY
      const duration = Math.abs(top) / height * 1200
      scrollTop(window, scrollY, scrollY + top, duration)
    },
    scrollToBlock1() {
      this.handleScroll('#block-1', 20)
    },
    scrollToBlock2() {
      this.handleScroll('#block-2', 20)
    },
    scrollToBlock3() {
      this.handleScroll('#block-4', 20)
    },
    // scrollToBlock4() {
    //   this.handleScroll('#block-4', 20)
    // },
    scrollToBlock5() {
      this.handleScroll('#block-5')
    }
  }
})

var items = document.querySelectorAll('.timeline li')

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect()
  const height = window.innerHeight || document.documentElement.clientHeight
  return (
    rect.top >= 50 - rect.height &&
    rect.left >= 0 &&
    rect.bottom <= (height + rect.height - 50) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      if (!items[i].classList.contains('in-view')) {
        items[i].classList.add('in-view')
      }
    } else if (items[i].classList.contains('in-view')) {
      items[i].classList.remove('in-view')
    }
  }
}

function scrollTop(el, from = 0, to, duration = 500, endCallback) {
  
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback()
      return false
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(0, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

function getDays () {
  const time = Date.parse(new Date())

  const lastTime = Date.parse('2019-09-15')

  return parseInt((time - lastTime) / (1000 * 60 * 60 * 24))
}

window.addEventListener('load', callbackFunc)
window.addEventListener('load', () => {
  window.scrollTo(0, 0)
  // document.querySelector('audio').play()
  
})
window.addEventListener('scroll', callbackFunc)
document.addEventListener('WeixinJSBridgeReady', function () {
  document.querySelector('audio').play()
}, false)