const prisma = require("../config/prismaConfig")

const getLevels = async (req, res) => {
    try{
        const levels = await prisma.level.findMany()
        res.status(200).json({ levels })
    }catch(err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
}

const getLevel = async (req, res) => {
    try {
        const { id } = req.params;
        const level = await prisma.level.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json({ level })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error})
    }
}

const getLeaderboard = async (req, res) => {
    try {
        const { id } = req.params
        const leaderBoard = await prisma.leaderboard.findMany({
            where: {
                levelId: id
            }
        }
    )
    res.status(200).json({ leaderBoard })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error })
    }
}

const addToLeaderBoard = async (req, res) => {
    try {
        const { id } = req.params
        const { name, time } = req.body
        const record = await prisma.leaderboard.create({
            data: {
                levelId: id,
                name: name,
                time: time,
            }
        })
        res.status(200).json( {record} )
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error })
    }
}

module.exports = {
    addToLeaderBoard,
    getLeaderboard,
    getLevel,
    getLevels
}