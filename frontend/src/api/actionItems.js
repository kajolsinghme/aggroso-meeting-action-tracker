import { api } from "./axios"

export const extractActionItems = async(transcript) => {
    const result = await api.post("/action-items/extract", {transcript})
    return result
}

export const fetchAllTasks = async() => {
    const data = await api.get("/action-items")
    return data
}

export const createActionItem = async(payload) => {
    const data = await api.post("/action-items", payload)
    return data
}

export const updateActionItem = async(id, payload) => {
    const data = await api.patch(`/action-items/${id}`, payload)
    return data
}
export const deleteActionItem = async(id) => {
    const data = await api.delete(`/action-items/${id}`)
    return data
}