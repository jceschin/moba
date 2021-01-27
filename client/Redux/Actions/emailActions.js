import axios from 'axios';


export const enviarEmail = (email) => async() => {
    try {
        const result = await axios.post('http://localhost:8005/send-email', email);
     
    } catch (error) {
        console.log(error)
    };
}