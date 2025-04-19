export class VideoService {
  private clientId = 'kd4lovlti8kahhazcqw5azpmi0j2te'
  private accessToken = 'wt592jrab2wibo7e8e1aulhir0eub5'

  private get headers() {
    return {
      'Client-ID': this.clientId,
      Authorization: `Bearer ${this.accessToken}`,
    }
  }

  async getStreamDetails(userLogin: string) {
    try {
      const userRes = await fetch(
        `https://api.twitch.tv/helix/users?login=${userLogin}`,
        {
          headers: this.headers,
        },
      )
      const userData = await userRes.json()
      const user = userData.data?.[0]
      if (!user) throw new Error('Usuario no encontrado')

      const streamRes = await fetch(
        `https://api.twitch.tv/helix/streams?user_id=${user.id}`,
        {
          headers: this.headers,
        },
      )
      const streamData = await streamRes.json()
      const stream = streamData.data?.[0] || {}

      let tags: string[] = []
      if (stream.id) {
        const tagsRes = await fetch(
          `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${user.id}`,
          { headers: this.headers },
        )
        const tagsData = await tagsRes.json()
        tags =
          tagsData.data?.map((tag: any) => tag.localization_names?.es || tag.tag_id) || []
      }

      const followersRes = await fetch(
        `https://api.twitch.tv/helix/users/follows?to_id=${user.id}`,
        { headers: this.headers },
      )
      const followersData = await followersRes.json()
      const followers = followersData.total || 0

      return {
        ...stream,
        ...user,
        tags,
        followers,
      }
    } catch (error) {
      console.error(' Error al obtener los detalles del stream:', error)
      return null
    }
  }

  async getVideoUrl(userName: string) {
    return `https://player.twitch.tv/?channel=${userName}&autoplay=true&parent=localhost`
  }
}
