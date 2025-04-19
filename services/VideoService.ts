export class VideoService {
  private clientId = 'kd4lovlti8kahhazcqw5azpmi0j2te'
  private accessToken = 'wt592jrab2wibo7e8e1aulhir0eub5' // Asegúrate de que el token esté actualizado

  async getStreamDetails(streamId: string) {
    try {
      console.log('Buscando detalles para el stream de:', streamId) // Depuración

      // Verifica si streamId es el login del usuario
      const userResponse = await fetch(
        `https://api.twitch.tv/helix/users?login=${streamId}`,
        {
          headers: {
            'Client-ID': this.clientId,
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      )

      const userData = await userResponse.json()
      console.log('Datos del usuario:', userData) // Depuración

      // Verifica si los datos del usuario existen
      if (!userData.data || userData.data.length === 0) {
        throw new Error('No se encontró el usuario')
      }

      const userId = userData.data[0].id
      console.log('ID del usuario:', userId) // Depuración

      // Realiza la consulta con el ID del usuario para obtener el stream
      const response = await fetch(
        `https://api.twitch.tv/helix/streams?user_id=${userId}`,
        {
          headers: {
            'Client-ID': this.clientId,
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      )

      const data = await response.json()
      console.log('Detalles del stream:', data) // Depuración

      if (!data.data || data.data.length === 0) {
        console.error('No se encontraron detalles para este stream')
        return null
      }

      return data.data[0] // Devuelves los detalles del stream
    } catch (error) {
      console.error('Error al obtener detalles del video:', error)
      return null
    }
  }

  // Método para obtener el URL del video (esto no lo modificamos)
  async getVideoUrl(userName: string) {
    return `https://player.twitch.tv/?channel=${userName}&autoplay=true&parent=localhost`
  }
}
