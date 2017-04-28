const getNextErrors = (errors, errorType, errorMesg) => {
  const nextErrors = errors.filter(error => error.errorType !== errorType)
  nextErrors.push({
    errorType,
    errorMesg
  })
  return nextErrors
}

export default {
  getNextErrors
}
