import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://react-my-burger-7c36f.firebaseio.com/',
})

export default instance
