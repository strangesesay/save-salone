export type MediaType = 'image' | 'video';

export type MediaCategory =
  | 'Education'
  | 'Environment'
  | 'Agriculture'
  | 'Health'
  | 'Human Rights'
  | 'Community'
  | 'Events';


export interface MediaItem {

  id: number;

  title: string;

  description: string;

  type: MediaType;

  category: MediaCategory;

  thumbnail: string;

  url: string;

  date: string;

  location?: string;

  featured?: boolean;

}