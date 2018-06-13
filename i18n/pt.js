import english from './en'

export default () => {
  const translations = Promise.resolve(english).then(messages => {
    const temporary = {...messages}
    temporary.welcome = 'Bemvindo'
    temporary.world = 'Mundo'
    temporary.apple = 'Sem maçãs | Um maçã | {count} maçãs'
    return temporary
  })
  return new Promise(resolve => {
    resolve(translations)
  })
}
