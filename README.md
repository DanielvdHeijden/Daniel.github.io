# Daniel.github.io

Stap 1: De bezoeker opent een pagina of klikt op een navigatielink.
Stap 2: De browser stuurt een HTTP GET-request naar de webserver voor het HTML-bestand.
Stap 3: De server retourneert het bestand, normaal met status 200 OK.
Stap 4: De browser leest de HTML en vraagt CSS, JavaScript en afbeeldingen op via aanvullende requests.
Stap 5: Als je JavaScript de header en footer met fetch() inlaadt, ontstaan daarvoor aparte requests. De ontvangen HTML wordt aan de pagina toegevoegd.
Stap 6: De browser verwerkt de bestanden en toont de opgemaakte pagina. Bij een ontbrekend bestand kan de server 404 Not Found retourneren.


Scenario 1: Een recruiter bekijkt de site op een laptop en wil snel mijn ervaring, vaardigheden en projecten beoordelen.
Scenario 2: Een medestudent bezoekt de site op een telefoon en wil lezen wat ik maak en leer.

Ontwerpkeuze | Scenario | Onderbouwing
Dezelfde navigatie op iedere pagina | 1 en 2 | Bezoekers kunnen steeds op dezelfde plek wisselen tussen mijn profiel, projecten en blog.                                                             |
Meerdere kolommen op desktop, één kolom op kleinere schermen | 2 | Tekst en projectblokken komen onder elkaar te staan, zodat de inhoud op een telefoon leesbaar blijft. Dit is toegepast met CSS Grid en media queries.
Vaste opbouw van projecten met titel, beschrijving, focus en gebruikte technologie | 1 | Een recruiter kan projecten snel vergelijken en zien welke ervaring ik heb en wat mijn bijdrage was.                                                  |
