import axios from "axios";
import cookie from 'cookie'

export default async function handle(req, res) {
    const cookies = req.headers.cookie || ''
    const getCookie = cookie.parse(cookies)
    const claims = JSON.parse(getCookie.token)
    const token = claims.data.token

    const body = req.body

    if (req.method === 'POST') {
        const response = await axios({
            method: 'post',
            url: 'https://stylistconnect.azurewebsites.net//api/Booking/Send-Booking',
            data: body,
            headers: {
                'Content-Type': 'application/json',
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