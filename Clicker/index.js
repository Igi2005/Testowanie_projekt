const express = require('express')
const router = express.Router()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const cors = require("cors")


router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.post('/save',async(req,res) => {
    const {email,pass,name,score} = req.body;
    console.log("count to " + score)
    try {

        const user = await prisma.users.findFirst({
            where: {
                first_name: name,
                password: pass,
                email: email
            }
        });
        
        if (!user) {
            console.log("User not found.");
            res.status(400).send({ message: 'User not found!' });
        }

        if (user) {

            const existingResult = await prisma.results.findFirst({
                where: {
                    player_id: user.id
                }
            });
    
            if (existingResult) {

                const updatedResult = await prisma.results.update({
                    where: {
                        result_id: existingResult.result_id
                    },
                    data: {
                        score: score,
                        created_at: new Date() 
                    }
                });
                console.log("Wynik został zaktualizowany:", updatedResult);
                res.status(200).send({ message: 'Update!' });
            } else {

                const newResult = await prisma.results.create({
                    data: {
                        player_id: user.id,
                        score: Number(score),
                        created_at: new Date()
                    }
                });
                console.log("Nowy wynik został dodany:", newResult);
                res.status(200).send({ message: 'Added' });
            }
        } else {
            console.log("User exists!");
        }
    } catch (error) {
        console.error("Error", error);
    }

})


module.exports=router