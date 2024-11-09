const express = require('express')
const router = express.Router()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const cors = require("cors")

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.post('/login',async(req,res) => {
    const {email, pass} = req.body;
    console.log('Email:', email);
    console.log('Password:', pass);

    try {
        const getUniqueData = await prisma.users.findUnique({
            where: {
                email: email,
                password: pass
            }
        });
    
        if (getUniqueData) {
            console.log("User found:", getUniqueData);
            const name = getUniqueData.first_name
            res.status(200).send({ message: 'true', name : name });
        } else {
            console.log("User not found.");
            res.status(200).send({ message: 'false' });
        }
    } catch (error) {
        console.error("Error fetching user:", error.message);
        // Możesz dodać odpowiednią reakcję, np. zwrócenie błędu do klienta
        // return res.status(500).json({ message: "Error fetching user", error: error.message });
        return res.status(500).json({ message: 'false', error: error.message });
    }
    


})



module.exports=router