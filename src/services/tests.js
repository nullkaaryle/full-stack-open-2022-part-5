// some material for tests

const blog = {
  id: '62e5309ba56f29d013ebe184',
  author: 'Edsger W. Dijkstra',
  title: 'Canonical string reduction',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 5,
  user: {
    username: 'linus',
    name: 'Linda Usbport'
  },
}

const loggedInUser = {
  username: 'random'
}

const loggedInUserAndBlogOwner = {
  username: 'linus'
}


const testService = {
  blog,
  loggedInUser,
  loggedInUserAndBlogOwner
}

export default testService
