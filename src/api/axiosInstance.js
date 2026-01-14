import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://vocab-builder-backend.p.goit.global/api',    
    timeout: 5000,
});

export default axiosInstance;