import axios from 'axios'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY

export async function fetchPhotos(query, page=1, perPage=20) {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
            query,
            page,
            perPage
        },

        headers: {
            Authorization: `Client-ID ${UNSPLASH_KEY}`
        }
    })

    return res.data
}

export async function fetchVideos(query, perPage=15) {
    const res = await axios.get("https://api.pexels.com/videos/search", {
        params: {
            query,
            perPage
        },

        headers: {
            Authorization: PEXELS_KEY
        }
    })

    return res.data
}