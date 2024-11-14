const express = require('express')
const router = express.Router()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const cors = require("cors")

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.post('/register',async(req,res) =>{
    const { name, surname, adress, email, city, zip, pass, repass } = req.body;
    console.log('Name:', name);
    console.log('Surname:', surname);
    console.log('Address:', adress);
    console.log('Email:', email);
    console.log('City:', city);
    console.log('Zip:', zip);
    console.log('Password:', pass);
    console.log('Repeat Password:', repass);

    const getEmail = await prisma.users.findUnique({
        where: {
            email : email
        }
    });
    if(getEmail) {
        res.status(409).send({ message: 'false' });
    }
    else {
        try {
            const Data = {
                first_name: name,
                last_name: surname,
                email: email,
                password: pass,
                address: adress,
                zip_code: zip,
                city: city
            };
            //throw new Error("Database connection error");
            const createdUser = await prisma.users.create({ data: Data });
            console.log("User created successfully:", createdUser);
            res.status(201).send({ message: 'true' });
        } catch (error) {
            console.error("Error creating user:", error.message);
            return res.status(500).json({ message: 'false', error: error.message });
        }
    }


    

})



module.exports=router