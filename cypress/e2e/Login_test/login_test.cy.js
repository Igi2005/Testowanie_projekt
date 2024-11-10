describe('POST /login endpoint tests', () => {
  
    it('should login successfully when user exists', () => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: 'bugi@wp.pl', 
          pass: 'testtest' 
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('true');
        expect(response.body).to.have.property('name'); 
      });
    });
  
    it('should return false when user does not exist', () => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: 'non_existing_user@example.com', 
          pass: 'any_password'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('false');
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
        failOnStatusCode: false 
      }).then((response) => {
        expect(response.status).to.eq(500); 
        expect(response.body.message).to.eq('false');
      });
    });
  
  });
  