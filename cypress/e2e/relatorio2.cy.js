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

  it('Login com senha errada', () => {

    let info = register()
    let senha_errada = info[1] + 'Errada'

    cy.get('#username').type(info[0])
    cy.get('#password').type(senha_errada)
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Username or password is incorrect')

  })

  it('Login com usuário errado', () => {
    
    let info = register()
    let user_errado = info[0] + 'Errada'

    cy.get('#username').type(user_errado)
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Username or password is incorrect')

  })

  it('Login após usuário ser deletado', () => {

    let info = register_login()

    cy.get('.ng-binding > a').click()
    cy.get('.btn').click()
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Username or password is incorrect')

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

function register_login(){

  let info = register()

  cy.get('#username').type(info[0])
  cy.get('#password').type(info[1])
  cy.get('.btn-primary').click()
  cy.get('h1.ng-binding').should('contain.text', info[0])

  return info
}