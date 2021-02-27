import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-bac-6ecdd-default-rtdb.firebaseio.com/'
});

export default instance;