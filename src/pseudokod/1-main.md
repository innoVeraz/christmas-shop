Body:

- centrerad med en max-width för desktop 480.
- button med scroll to top function. Syns när man börjar scrolla ner på sidan och döljs när man scrollar upp.

Header:

- position fixed och display flex
- Hamburger meny för mobil, css och js, toggle change, breakpoint 480 döljs på desktop. Visar istället nav.
- logotyp, får vara en img centrerad och klickbar med home page link så man alltid kan landa på startsidan från alla sidor av sajten.
- varukorgsikon klickbar på mobil, hover funktion för desktop visar en del av varukorgen i vänster hörn, klicka för att se hela varukorgen på en ny sida. varukorguppdatering med javascript dom-manipilation av siffra samt en eventuell animation med puls på paket-ikonen

Nav: (endast desktop)

- position fixed och display flex
- Länkar till kategorierna
- Hover ändrar färg på rubrikerna (css)

Main:

- Layout med grid, eventuellt med Tailwind (beroende på tid)
- två kolumner visas på desktop och mobil
- Bild med rabattkod som går att klick-kopiera
- två bilder med länkad text till två av kategorierna
- en bild med text om "pyssel-tips" (ingen länk tills vidare, tidsberoende)

Articles:

- Array i js med produktinformation img, price, description etc. Visas på sidan med loop.
- button "lägg till" för att lägga till i varukorgen, eventlistener på alla addToCartBtns
- bildkarusell eller annat bildgalleri i js
- bilder med rabattkod och pyssel-tips

Footer:

- adressinformation link google-maps
- kontakta oss

Extra:

- Nav och header döljs när man scrollar ner och visas när man scrollar upp.
- Cookies pop up i footer
