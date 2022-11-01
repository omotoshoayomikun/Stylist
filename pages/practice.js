
import React, { useEffect, useState } from 'react'

function practice({ datas }) {

    const [details, setDetails] = useState({ body: '', title: '' })

    
    const handlePost = () => {
        console.log(details)
        // const res = await fetch('https://jsonplaceholder.typicode.com/posts',  {
        //     method: 'POST',
        //     body: JSON.stringfy({details}),
        //     headers: {
        //         'Content-Type': 'applicayion/json'
        //     }
        // })
        // const data = res.json()
        // console.log(data)
    }

    return (
        <>
            {datas.map(data => (
                <h3 key={data.id}>{data.title}</h3>
            ))}
            <input type='text' value={details.title} autoComplete='on' onChange={e => setDetails({ ...details, title: e.target.value })} />
            <input type='text' value={details.body} autoComplete='on' onChange={e => setDetails({ ...details, body: e.target.value })} />
            <button onClick={handlePost}>POST</button>
        </>
    )
}

export default practice

export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/')
    const data = await res.json()

    return {
        props: {
            datas: data
        }
    }

}