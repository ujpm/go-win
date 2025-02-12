export interface Course {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link';
  url: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}
