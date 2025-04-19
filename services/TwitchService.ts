export class TwitchService {
  private clientId = 'kd4lovlti8kahhazcqw5azpmi0j2te'
  private accessToken = 'wt592jrab2wibo7e8e1aulhir0eub5'

  private verifiedUsers = ['midudev', 'xqc', 'ibai', 'auronplay', 'elrubius']

  private get headers() {
    return {
      'Client-ID': this.clientId,
      Authorization: `Bearer ${this.accessToken}`,
    }
  }

  async getStreams(limit = 20) {
    const response = await fetch('https://api.twitch.tv/helix/streams?first=100', {
      headers: this.headers,
    })

    if (!response.ok) {
      throw new Error('Error al obtener streams en vivo')
    }

    const data = await response.json()

    return data.data
      .filter((s: any) => s.language === 'es')
      .sort((a: any, b: any) => b.viewer_count - a.viewer_count)
      .slice(0, limit)
      .map((stream: any) => {
        return {
          ...stream,
          user_login: stream.user_login || stream.user_name?.toLowerCase() || '',
          is_verified: this.verifiedUsers.includes(stream.user_name?.toLowerCase() || ''),
          tags: ['Español', 'DropsActivados'],
        }
      })
  }

  async getRecommendedChannels(limit = 10) {
    const response = await fetch(`https://api.twitch.tv/helix/streams?first=${limit}`, {
      headers: this.headers,
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

  async getTopCategoriesWithViewers(limit = 20) {
    const gamesResponse = await fetch(
      `https://api.twitch.tv/helix/games/top?first=${limit}`,
      {
        headers: this.headers,
      },
    )

    if (!gamesResponse.ok) {
      throw new Error('Error al obtener categorías')
    }

    const gamesData = await gamesResponse.json()
    const games = gamesData.data

    const streamsResponse = await fetch('https://api.twitch.tv/helix/streams?first=100', {
      headers: this.headers,
    })

    if (!streamsResponse.ok) {
      throw new Error('Error al obtener streams')
    }

    const streamsData = await streamsResponse.json()
    const streams = streamsData.data

    const viewerCountPerGame: Record<string, number> = {}

    streams.forEach((stream: any) => {
      if (viewerCountPerGame[stream.game_id]) {
        viewerCountPerGame[stream.game_id] += stream.viewer_count
      } else {
        viewerCountPerGame[stream.game_id] = stream.viewer_count
      }
    })

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

  // ✅ Método adicional para obtener detalles del canal
  async getStreamDetails(userLogin: string) {
    try {
      const userRes = await fetch(
        `https://api.twitch.tv/helix/users?login=${userLogin}`,
        { headers: this.headers },
      )
      const userData = await userRes.json()
      const user = userData.data?.[0]
      if (!user) throw new Error('Usuario no encontrado')

      const streamRes = await fetch(
        `https://api.twitch.tv/helix/streams?user_id=${user.id}`,
        { headers: this.headers },
      )
      const streamData = await streamRes.json()
      const stream = streamData.data?.[0] || {}

      const followersRes = await fetch(
        `https://api.twitch.tv/helix/users/follows?to_id=${user.id}`,
        { headers: this.headers },
      )
      const followersData = await followersRes.json()
      const followers = followersData.total ?? 0

      return {
        ...user,
        ...stream,
        followers,
      }
    } catch (error) {
      console.error('Error al obtener detalles del canal:', error)
      return null
    }
  }
}
