import { z } from 'zod'

/**
 * Defines the schema for a chat message using Zod.
 * Ensures that the message is a non-empty string.
 *
 * Define el esquema para un mensaje de chat utilizando Zod.
 * Garantiza que el mensaje sea una cadena no vacía.
 */
export const ChatMessageSchema = z.object({
  message: z.string().min(1, 'El mensaje no puede estar vacío'),
})

export type ChatMessageDto = z.infer<typeof ChatMessageSchema>
