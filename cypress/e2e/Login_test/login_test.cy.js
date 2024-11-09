describe('POST /login endpoint tests', () => {
  
    it('should login successfully when user exists', () => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: 'bugi@wp.pl', // wpisz poprawny email z bazy
          pass: 'testtest' // wpisz poprawne hasło z bazy
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('true');
        expect(response.body).to.have.property('name'); // Sprawdź, czy pole "name" jest zwracane
      });
    });
  
    it('should return false when user does not exist', () => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: 'non_existing_user@example.com', // email, który nie istnieje
          pass: 'any_password'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('false');
        expect(response.body).to.not.have.property('name'); // Upewnij się, że nie ma pola "name"
      });
    });
  
    it('should handle server error gracefully', () => {
      cy.intercept('POST', '/login', {
        statusCode: 500,
        body: { message: 'false', error: 'Error fetching user' }
      }).as('loginError');
  
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: 'test@example.com',
          pass: 'test_password'
        },
        failOnStatusCode: false // Pozwala nam przechwycić odpowiedzi z kodem błędu
      }).then((response) => {
        expect(response.status).to.eq(200); // lub `500`, jeśli backend zwróci odpowiednio
        expect(response.body.message).to.eq('false');
      });
    });
  
  });
  