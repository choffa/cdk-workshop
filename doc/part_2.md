# Backend
Det første vi vil sette opp er backend'en. Om du husker figuren fra tidligere består denne av en eller flere lambda'er som ligger bak en API gateway og som skriver til en DynamoDB tabell.

Først må du åpne filen `infrastructure/todo-app.ts` og endre `user` variabelen. Dette er fordi alle i workshopen bruker samme konto, så vi må passe på å unngå kollisjon! Videre kan du åpne filen `infrastructure/stacks/backend-stack.ts` og skriv koden der.

Det første vi må forstå er hvordan API'et skal se ut, det er definert i tabellen under:

| Path | Metode | Body | Forklaring |
| ---- | ------ | ---- | ---------- |
| `/tasks` | `GET` | `` | Henter en liste over alle gjøremål |
| `/tasks` | `POST` | `{ description: string }` | Lager et nytt gjøremål |
| `/tasks/<id>` | `PUT` | `{ description: string | undefined, done: boolean | undefined }` | Oppdaterer ett gjøremål |

Du kan velge selv om du vil bruk en lambda pr path, eller en felles. Den felles handleren heter `handler`, mens de individuelle heter henholdsvis `add_task`, `get_tasks` og `update_task`. Det er selvsagt enklest å bruke bare én ;).

Videre skal gjøremålene larges i en DynamoDB Tabell. Det viktigste med denne tabellen er at den _må_ ha en partisjonsnøkkel med navn `id` som er av typen `string`. Videre er det en fordel om vi bare trenger å betale pr. forespørsel. Husk også at alle funksjonene må ha tilgang til å lese/skrive denne tabellen og at de trenger en måte å finne denne på. Lambdaene er satt opp til å lese en environmentvariabel med navn `TASK_TABLE_NAME` for dette.

Til slutt må du passe på at det er mulig å få tak i URL'en senere, ettersom denne er autogenerert. Merk også at denne bare blir til en verdi ved deployering, dersom du prøver å skrive ut denne før vil du få en [Token](https://docs.aws.amazon.com/cdk/v2/guide/tokens.html)


## Deploy!
Dersom du mener at alt er på plass, kan du åpne en terminal og kjøre `npx cdk synth` for å sjekke at koden din syntiserer korrekt til CFN. Dersom det ikke er noen problemer her kan du så kjøre `npx cdk deploy` for å deploye!

For å verifisere at alt er som forventet kan du gjøre følgende `curl` kall, men endre `<url>` med den som finnes i output fra `deploy` kommandoen.

```bash
# Lager et nytt gjøremål
curl --location --request POST '<url>/tasks' \
--header 'Content-Type: application/json' \
--data-raw '{ "description": "My task" }'
```

```bash
# Henter alle gjøremål
curl --location --request GET '<url>/tasks'
```

```bash
# Oppdater et gjøremål. Husk å endre <id>
curl --location --request PUT '<url>/tasks/<id>' \
--header 'Content-Type: application/json' \
--data-raw '{ done: true }'
```

Dersom alt ser riktig ut, er du klar til å gå videre til å [deploye nettsiden](part_3.md)
