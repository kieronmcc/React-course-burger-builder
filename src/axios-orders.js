import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburgerbuilder-fdd3d.firebaseio.com/'
});

export default instance;