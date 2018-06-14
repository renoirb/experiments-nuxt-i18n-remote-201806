import fallbackMessages from './en-US'

export default () => {
  const translations = Promise.resolve(fallbackMessages).then(messages => {
    const temporary = {
      ...messages,
    }
    temporary.loadedfrom = 'Esta tela foi carregada dinamicamente a partir do: {from}! E Legal, não e!? 🤤'
    temporary.welcome = 'Bemvindo'
    temporary.world = 'Mundo'
    temporary.apple = 'Sem maçãs | Um maçã | {count} maçãs'
    temporary.alpha = '😊'
    return temporary
  })
  return new Promise(resolve => {
    resolve(translations)
  })
}
