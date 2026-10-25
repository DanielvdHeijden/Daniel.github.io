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

const games = [
  { title: "Rocket League", page: "Rocket League" },
  { title: "Valorant", page: "Valorant" },
  { title: "FC 26", page: "EA Sports FC 26" }
];

async function loadGames() {
  const list = document.getElementById("games-list");
  const status = document.getElementById("games-status");
  const button = document.getElementById("games-retry");

  list.replaceChildren();
  status.textContent = "Games laden...";
  button.hidden = true;

  let loaded = 0;

  for (const game of games) {
    try {
      const url =
        "https://en.wikipedia.org/w/api.php" +
        "?action=query&format=json&formatversion=2&origin=*" +
        "&prop=extracts|pageimages" +
        "&exintro=1&explaintext=1&exsentences=2" +
        "&piprop=thumbnail&pithumbsize=600&pilicense=any" +
        "&redirects=1&titles=" + encodeURIComponent(game.page);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Game kon niet worden geladen.");
      }

      const data = await response.json();

      if (data.error || !data.query) {
        throw new Error("Geen gamegegevens ontvangen.");
      }

      const page = data.query.pages[0];

      if (page.missing) {
        throw new Error("Game niet gevonden.");
      }

      const card = document.createElement("article");
      card.className = "game-card";

      const visual = document.createElement("div");
      visual.className = "game-card__visual";

      if (game.title === "Valorant") {
        visual.classList.add("game-card__visual--logo");
      }

      // Zonder afbeelding tonen we de naam van de game.
      visual.textContent = game.title;

      if (page.thumbnail) {
        const image = document.createElement("img");
        image.src = page.thumbnail.source;
        image.alt = game.title;
        image.loading = "lazy";

        image.addEventListener("error", function () {
          visual.textContent = game.title;
        });

        visual.replaceChildren(image);
      }

      const content = document.createElement("div");
      content.className = "game-card__content";

      const title = document.createElement("h3");
      title.textContent = game.title;

      const description = document.createElement("p");
      description.textContent =
        page.extract || "Er is nog geen beschrijving beschikbaar.";
      description.lang = "en";

      const link = document.createElement("a");
      link.textContent = "Lees meer op Wikipedia ↗";
      link.href =
        "https://en.wikipedia.org/wiki/" +
        encodeURIComponent(page.title.replaceAll(" ", "_"));

      content.append(title, description, link);
      card.append(visual, content);
      list.append(card);

      loaded++;
    } catch (error) {
      console.error(error);
    }
  }

  if (loaded === games.length) {
    status.textContent = "";
  } else {
    status.textContent =
      loaded + " van de 3 games geladen. Probeer het opnieuw.";
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

  if (document.getElementById("games-list")) {
  loadGames();

  document
    .getElementById("games-retry")
    .addEventListener("click", loadGames);
}

  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");

  setActiveNavLink();
}

// Je script heeft 'defer', dus de HTML is hier al ingelezen.
init();