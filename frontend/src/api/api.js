const base_url = import.meta.env.VITE_API_BASE_URL

const getLevels = async () => {
    try {
        const response = await fetch(`${base_url}/levels`)
        if(!response.ok){
            console.error("Error fetching levels")
            return null
        }
        const data = await response.json()
        return data || []
    } catch (error) {
        console.error("Error fetching levels", error.message)
        return null
    }
}

const getLevel = async (id) => {
    try {
        const response = await fetch(`${base_url}/levels:/${id}`)
        if(!response.ok){
            console.error("Error fetching level data, http: ", response.status)
            return null
        }
        const data = await response.json()
        return data || []
    } catch (error) {
        console.error(`Error fetching level`, error.message)
        return null
    }
}

const getLeaderBoard = async (id) => {
    try {
        const response = await fetch(`${base_url}/levels/leaderboard/${id}`)
        if(!response.ok){
            console.error("Error fetching leaderboard details, http: ", response.status)
            return null
        }
        const data = await response.json()
        return data || [0]
    } catch (error) {
        console.error("Error fetching leaderboard, ", error.message)
        return null
    }
} 

const addToLeaderBoard = async (id, name, time) => {
    try {
        const response = await fetch(`${base_url}/levels/leaderboard/${id}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ name: name, time: time})
        })
        
        if(!response.ok){
            console.error("Error posting to leaderboard, http: ", response.status)
            return null
        }
        const data = await response.json()
        return data || []

    } catch (error) {
        console.error("Error posting to leaderboard, ", error.message)
        return null
    }
}

export { addToLeaderBoard, getLeaderBoard, getLevels, getLevel }