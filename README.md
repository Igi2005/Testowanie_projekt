## Projekt Backendowy - Clicker
## To jest dokumentacja dla backendowej części portalu, który obsługuje funkcjonalności związane z graczami, ich kontami oraz interakcjami na platformie. Poniżej opisano główne endpointy API oraz ich funkcje.

Technologie
* [Język programowania: express js]
* [Baza danych: Prisma]
* [Testy: Cypress]


## Setup
Jak włączyć backend:

```
$ git clone -b Back https://github.com/Igi2005/Testowanie_projekt.git
$ cd Back
$ npm i
$ npx prisma init
$ npx prisma db pull
$ npm install cypress
$ node index.js
```

## Endpoint POST /login
Opis:
* [Loguje użytkownika na podstawie podanych danych (email, password). Jeśli dane są poprawne, zwraca imię użytkownika.]

## Enpoint POST /register
Opis:
* [Rejestruje nowego użytkownika w systemie, tworząc konto z podanym email, password i innymi danymi.]

## Endpoint POST /chat
Opis:
* [Pozwala użytkownikom wysyłać wiadomości na czacie. Wymaga podania email i password w celu autoryzacji użytkownika oraz treści wiadomości (content).

## Endpoint GET /chat
Opis:
* [Pobiera wszystkie wiadomości z czatu posortowane po czasie w porządku malejącym. Zwraca także imiona i nazwiska użytkowników, którzy wysłali wiadomości.]

## Endpoint POST /save
Opis:
* [Zapisuje lub aktualizuje wynik gracza w systemie. Wymaga danych o email, password, oraz wyniku (score).]

##E ndpoint POST/ delete
Opis:
* [Usuwa konto użytkownika oraz wszystkie powiązane z nim dane (np. wyniki). Wymaga podania danych logowania (email i password).]

## Autorzy
* [Igor Rewers]
* [Hugo Plewa]
* [Aleksander Poniatowski]
