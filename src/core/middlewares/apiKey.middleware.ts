import { Request, Response, NextFunction } from 'express'

/**
 * Validates the API key provided in the request headers.
 * Checks if the `x-api-key` or `authorization` header matches the server's API key.
 * If the API key is invalid or missing, it responds with a 401 Unauthorized status.
 * Otherwise, it allows the request to proceed to the next middleware.
 *
 * Valida la clave API proporcionada en los encabezados de la solicitud.
 * Verifica si el encabezado `x-api-key` o `authorization` coincide con la clave API del servidor.
 * Si la clave API es inválida o falta, responde con un estado 401 Unauthorized.
 * De lo contrario, permite que la solicitud continúe al siguiente middleware.
 *

 */
export function validateApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKeyHeader = req.headers['x-api-key'] || req.headers['authorization']
  const apiKeyStr = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader

  const serverApiKey = process.env.API_KEY?.trim()

  if (!apiKeyStr || apiKeyStr !== serverApiKey) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}
