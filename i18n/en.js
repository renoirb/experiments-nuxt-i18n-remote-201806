export default () => {
  const translations = {
    welcome: 'Welcome!',
    world: 'World (from i18n/en)',
    car: 'car | cars',
    apple: 'No apples | one apple | {count} apples',
    howmany: 'How many {what} do you own',
    ownhowmany: 'You currently own',
    add: 'add',
    cutedog: 'Here is a cute dog',
    iown: 'I own'
  }
  return new Promise(resolve => {
    resolve(translations)
  })
}
