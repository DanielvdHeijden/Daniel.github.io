const siteRoot = new URL("../", document.currentScript.src);

async function loadComponent(id, file) {
  const element = document.getElementById(id);

  if (!element) return;

  try {
    const response = await fetch(new URL(file, siteRoot));

    if (!response.ok) {
      throw new Error("Bestand niet gevonden: " + file);
    }

    element.innerHTML = await response.text();

    element.querySelectorAll("a").forEach(function (link) {
      const href = link.getAttribute("href");

      if (href && !href.startsWith("#")) {
        link.href = new URL(href, siteRoot).href;
      }
    });
  } catch (error) {
    element.textContent = "Dit onderdeel kon niet worden geladen.";
    console.error(error);
  }
}

function setActiveNavLink() {
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");

  document.querySelectorAll(".main-nav a").forEach(function (link) {
    const linkPath = link.pathname.replace(/\/index\.html$/, "/");
    const active =
      link.origin === window.location.origin &&
      linkPath === currentPath;

    link.classList.toggle("active", active);

    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

const projects = [
  {
    title: "Gym Director",
    category: "school",
    year: 2026,
    description: "Een game waarin je een sportschool bestuurt."
  },
  {
    title: "Portfolio",
    category: "school",
    year: 2026,
    description: "Mijn persoonlijke website met HTML, CSS en JavaScript."
  },
  {
    title: "Webshopontwikkeling",
    category: "werk",
    year: 2023,
    description: "Webshops bouwen met Shopify en Lightspeed."
  },
  {
    title: "WieBetaaldWat copy",
    category: "zelfgemaakt",
    year: 2026,
    description: "Eigen app om uitgaven te verdelen met vrienden en familie."
  }
];

function showProjects() {
  const list = document.getElementById("project-list");
  const category = document.getElementById("project-filter").value;
  const sort = document.getElementById("project-sort").value;


  const selectedProjects = projects.filter(function (project) {
    return category === "all" || project.category === category;
  });

  // Sorteer de geselecteerde projecten.
  selectedProjects.sort(function (a, b) {
    if (sort === "name") {
      return a.title.localeCompare(b.title);
    }

    return b.year - a.year;
  });

  list.replaceChildren();

  selectedProjects.forEach(function (project) {
    const card = document.createElement("article");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const details = document.createElement("p");
    details.textContent = project.category + " · " + project.year;

    const description = document.createElement("p");
    description.textContent = project.description;

    card.append(title, details, description);
    list.append(card);
  });

  document.getElementById("project-status").textContent =
    selectedProjects.length + " projecten gevonden.";
}


// CONTACTFORMULIER


function showError(field, errorId, message) {
  document.getElementById(errorId).textContent = message;
  field.setAttribute("aria-invalid", message !== "");
}

function checkForm(event) {

  event.preventDefault();

  const name = document.getElementById("contact-name");
  const email = document.getElementById("contact-email");
  const message = document.getElementById("contact-message");
  const status = document.getElementById("contact-status");


  showError(name, "name-error", "");
  showError(email, "email-error", "");
  showError(message, "message-error", "");

  let firstError = null;

  if (name.value.trim() === "") {
    showError(name, "name-error", "Vul je naam in.");
    firstError = name;
  }


  if (email.value.trim() === "" || email.validity.typeMismatch) {
    showError(email, "email-error", "Vul een geldig e-mailadres in.");

    if (firstError === null) {
      firstError = email;
    }
  }

  if (message.value.trim().length < 10) {
    showError(
      message,
      "message-error",
      "Schrijf een bericht van minimaal 10 tekens."
    );

    if (firstError === null) {
      firstError = message;
    }
  }

  if (firstError !== null) {
    status.textContent = "Controleer de aangegeven velden.";
    firstError.focus();
  } else {
    status.textContent =
      "Je invoer is geldig! Dit is een demo: er is niets verstuurd.";
  }
}


// GITHUB-PROJECTEN OPHALEN

async function loadGithub() {
  const list = document.getElementById("github-list");
  const status = document.getElementById("github-status");
  const button = document.getElementById("github-retry");

  list.replaceChildren();
  status.textContent = "Projecten laden...";
  button.hidden = true;

  try {
    const response = await fetch(
      "https://api.github.com/users/Danielvdheijden/repos?sort=updated&per_page=3"
    );

    if (!response.ok) {
      throw new Error("GitHub kon niet worden geladen.");
    }

    const repositories = await response.json();

    repositories.forEach(function (repository) {
      const item = document.createElement("li");
      const link = document.createElement("a");

      link.textContent = repository.name;
      link.href = repository.html_url;

      item.append(link);
      list.append(item);
    });

    status.textContent = repositories.length + " repositories geladen.";
  } catch (error) {
    status.textContent = "Laden mislukt. Probeer het opnieuw.";
    button.hidden = false;
  }
}


// STARTEN

async function init() {
  // Alleen uitvoeren als het onderdeel op deze pagina staat.
  if (document.getElementById("project-list")) {
    showProjects();

    document
      .getElementById("project-filter")
      .addEventListener("change", showProjects);

    document
      .getElementById("project-sort")
      .addEventListener("change", showProjects);
  }

  if (document.getElementById("contact-form")) {
    document
      .getElementById("contact-form")
      .addEventListener("submit", checkForm);
  }

  if (document.getElementById("github-list")) {
    loadGithub();

    document
      .getElementById("github-retry")
      .addEventListener("click", loadGithub);
  }

  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");

  setActiveNavLink();
}

// Je script heeft 'defer', dus de HTML is hier al ingelezen.
init();