export interface Stream {
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    title: string;
    viewer_count: number;
    language: string;
    thumbnail_url: string;
    started_at: string;
  }
  
  export interface Game {
    id: string;
    name: string;
    box_art_url: string;
  }
  
  export interface User {
    id: string;
    login: string;
    display_name: string;
    profile_image_url: string;
    description: string;
  }
  