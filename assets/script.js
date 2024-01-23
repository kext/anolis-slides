const show = (() => {
  let slide = 0
  const slides = document.querySelectorAll('.slide')
  for (let i = 0; i < slides.length; ++i) {
    if (i !== slide) slides[i].classList.add(i < slide ? 'left' : 'right')
    slides[i].addEventListener('transitionend', e => {
      e.target.classList.remove('transitions')
    })
    Array.from(slides[i].querySelectorAll('.pagenumber')).forEach(el => el.appendChild(document.createTextNode(i + 1)))
  }
  const set = (el, d) => {
    const l = d < 0
    const r = d > 0
    if (l ^ el.classList.contains('left') || r ^ el.classList.contains('right')) {
      el.classList.remove('left', 'right')
      if (l) el.classList.add('left')
      if (r) el.classList.add('right')
      el.classList.add('transitions')
    }
  }
  return f => {
    let n = f(slide)
    if (n < 0) n = 0
    if (n >= slides.length) n = slides.length - 1
    slide = n
    for (let i = 0; i < slides.length; ++i) {
      set(slides[i], i - slide)
    }
  }
})()
window.addEventListener('mousemove', () => {
  document.body.classList.remove('hide-cursor')
})
window.addEventListener('keydown', e => {
  document.body.classList.add('hide-cursor')
  if (e.key === 'f') {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.querySelector('html').requestFullscreen()
    }
  } else if (e.key === 'ArrowRight') {
    show(slide => slide + 1)
  } else if (e.key === 'ArrowLeft') {
    show(slide => slide - 1)
  }
})
