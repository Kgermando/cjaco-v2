export interface Activity {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  location?: string;
  partners?: string[];
  gallery?: string[];
  relatedActivities?: string[];
  date?: Date;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}
