import {api} from '../api/axios.js'

export const fetchRecentTranscripts = async() => {
    const result = await api.get("/transcripts/recent")
    return result
}