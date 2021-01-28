import axios from 'axios';


export const enviarEmail = (state) => async() => {
    try {
       axios.post('http://localhost:8005/send-email', state);
     
    } catch (err) {
        console.log(err)
    };
}