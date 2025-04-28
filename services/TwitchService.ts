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

  private async fetchAPI(endpoint: string) {
    const res = await fetch(`https://api.twitch.tv/helix/${endpoint}`, { headers: this.headers })
    if (!res.ok) throw new Error(`Error en la petición a ${endpoint}`)
    return res.json()
  }

  async getStreams(limit = 50) {
    const data = (await this.fetchAPI('streams?first=100')).data
    return data.filter((s: any) => s.language === 'es').sort((a: any, b: any) => b.viewer_count - a.viewer_count).slice(0, limit)
  }

  async getRecommendedChannels(limit = 10) {
    const data = (await this.fetchAPI(`streams?first=${limit}`)).data
    return data.map((c: any) => ({
      ...c,
      user_login: c.user_login || c.user_name?.toLowerCase() || '',
      is_verified: this.verifiedUsers.includes((c.user_name || '').toLowerCase()),
    }))
  }

  async getTopCategoriesWithViewers(limit = 20) {
    const games = (await this.fetchAPI(`games/top?first=${limit}`)).data
    const streams = (await this.fetchAPI('streams?first=100')).data

    const viewers: Record<string, number> = {}
    streams.forEach((s: any) => (viewers[s.game_id] = (viewers[s.game_id] || 0) + s.viewer_count))

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
      const user = (await this.fetchAPI(`users?login=${userLogin}`)).data?.[0]
      if (!user) throw new Error('Usuario no encontrado')

      const [stream, channel, followers] = await Promise.all([
        this.fetchAPI(`streams?user_id=${user.id}`).then(r => r.data?.[0] || {}),
        this.fetchAPI(`channels?broadcaster_id=${user.id}`).then(r => r.data?.[0]?.tags || []),
        this.fetchAPI(`channels/followers?broadcaster_id=${user.id}`).then(r => r.total || 0),
      ])

      return { ...user, ...stream, user_login: user.login, is_verified: this.verifiedUsers.includes(user.login.toLowerCase()), tags: channel, followers }
    } catch (error) {
      console.error('Error al obtener detalles del canal:', error)
      return null
    }
  }
}
