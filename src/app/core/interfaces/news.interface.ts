export interface NewsArticle {

  id: number;

  title: string;

  category:
    | 'Education'
    | 'Environment'
    | 'Agriculture'
    | 'Health'
    | 'Human Rights'
    | 'Organization';

  excerpt: string;

  content: string;

  image: string;

  author: string;

  publishedDate: string;

  featured: boolean;

}


export interface NewsEvent {

  id: number;

  title: string;

  description: string;

  category:
    | 'Training'
    | 'Workshop'
    | 'Community'
    | 'Campaign'
    | 'Conference';

  location: string;

  date: string;

  time: string;

  image: string;

  registrationRequired: boolean;

}