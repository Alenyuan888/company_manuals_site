(function () {
  const languages = ["zh", "en", "bn"];

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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateMaterialLanguageLinks);
  } else {
    updateMaterialLanguageLinks();
  }
})();
