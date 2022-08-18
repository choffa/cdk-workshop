# Oppsett

Før vi går skikkelig i gang, er det et par ting du trenger å ha installert og satt opp på maskinen din.

# Docker
For å få fullt utbytte av workshopen er det en fordel om du har [Docker](https://www.docker.com/) installert. Selv om det ikke er strengt nødvendig så anbefales det sterkt.

## Node
I denne workshopen skal vi skrive CDK koden i Typescript. Webapplikasjonen vi skal deploye er også skrevet i react, så du må ha en nyere versjon av Node installert. Det anbefales at du installerer en LTS versjon. Nedlastninger for alle system finnes [her](https://nodejs.org/en/).

## AWS CLI
Dette brukes til å kommunisere med AWS og er også den enkleste måten å sette opp credentials som CDK trenger. Installasjonsguide for alle systemer finnes [her](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

For å sette opp credentials må man kjøre `aws configure`. Den vil spørre om `AWS Access Key ID` og `AWS Secret Access Key`. Disse skal du ha fått tilsendt på forhånd.

PS: Et tips er å bruke `--profile <profile-name>` flagget og så sette `AWS_PROFILE` miljøvariabelen til `<profile-name>`. Dersom du ikke bruker dette flagget vil den lage en "default" profil.

Da er du endelig klar til å skrive [litt kode](part_2.md)
