export default () => {
  return new Promise(resolve => {
    resolve({
      welcome: 'Bienvenue!',
      world: 'Planète (chargé à partir de i18n/fr)',
      car: 'auto | autos',
      apple: 'Pas de pommes | Une pomme | {count} pommes',
      howmany: 'Combien de {what} possédez-vous',
      ownhowmany: 'Vous avez présentement',
      add: 'ajouter',
      cutedog: 'Voici un joli pitou',
      iown: 'I own'
    })
  })
}
