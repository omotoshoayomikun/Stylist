
export default async function handle(req, res) {
    if(req.method === 'POST') {
        res.json(req.body)
    }
}