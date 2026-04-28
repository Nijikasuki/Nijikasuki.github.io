(function () {
  var phrases = [
    'Hello!',
    '你好~',
    '안녕!',
    'こんにちは',
    'Bonjour!',
    'Welcome!'
  ];
  var rotateTimer = null;

  function initHelloCard() {
    var swiperBlog = document.getElementById('swiper_container_blog');
    if (!swiperBlog) return;
    if (document.getElementById('hello-card')) return;

    var card = document.createElement('div');
    card.id = 'hello-card';
    card.innerHTML =
      '<div class="hello-info">' +
        '<span class="hello-info-line">📚 最近在学：Hadoop · PyTorch</span>' +
        '<span class="hello-info-line hello-hitokoto">✨ 今天也加油哦~</span>' +
      '</div>' +
      '<div class="hello-character-group">' +
        '<div class="hello-bubble"><span class="hello-bubble-text">Hello!</span></div>' +
        '<img class="hello-gif" src="/img/idle3.gif" alt="hello"' +
        ' onerror="this.style.display=\'none\'">' +
      '</div>' +
      '<span class="hello-deco hello-deco-1">✨</span>' +
      '<span class="hello-deco hello-deco-2">❀</span>' +
      '<span class="hello-deco hello-deco-3">♡</span>' +
      '<span class="hello-deco hello-deco-4">✨</span>';
    swiperBlog.appendChild(card);

    var textEl = card.querySelector('.hello-bubble-text');
    var idx = 0;

    function rotate() {
      textEl.classList.add('fading');
      setTimeout(function () {
        idx = (idx + 1) % phrases.length;
        textEl.textContent = phrases[idx];
        textEl.classList.remove('fading');
      }, 250);
    }

    if (rotateTimer) clearInterval(rotateTimer);
    rotateTimer = setInterval(rotate, 2500);

    var hitokotoEl = card.querySelector('.hello-hitokoto');
    if (hitokotoEl && window.fetch) {
      fetch('https://v1.hitokoto.cn/?c=i&c=k&c=l')
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.hitokoto) {
            hitokotoEl.textContent = '✨ ' + data.hitokoto;
          }
        })
        .catch(function () { /* 失败保留 fallback 文案 */ });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHelloCard);
  } else {
    initHelloCard();
  }
  document.addEventListener('pjax:complete', initHelloCard);
})();
