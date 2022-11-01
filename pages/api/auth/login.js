import axios from "axios"
import cookie from 'cookie'
export default async function handle(req, res) {

    if (req.method === 'POST') {
        const details = req.body;

        await fetch('https://stylistconnect.azurewebsites.net/api/User/Login', {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((data) => {
                if(data.isSuccessful == true) {
                    res.setHeader("Set-Cookie", cookie.serialize('token', JSON.stringify(data), {
                        maxAge: 60 * 60,
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        path: '/'
                    }))
                    
                    res.status(data.statusCode).json(data)
                } else {
                    res.status(data.statusCode).json(data)
                }
            })
            
        }
    }