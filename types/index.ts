export interface CategoryType {
  id: string
  name: string
  createdAt: string
  publishedAt: string
  revisedAt: string
  updatedAt: string
}

export interface TagType {
  id: string
  name: string
  createdAt: string
  publishedAt: string
  revisedAt: string
  updatedAt: string
}

export interface CommentData {
  id: number
  blogId: string
  name: string
  comment: string
  createdAt: string
}
  
// export interface Blog {
//   id: string
//   title: string
//   body: string
//   publishedAt: string
//   updatedAt: string
//   createdAt: string
//   revisedAt: string
//   imgae: {
//     url: string
//   }
//   category: Category
// }

// export interface Category {
//   id: string
//   name: string
//   publishedAt: string
//   updatedAt: string
//   createdAt: string
//   revisedAt: string
// }