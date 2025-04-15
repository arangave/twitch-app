export class TwitchService {
  private clientId = 'kd4lovlti8kahhazcqw5azpmi0j2te'
  private accessToken = 'wt592jrab2wibo7e8e1aulhir0eub5'

  async getStreams(limit = 20) {
    const response = await fetch(`https://api.twitch.tv/helix/streams?first=${limit}`, {
      headers: {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener streams en vivo')
    }

    const data = await response.json()
    return data.data
  }

  async getRecommendedChannels(limit = 10) {
    const response = await fetch(`https://api.twitch.tv/helix/streams?first=${limit}`, {
      headers: {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener canales recomendados')
    }

    const data = await response.json()
    return data.data
  }
}
