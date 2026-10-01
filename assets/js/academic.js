(function () {
  'use strict';

  var skipLink = document.querySelector('.academic-skip-link');
  var main = document.getElementById('main');
  if (skipLink && main) {
    main.setAttribute('tabindex', '-1');
    skipLink.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      main.focus({ preventScroll: true });
      main.scrollIntoView({ block: 'start', behavior: 'auto' });
    }, true);
  }

  var navigation = document.getElementById('academic-nav');
  if (!navigation) return;

  var toggle = navigation.querySelector('.academic-nav__toggle');
  var links = document.getElementById('academic-navigation-links');
  if (!toggle || !links) return;

  var mobile = window.matchMedia('(max-width: 640px)');

  function closeMenu(returnFocus) {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (!mobile.matches) return;

    var isOpen = navigation.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      event.preventDefault();
      closeMenu(true);
    }
  });

  document.addEventListener('click', function (event) {
    if (navigation.classList.contains('is-open') && !navigation.contains(event.target)) {
      closeMenu(false);
    }
  });

  links.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu(false);
  });

  if (mobile.addEventListener) {
    mobile.addEventListener('change', function () { closeMenu(false); });
  } else {
    mobile.addListener(function () { closeMenu(false); });
  }

  navigation.classList.add('is-enhanced');
}());
