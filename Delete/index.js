const express = require('express')
const router = express.Router()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const cors = require("cors")


router.use(express.json())
router.use(express.urlencoded({extended: true}))


router.delete('/delete', async(req,res) => {
    try {
        const { email, pass } = req.body.check_data;
        const user = await prisma.users.findUnique({
            where: { email },
          });
      
          if (!user) {
            return res.status(404).json({ message: 'User not found.' });
          }
          if (user.password !== pass) {
            return res.status(401).json({ message: 'Invalid password.' });
          }
          await prisma.results.deleteMany({
            where: { player_id: user.id },
          });
          await prisma.users.delete({
            where: { email },
          });

          res.status(200).json({ message: 'User deleted successfully.' });
          
    } catch(e) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
})


module.exports=router