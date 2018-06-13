export const filterFactory = collection => (key, seek) => collection.filter(subject => {
  const hasKey = Reflect.has(subject, key)
  const hasSeekNotFalse = hasKey ? subject[key] === seek : false
  return hasSeekNotFalse !== false
})
