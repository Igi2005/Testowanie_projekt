describe('POST /save - Save Score Endpoint', () => {
    const apiUrl = 'http://localhost:3000';
  
    beforeEach(() => {
      cy.intercept('POST', '/save').as('saveScore');
    });
  
    it('should return a message when email and password are missing', () => {
      cy.request({
        method: 'POST',
        url: '/save',
        body: {
          name: undefined,
          pass: undefined,
          email: undefined,
          score : 40
        },
        failOnStatusCode: false, 
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('You have to login to save score');
      });
    });
  
    it('should return 400 when the user is not found', () => {
      cy.request({
        method: 'POST',
        url: '/save',
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
      cy.request({
        method : 'POST',
        url: '/save',
        body: {
          email: 'john.doe@example.com',
          pass: 'hashed_password_here',
          name: 'John',
          score: 250
        }, failOnStatusCode:false,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('Update!');
      })
    });
    
    it('should create a new result for a new user score', () => {
      cy.request({
        method: 'POST',
        url: '/save',
        body: {
          email: 'xiega2@wp.pl',
          pass: 'testtest',
          name: 'Wojtas2',
          score: 1901
        },failOnStatusCode:false
      }).then((res)=>{
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('Added');
      })
  
    });
  });
  