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

  async getStreams(limit = 50) {
    const res = await fetch('https://api.twitch.tv/helix/streams?first=100', {
      headers: this.headers,
    })
    if (!res.ok) throw new Error('Error al obtener streams en vivo')
    const data = await res.json()
    return data.data
      .filter((s: any) => s.language === 'es')
      .sort((a: any, b: any) => b.viewer_count - a.viewer_count)
      .slice(0, limit)
  }

  async getRecommendedChannels(limit = 10) {
    const res = await fetch(`https://api.twitch.tv/helix/streams?first=${limit}`, {
      headers: this.headers,
    })
    if (!res.ok) throw new Error('Error al obtener canales recomendados')
    const data = await res.json()
    return data.data.map((c: any) => ({
      ...c,
      user_login: c.user_login || c.user_name?.toLowerCase() || '',
      is_verified: this.verifiedUsers.includes((c.user_name || '').toLowerCase()),
    }))
  }

  async getTopCategoriesWithViewers(limit = 20) {
    const gamesRes = await fetch(`https://api.twitch.tv/helix/games/top?first=${limit}`, {
      headers: this.headers,
    })
    if (!gamesRes.ok) throw new Error('Error al obtener categorías')
    const games = (await gamesRes.json()).data

    const streamsRes = await fetch('https://api.twitch.tv/helix/streams?first=100', {
      headers: this.headers,
    })
    if (!streamsRes.ok) throw new Error('Error al obtener streams')
    const streams = (await streamsRes.json()).data

    const viewers: Record<string, number> = {}
    streams.forEach(
      (s: any) => (viewers[s.game_id] = (viewers[s.game_id] || 0) + s.viewer_count),
    )

    return games.map((g: any) => {
      const name = g.name.toLowerCase()
      let tag = 'Gaming'
      if (name.includes('chat')) tag = 'IRL'
      else if (name.includes('simulator')) tag = 'Simulation'
      else if (name.includes('software') || name.includes('dev')) tag = 'Software'
      else if (name.includes('music')) tag = 'Music'

      return {
        id: g.id,
        name: g.name,
        viewer_count: viewers[g.id] || 0,
        box_art_url: g.box_art_url.replace('{width}', '200').replace('{height}', '270'),
        tag,
      }
    })
  }

  async getStreamDetails(userLogin: string) {
    try {
      const userRes = await fetch(
        `https://api.twitch.tv/helix/users?login=${userLogin}`,
        { headers: this.headers },
      )
      const user = (await userRes.json()).data?.[0]
      if (!user) throw new Error('Usuario no encontrado')

      const [streamRes, channelRes, followersRes] = await Promise.all([
        fetch(`https://api.twitch.tv/helix/streams?user_id=${user.id}`, {
          headers: this.headers,
        }),
        fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${user.id}`, {
          headers: this.headers,
        }),
        fetch(
          `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${user.id}`,
          { headers: this.headers },
        ),
      ])

      const stream = (await streamRes.json()).data?.[0] || {}
      const tags = (await channelRes.json()).data?.[0]?.tags || []
      const followers = (await followersRes.json()).total || 0

      return {
        ...user,
        ...stream,
        user_login: user.login,
        is_verified: this.verifiedUsers.includes(user.login.toLowerCase()),
        tags,
        followers,
      }
    } catch (error) {
      console.error('Error al obtener detalles del canal:', error)
      return null
    }
  }
}
