export function notFound (request, response, next) {
  response.status(404).end()
}