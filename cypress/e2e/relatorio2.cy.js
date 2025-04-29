/// <reference types="cypress"/>

describe('Cenários de testes', () => {
  
  it('Realizar um registro com sucesso ', () => {

    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('matheus')
    cy.get('#Text1').type('matheus')
    cy.get('#username').type('matheus')
    cy.get('#password').type('matheus')
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Registration successful')

  })

  it('Falha de registro por falta de info', () => {

    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
    cy.get('#firstName').type('matheus')
    cy.get('#Text1').type('matheus')
    cy.get('#username').type('matheus')
    cy.get('.btn-primary').should('be.disabled')

  })

  it('Login com sucesso', () => {

    let info = register()

    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', info[0])

  })

})

function register(){

  let secs = new Date().getSeconds().toString()
  let min = new Date().getMinutes().toString()
  let hours = new Date().getHours().toString() 
  
  let ID = hours + min + secs + 'ID'
  let Senha = hours + min + secs + 'Senha'
  let user = [ID, Senha]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(ID)
  cy.get('#Text1').type(ID)
  cy.get('#username').type(ID)
  cy.get('#password').type(Senha)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return user
}