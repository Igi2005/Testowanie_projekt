describe('POST /save - Save Score Endpoint', () => {
    const apiUrl = 'http://localhost:3000';
  
    beforeEach(() => {
      // Przed każdym testem upewniamy się, że przechwycimy żądania
      cy.intercept('POST', `${apiUrl}/save`).as('saveScore');
    });
  
    it('should return a message when email and password are missing', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/save`,
        body: {
          name: 'TestUser',
          score: 100,
        },
        failOnStatusCode: false, // Nie przerywaj w przypadku błędu HTTP
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('You have to login to save score');
      });
    });
  
    it('should return 400 when the user is not found', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/save`,
        body: {
          email: 'nonexistent@test.com',
          pass: 'wrongpassword',
          name: 'NonexistentUser',
          score: 150,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('User not found!');
      });
    });
  
    it('should update the score for an existing user', () => {
      const mockUser = {
        email: 'testuser@test.com',
        pass: 'correctpassword',
        name: 'TestUser',
        score: 200,
      };
  
      cy.request('POST', `${apiUrl}/save`, mockUser).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Update!');
      });
  
      cy.wait('@saveScore').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.message).to.eq('Update!');
      });
    });
  
    it('should create a new result for a new user score', () => {
      const mockUser = {
        email: 'newuser@test.com',
        pass: 'correctpassword',
        name: 'NewUser',
        score: 50,
      };
  
      cy.request('POST', `${apiUrl}/save`, mockUser).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Added');
      });
  
      cy.wait('@saveScore').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.message).to.eq('Added');
      });
    });
  });
  