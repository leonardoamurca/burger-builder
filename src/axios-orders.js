import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-burguer-builder.firebaseio.com/'
});

export default instance;
