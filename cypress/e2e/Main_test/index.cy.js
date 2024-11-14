describe('GET /register endpoint tests', ()=>{
    /*it('should get correctly results',() => {
        cy.intercept('GET', '/results', {
            statusCode: 200,
            body: [
                {
                  score: 100,
                  created_at: '2024-11-10 18:29:43',
                  users: {
                    first_name: 'John'
                  }
                }
            ]
        }).as('get all data results');
        cy.request({
            method : 'GET',
            url: '/results',
            body: [
                {
                  score: 100,
                  created_at: '2024-11-10 18:29:43',
                  users: {
                    first_name: 'John'
                  }
                }
            ],
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(200); 
            response.body.forEach(result => {
                expect(result).to.have.property('score');
                expect(result).to.have.property('created_at');
                expect(result).to.have.property('users');
                expect(result.users).to.have.property('first_name');
              });
        })
    })*/
    //Ten test przechodzi tylko jesli w pliku Main/index.js odkomentujemy linie z Throw error bo na razie nie udalo mi sie go zrobic
    it('should handle server error gracefully ', () => {
        cy.intercept('GET', '/results', {
            statusCode: 500,
            body: { error : 'An error occurred while retrieving results'}
          }).as('get data error');

          cy.request({
            method: 'GET',
            url: '/results',
            failOnStatusCode: false 
          }).then((response) => {
            expect(response.status).to.eq(500); 
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.eq('An error occurred while retrieving results');    
          });
    })
})