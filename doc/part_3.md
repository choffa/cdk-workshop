# Frontend
Når som vi har en snaisen backend-tjeneste som kan holde kontroll på gjøremålene våre, er det på tide å få opp en applikasjon som kan vise dem på en finere måte. Til dette formålet bruker vi en offentlig tilgjengelig S3 bøtte.

For denne stacken er det ingen boilerplate, så lag en ny fil med passende navn, og husk å referere til den i `infrastructure/todo-app.ts`.

Den enkleste veien til Rom er å bygge nettsiden manuelt og så laste opp innholdet i den resulterende `build` mappen til S3. Men dette kan føre til enkelte problemer ettersom npm bibliotek _kan_ variere basert på plattform. Derfor er det bedre om vi kan la CDK ta seg av bygging også. Og flaks for oss, så finnes det en Construct for dette. Det er også en liste med ting som kan være greie å vite:

1. Applikasjonen må vite om API url, dette skjer gjennom miljøvariabelen `REACT_APP_API_URL`. Her må vi jukse litt. Ettersom vi bruker vil bruke den autogenererte url'en, under `synth` men denne bare blir til en "ekte" verdi ved `deploy`, så må vi hardkode URL inn. Denne finner du i outputen fra forrige deploy. Den autogenererte URL'en vil ikke endre seg så lenge du ikke gjør endringer på API Gateway som krever "Replace". (Vanligvis vil man jo kjenne til domenet til API uansett.)
2. Dersom du har problemer med å få bygget med `npx cdk synth`, så må du kanskje legge til miljøvariablene [`npm_config_cache=/tmp/npm_cache` og `npm_config_update_notifier=false`](https://github.com/aws/aws-cdk/issues/8707#issuecomment-1010937688)
3. Byggekommandoen kan være litt finicky å finne ut av, så bruk denne:
```node
[
  'sh',
  '-c',
  [
    `cd $(mktemp -d)`,
    `cp -r /asset-input/* .`,
    `npm ci`,
    `npm run build`,
    `cp -r build/* /asset-output`,
  ].join(' && ')
]
```

PS: Merk at bruk av bundling krever at man har Docker installert og kjørende på maskinen.

Det kan også være lurt å bruke en `CfnOutput` til å lagre URL til nettsiden, da blir den også skrevet fint ut i konsollet etter deploy.

Dersom alt ser riktig ut, kan du kjøre en ny `npx cdk deploy --all` og åpne linken til nettsiden. Gratulerer, du er ferdig med workshopen!
