import english from './en'

export default () => {
  const translations = english().then(messages => {
    const temporary = {...messages}
    temporary.world = 'Mundo'
    temporary.apple = 'Sem maçãs | Um maçã | {count} maçãs'
    temporary.howmany = 'Quantas maçãs você possui'
    return temporary
  })
  return new Promise(resolve => {
    resolve(translations)
  })
}
