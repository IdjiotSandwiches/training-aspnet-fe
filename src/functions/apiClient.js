import axios from 'axios'

const stnkApi = axios.create({
    baseURL: import.meta.env.VITE_STNK_SERVICE,
    headers: {
        'Content-Type': 'application/json',
    }
});

export { stnkApi };