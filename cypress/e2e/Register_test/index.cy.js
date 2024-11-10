describe('POST /register endpoint tests', ()=>{
    it('should does not register successfully when email exists in database', () => {
        cy.intercept('POST', '/register', {
            statusCode: 409,
            body: { message: 'false'}
        }).as('registerConflict');

        cy.request({
            method : 'POST',
            url: '/register',
            body: {
                name :'Test',
                surname : 'Test',
                adress : 'Łączna 43',
                email : 'bugi@wp.pl',
                city : 'ZSK',
                zip : '12345',
                pass: 'testtest',
                repass : 'testtest',
            },
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(409);
            expect(response.body.message).to.eq('false'); 
        })
    })

    it('should register user when email does not exist in database',() =>{
        cy.intercept('POST', '/register', {
            statusCode: 201,
            body: { message: 'true' }
        }).as('registerSuccess')
        cy.request({
            method : 'POST',
            url : '/register',
            body: {
                name :'Wojtek',
                surname : 'Xiega',
                adress : 'Poznan',
                email : 'dane_do_testu@wp.pl',
                city : 'ZSK',
                zip : '12345',
                pass: 'testtest12',
                repass : 'testtest12',
            },
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('true'); 
        })
    })

    //Ten test przechodzi tylko jesli w pliku Register/index.js odkomentujemy linie z Throw error bo na razie nie udalo mi sie go zrobic
    it('should handle server error gracefully', () => {
        cy.intercept('POST', '/register', {
            statusCode: 500,
            body: { message: 'false', error: 'Database error' }
          }).as('register error');

          cy.request({
            method: 'POST',
            url: '/register',
            body: {
                name: 'John',
                surname: 'Doe',
                adress: 'Some address',
                email: 'john.doe.test@example.com',  
                city: 'Some City',
                zip: '12345',
                pass: 'password123',
                repass: 'password123',
            },
            failOnStatusCode: false 
          }).then((response) => {
            expect(response.status).to.eq(500); 
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.eq('false');
            //expect(response.body).to.have.property('error');
            
            
          });
    })
})