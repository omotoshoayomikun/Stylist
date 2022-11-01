import axios from "axios";
import cookie from 'cookie'
export default async function handle(req, res) {
    if (req.method === 'POST') {
        const cookies = req.headers.cookie || ''
        const getCookie = cookie.parse(cookies)
        const claims = JSON.parse(getCookie.token)
        const token = claims.data.token
            const response = await axios({
                method: 'post',
                url: 'https://stylistconnect.azurewebsites.net/api/User/reset-password',
                data: req.body,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.data
            if (data.isSuccessful == true) {
                res.status(data.statusCode).json(data)
            } else {
                res.status(data.statusCode).json(data)
            }
    }
}