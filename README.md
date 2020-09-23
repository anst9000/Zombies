# **Zombies**

---

## Beskrivning

> Det finns 100 hus i en by där det bor en person i varje hus. En dag kommer en zombie och hälsar på i ett slumpmässigt utvalt hus. Efter besöket är husets ägare smittad och vi har alltså två zombies som går nästa runda.
> Kör så många rundor som krävs tills alla husägare har blivit zombies. Zombies har inget minne av vilket hus de redan varit i utan kan även gå till tomma hus.
> Visuellt ska det visas med enkla medel om vilka hus som är friska och infekterade under körning (kanske med lite delay mellan varje runda för att man ska hinna se förändringar).
> Med enkel presentation menas att till exempel göra 100 gröna 10px X 10px divar som blir röda när ägaren är infekterad.
> Programmet ska köra tio gånger och presentera hur många rundor det tog innan alla blev zombies och sedan visa ett snittantal för dessa rundor.

## Tankegångar

> För att få till en trevlig och bra grafisk presentation av körningen på filen så tänkte jag det var smidigt med html, css och js, eftersom man får upp ett resultat på webbläsaren direkt.
> Jag inkluderade Bootstrap, jQuery och Font Awesome för att slippa skapa ett eget flex-system. Allt finns ju klappat och klart i Bootstrap redan, bara att använda rätt klasser.
> Font Awesome är mycket bra om man vill hitta enkla ikoner som går att färglägga i angivna färger. Det är både husen och gubbarna i navbar som är från FA.
> I Bootstrap använder man row och sedan anger man hur stor varje kolumn ska vara. I varje rad är det 10 hus med en tom kolumn både till höger och vänster.
> CSS:en är ytterst sparsam, men det blev lite till där eftersom min son är färgblind mellan grönt och rött. Det var anledningen till att jag la till en 'dark mode'-knapp som ändrar vilk klasser som ska ligga på respektive element.
> I JS-filerna har jag använt en del jQuery vilket ofta ger korta och beskrivande funktioner, till exempel då man trycker på några av menyknapparna längst upp.
> Det svåraste med JavaScript-delen var hur man skulle spara varje körning och ange ett snitt efter det. Men jag löste det med local storage. Det är en fungerande lösning men jag hade velat hitta en bättre lösning än så.

## Tankegångar

> The Internet address to this site is [https://anst9000.xyz/panel](https://anst9000.xyz/panel) . This folder is protected with a password to decrease the possibilities to enter the API trying to change the content of it. See under login to Admin. When entering the site for the first time you have to create a username and a password which is hashed and stored in a datatbase. After doing this you can enter the Admin pages and there is full CRUD functionality for this REST API.

## Utdrag ur programkoden

> Här kommer ett utdrag ur programkoden. Det är från funktionen när man har klickat på 'update'-knappen.

```js
$("#update").click(function () {
  epidemics = parseInt(localStorage.getItem("epidemics") || 0);

  if (epidemics == 10) {
    localStorage.removeItem("epidemics");
    localStorage.removeItem("rounds");
    epidemicsText.textContent = "Epidemics: 0";
    roundsPerEpidemicText.textContent = "Rounds/Epidemic: 0.0";
    roundsText.textContent = "Rounds: 0";
  }

  totalInfectedHouses = countInfectedHouses();
  nrOfZombies = totalInfectedHouses + 1;
  printTotalZombies(nrOfZombies);

  if (nrOfZombies < 101) {
    buttonClicks++;
    roundsText.textContent = "Rounds: " + buttonClicks;
    console.log(buttonClicks);
  } else if (!storeRounds) {
    allAreZombies = true;
    totalRounds = parseInt(localStorage.getItem("rounds") || 0);
    localStorage.setItem("rounds", totalRounds + buttonClicks);
    epidemics = parseInt(localStorage.getItem("epidemics") || 0) + 1;
    localStorage.setItem("epidemics", epidemics);
    storeRounds = true;
  }

  if (allAreZombies && storeRounds) {
    console.log("all are zombies and stored...");
    epidemicsText.textContent = "Epidemics: " + epidemics;
    totalRounds = parseInt(localStorage.getItem("rounds") || 0);
    roundsPerEpidemicText.textContent =
      "Rounds/Epidemic: " + Math.round((totalRounds / epidemics) * 10) / 10;
    roundsText.textContent = "Rounds: " + buttonClicks;
  }

  for (let zombie = 0; zombie < nrOfZombies; zombie++) {
    visitHouse();
  }
});
```
