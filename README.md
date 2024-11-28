## Dokumentacja Frontendowa
To jest frontendowa część aplikacji, która komunikuje się z backendem, obsługując interfejs użytkownika dla funkcji takich jak logowanie, rejestracja, czat, wyświetlanie wyników oraz zapisywanie wyników graczy.

## Technologie
* React: Biblioteka do tworzenia interfejsu użytkownika
* Axios: Biblioteka do wykonywania zapytań HTTP
* CSS/SCSS: Do stylizacji aplikacji
* React Router: Do nawigacji po aplikacji

# Wymagania
* Node.js
* NPM (Node Package Manager)
* Przeglądarka internetowa (np. Google Chrome)

## Setup
Jak włączyć frontend:

```
$ git clone -b Front https://github.com/Igi2005/Testowanie_projekt.git
$ cd Front
$ npm i
$ npx prisma init
$ npx prisma db pull
$ npm install cypress
$ npm start
```

# Funkcjonalności
1. Logowanie użytkownika
* Komponent Login.js umożliwia użytkownikom logowanie się do systemu. Wprowadzenie poprawnych danych (email, password) skutkuje przekierowaniem użytkownika do strony głównej aplikacji lub wyświetleniem komunikatu o błędzie.

2. Rejestracja nowego użytkownika
* Komponent Register.js pozwala użytkownikom na utworzenie nowego konta w aplikacji. Po poprawnym zapisaniu danych, użytkownik otrzymuje komunikat o pomyślnym utworzeniu konta.

3. Czat
* Komponent Chat.js pozwala użytkownikom na wysyłanie wiadomości. Każda wiadomość jest zapisywana w bazie danych i wyświetlana na stronie czatu.

4. Wyniki graczy
* Komponent Results.js pozwala na wyświetlanie wyników graczy. Wyniki są pobierane z backendu i wyświetlane w postaci listy.

5. Zapis wyników gracza
* Komponent SaveScore.js pozwala użytkownikom na zapisanie swojego wyniku, który jest następnie przechowywany w bazie danych.

# Autorzy
* Igor Rewers
* Aleksander Poniatowski
* Hugo Plewa
