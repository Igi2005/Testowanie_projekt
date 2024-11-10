const express = require('express')
const router = express.Router()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const cors = require("cors")

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/results', async (req, res) => {
    try {
        const results = await prisma.results.findMany({
            select: {
                score: true,
                created_at: true,
                users: {
                    select: {
                        first_name: true,
                    }
                }
            },
            orderBy: {
                score: 'desc'
            }
        });
        throw new Error("Database connection error");
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving results' });
    }
    
});

module.exports=router