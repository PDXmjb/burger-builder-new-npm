import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-d3411.firebaseio.com/'
});

export default instance;