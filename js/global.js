async function loadComponent(elementId, file) {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Kon ${file} niet laden`);
    }

    element.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

function setActiveNavLink() {
  const links = document.querySelectorAll('.main-nav a');

  const currentPage =
    window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

async function init() {
  await loadComponent('header', 'components/header.html');

  setActiveNavLink();

  await loadComponent('footer', 'components/footer.html');
}

init();