// Uitgaande van: js/script.js
const siteRoot = new URL('../', document.currentScript.src);

async function loadComponent(elementId, file) {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  try {
    const response = await fetch(new URL(file, siteRoot));

    if (!response.ok) {
      throw new Error(`Kon ${file} niet laden (${response.status})`);
    }

    element.innerHTML = await response.text();

    // Navigatielinks relatief aan de hoofdmap maken.
    element.querySelectorAll('a[href]').forEach(function (link) {
      const href = link.getAttribute('href');

      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('/') ||
        /^[a-z][a-z\d+.-]*:/i.test(href)
      ) {
        return;
      }

      link.href = new URL(href, siteRoot).href;
    });
  } catch (error) {
    console.error(error);
  }
}

function setActiveNavLink() {
  function normalizePath(path) {
    return path.replace(/\/index\.html$/, '/');
  }

  const currentPath = normalizePath(window.location.pathname);

  document.querySelectorAll('.main-nav a').forEach(function (link) {
    const url = new URL(link.href);

    link.classList.toggle(
      'active',
      url.origin === window.location.origin &&
        normalizePath(url.pathname) === currentPath
    );
  });
}

async function init() {
  await Promise.all([
    loadComponent('header', 'components/header.html'),
    loadComponent('footer', 'components/footer.html')
  ]);

  setActiveNavLink();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}