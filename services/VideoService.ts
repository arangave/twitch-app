// En VideoService.ts
export class VideoService {
  private clientId = 'kd4lovlti8kahhazcqw5azpmi0j2te'
  private accessToken = 'wt592jrab2wibo7e8e1aulhir0eub5'

  // Obtener detalles del stream
  async getStreamDetails(streamId: string) {
    const response = await fetch(
      `https://api.twitch.tv/helix/streams?user_id=${streamId}`,
      {
        headers: {
          'Client-ID': this.clientId,
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Error al obtener detalles del stream')
    }

    const data = await response.json()
    return data.data[0] // Detalles del stream
  }

  // Obtener URL del video
  async getVideoUrl(userName: string) {
    return `https://player.twitch.tv/?channel=${userName}&autoplay=true`
  }
}
