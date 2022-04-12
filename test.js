let themes = [`vibrantInk`,"tranquilHeart","tomorrowNightBright", "tomorrowNightBlue", "tomorrowNight8", "tomorrowNight", "tomorrow", "hemisuLight","hemisuDark", "gitHubV2", "gitHub","atelierPlateauLight","atelierPlateauDark","atelierLakesideLight","atelierLakesideDark","atelierHeathLight","atelierHeathDark","atelierForestLight","atelierForestDark","atelierEstuaryLight","atelierEstuaryDark","atelierDuneLight","atelierDuneDark","atelierCaveLight","atelierCaveDark"]

document.querySelectorAll("link")[2].href = `./themes/${themes[themes.length - 1]}.css`;
