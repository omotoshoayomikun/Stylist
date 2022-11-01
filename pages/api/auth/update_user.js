import axios from "axios";
import cookie from 'cookie'

export default async function handle(req, res) {
    const cookies = req.headers.cookie || ''
    const getCookie = cookie.parse(cookies)
    const claims = JSON.parse(getCookie.token)
    const token = claims.data.token
    const email = claims.data.email

    if (req.method === 'PUT') {
        const response = await axios({
            method: 'put',
            url: `https://stylistconnect.azurewebsites.net/api/User/UpdateUser?email=${email}`,
            data: req.body,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.data
        if(data.isSuccessful === true) {
            res.status(data.statusCode).json(data.message)
        } else {
            res.status(data.statusCode).json(data.message)
        }
    }
}