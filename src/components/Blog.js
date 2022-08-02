
export const Blog = ({ blog }) => {
  return (
    <div>
      <li>
        {blog.author}: <b>{blog.title}</b>
      </li>
    </div>
  )
}
