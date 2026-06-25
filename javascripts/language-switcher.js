(function () {
  const languages = ["zh", "bn"];

  function samePageLanguageUrl(targetLanguage) {
    const pathParts = window.location.pathname.split("/");
    const languageIndex = pathParts.findIndex((part) => languages.includes(part));

    if (languageIndex === -1) {
      return null;
    }

    const nextParts = pathParts.slice(0, languageIndex);
    nextParts.push(targetLanguage);
    nextParts.push(...pathParts.slice(languageIndex + 1));

    let nextPath = nextParts.join("/");
    if (!nextPath.startsWith("/")) {
      nextPath = "/" + nextPath;
    }

    return nextPath + window.location.search + window.location.hash;
  }

  function updateMaterialLanguageLinks() {
    document
      .querySelectorAll("a.md-select__link[hreflang], link[rel='alternate'][hreflang]")
      .forEach((link) => {
        const targetLanguage = link.getAttribute("hreflang");
        if (!languages.includes(targetLanguage)) {
          return;
        }

        const nextUrl = samePageLanguageUrl(targetLanguage);
        if (nextUrl) {
          link.setAttribute("href", nextUrl);
        }
      });
  }

  function bindSearchEntry() {
    document.querySelectorAll("[data-search-trigger]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const search = document.querySelector("[data-md-toggle='search']");
        if (search) {
          search.checked = true;
        }

        window.setTimeout(() => {
          const input = document.querySelector(".md-search__input");
          if (input) {
            input.focus();
          }
        }, 80);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      updateMaterialLanguageLinks();
      bindSearchEntry();
    });
  } else {
    updateMaterialLanguageLinks();
    bindSearchEntry();
  }
})();
