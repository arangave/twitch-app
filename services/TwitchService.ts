export class TwitchService {
  private clientId = 'kd4lovlti8kahhazcqw5azpmi0j2te'
  private accessToken = 'wt592jrab2wibo7e8e1aulhir0eub5'

  private verifiedUsers = ['midudev', 'xqc', 'ibai', 'auronplay', 'elrubius']

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

    return data.data.map((stream: any) => ({
      ...stream,
      user_login: stream.user_login || stream.user_name?.toLowerCase() || '',
      is_verified: this.verifiedUsers.includes(stream.user_name?.toLowerCase() || ''),
      tags: ['Español', 'DropsActivados'],
    }))
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

    return data.data.map((channel: any) => ({
      ...channel,
      user_login: channel.user_login || channel.user_name?.toLowerCase() || '',
      is_verified: this.verifiedUsers.includes(channel.user_name?.toLowerCase() || ''),
    }))
  }

  async getTopCategoriesWithViewers(limit = 10) {
    // 1. Obtener top juegos
    const gamesResponse = await fetch(
      `https://api.twitch.tv/helix/games/top?first=${limit}`,
      {
        headers: {
          'Client-ID': this.clientId,
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    )

    if (!gamesResponse.ok) {
      throw new Error('Error al obtener categorías')
    }

    const gamesData = await gamesResponse.json()
    const games = gamesData.data

    // 2. Obtener muchos streams (hasta 100)
    const streamsResponse = await fetch('https://api.twitch.tv/helix/streams?first=100', {
      headers: {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    if (!streamsResponse.ok) {
      throw new Error('Error al obtener streams')
    }

    const streamsData = await streamsResponse.json()
    const streams = streamsData.data

    // 3. Agrupar viewers por game_id
    const viewerCountPerGame: Record<string, number> = {}

    streams.forEach((stream: any) => {
      if (viewerCountPerGame[stream.game_id]) {
        viewerCountPerGame[stream.game_id] += stream.viewer_count
      } else {
        viewerCountPerGame[stream.game_id] = stream.viewer_count
      }
    })

    // 4. Asignar una etiqueta general por juego (simulada)
    return games.map((game: any) => {
      const lowerName = game.name.toLowerCase()

      let tag = 'Gaming'
      if (lowerName.includes('chat')) tag = 'IRL'
      else if (lowerName.includes('simulator')) tag = 'Simulation'
      else if (lowerName.includes('software') || lowerName.includes('dev'))
        tag = 'Software'
      else if (lowerName.includes('music')) tag = 'Music'

      return {
        id: game.id,
        name: game.name,
        viewer_count: viewerCountPerGame[game.id] || 0,
        box_art_url: game.box_art_url
          .replace('{width}', '200')
          .replace('{height}', '270'),
        tag,
      }
    })
  }
}
