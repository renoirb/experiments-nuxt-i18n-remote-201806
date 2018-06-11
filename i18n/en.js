export default (a) => {
  console.log('foo', a)
  const translations = {
    world: 'World (from i18n/en)',
    car: 'car | cars',
    apple: 'No apples | one apple | {count} apples',
    welcome: 'Welcome!',
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
