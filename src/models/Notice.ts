interface Notice {
  id: string,
  title: string,
  content: string,
  image_url?: string,
  author: string,
  author_name: string,
  author_profile_photo: string,
  updated_at: string,
  created_at: string
}
export default Notice;