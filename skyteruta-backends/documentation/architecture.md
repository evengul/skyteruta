# Skyteruta backend arkitektur

Det skal implementeres en mikrotjenestearkitektur, med meldingskø og frittstående løsninger.

Nødvendige tjenester:
 - Tilgangsstyring (autentisering og autorisering)
 - Påmelding
 - Resultater
 - Banestyring (vedlikehold, dugnader osv)
 - Registrering av skudd (sensorer)
 - Stevnestyring
 - Programstyring (opprettelse av programmer)
 - Ruteplanlegger mellom stevner

Konkrete teknologivalg gjøres for den enkelte tjeneste. Alle løsninger skal bruke Spring Boot og rabbitmq for meldinger.

Tilgangsstyring bestemmes på et senere tidspunkt, og sikres på ytterste nivå (aspects o.l.) ved behov. 
Kan hende man kan lage en avtale med DFS for å logge inn med deres systemer.