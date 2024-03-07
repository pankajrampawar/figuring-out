import axios from 'axios'
import Cookies from 'js-cookie';
import { unstable_noStore as noStore } from 'next/cache';
import { resolve } from 'styled-jsx/css';
import stringToTags from './lib/stringToTags';


export const signup = async (user) => {
    try {
        const response = await axios.post('http://localhost:3000/user/signup', 
            { user },
            {
                withCredentials: true,
            }
        )

        if (response.headers['set-cookie']) {

            const cookiesFromResponse = response.headers['set-cookie'];

            cookiesFromResponse.forEach(cookie => {
                const [cookieName, cookieValue] = cookie.split(';')[0].split('=');
                Cookies.set(cookieName, cookieValue, { path: '/', sameSite: 'None', secure: true });
            });
         }
        
        console.log(response);

        if (response) return { status: true, user: response.user }

    } catch (error) {
        console.log("error in signup, please try again later!", error);

        return { status: false };
    }
}

export const login = async (username, password) => {
    try {
        const user = {
            username: username,
            password: password,
        }

        const response = await axios.post("http://localhost:3000/user/login", 
            { user },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
       
        // Check if the response contains cookies
        if (response.headers['set-cookie']) {
           // Extract the cookies from the response headers
           const cookiesFromResponse = response.headers['set-cookie'];
           // Set the cookies on the client side
           cookiesFromResponse.forEach(cookie => {
               const [cookieName, cookieValue] = cookie.split(';')[0].split('=');
               Cookies.set(cookieName, cookieValue, { path: '/' , sameSite: 'None', secure: true });
           });
        }

        console.log(response);
        
        return { status: true, user: response.user };
    } catch (error) {
        console.log("error logging in", error);
        alert(error)
        return {status : false };
    }
}

export const getDrops = async () => {
    try {

        const response = await axios.get('http://localhost:3000/drop/getDrops', {
            withCredentials: true,
        });
        
        return response.data.drops
    } catch (error) {
        console.log("Error sending/ receiving the response", error);
    }
};  

export const getDrop = async (id) => {
    try {
        const response = await axios.get('http://localhost:3000/drop/getDrop', 
            { 
                params: { dropId: id },
                withCredentials: true,
            }, 
        )
        
        console.log(response)
        return response.data.drop;
    } catch (error) {
        console.log("Error sending/ receiving the reply", error);
    }
}

export const getReplyForDrop = async (id) => {
    try {
        const response = await axios.get('http://localhost:3000/response/getResponses', 
        { 
            params: { dropId: id },
            withCredentials: true,
        }    
        )
        
        return response.data.responses
    } catch (error) {
        console.log("Error sending/ receiving the reply", error);
    }
}

export const postAnonymousDrop = async ({ content, year, branch, tags }) => {
    try {
        const body = {
            content,
            year,
            branch
        }

        if (tags) {
            const hashTags = stringToTags(tags);
            body.tags = hashTags
        }

        console.log(body)

        const response = await axios.post('http://localhost:3000/drop/addAnonymousDrop', 
            body,
            {
                withCredentials: true
            }
        )

        console.log(response);
        return true
    } catch (error) {
        console.log("error sending / receiveing response", error)
        return false
    }
}

export const postDirectDrop = async ({ content, userName, branch, year, tags }) => {
    try {
        const body = {
            content, 
            userName,
            branch,
            year
        }

        if (tags) {
            const hashtags = stringToTags(tags);
            body.tags = hashtags;
        }

        const response = await axios.post('http://localhost:3000/drop/addDirectDrop', 
            body, 
            {
                withCredentials: true
            }
        )

        console.log(response);

        return true;
    } catch (error) { 
        console.log('error sending post directly', error);
        return false
    }
}

export const addResponse = async (dropId, response) => {
    try {
        const result = await axios.post('http://localhost:3000/response/addResponse', 
            { craftId, response },
            {
                withCredentials: true
            }
        )

        console.log(result);
        
        return true;
    } catch (error) {
        console.log("error sending response", error)
        return false
    }
}


export const checkAndGetUser = async () => {
    try {
        const result = await axios.get('http://localhost:3000/user/checkStatus',
            {
                withCredentials: true
            }
        );
        
        if (!result) {
            return;
        }

        const userData = result.data.user || (result.response?.data.user && result.response.data.user);

        if (!userData) {
            return;
        }

        return userData;
    } catch (error) {
        console.log(error);
        
        return;
    }
}




