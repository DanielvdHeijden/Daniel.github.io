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

loadComponent('header', 'components/header.html');
loadComponent('footer', 'components/footer.html');