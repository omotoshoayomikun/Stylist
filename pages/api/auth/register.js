import axios from "axios"

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const {personalDetails} = req.body
        try {
            const response = await axios.post('https://stylistconnect.azurewebsites.net/api/User/RegisterUser',personalDetails)
            res.json(response.data)
        } catch(err) {
            res.json(err)
        }
    } else {
        res.status(400).json({'message': 'It should be a POST method'})

    }
}