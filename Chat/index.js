const express = require('express')
const router = express.Router()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const cors = require("cors")

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.post('/chat',async(req,res) => {
    const { email, pass, content } = req.body;
    try {
      const getUniqueData = await prisma.users.findUnique({
        where: {
            email: email,
            password: pass
        }
      });
      if (!getUniqueData) {
        console.log("User not found.");
        res.status(400).send({ message: 'User not found!' });
    }
    if (getUniqueData) {
      const newMessage = await prisma.chat.create({
        data: {
            user_id : getUniqueData.id,
            content,
            timestamp: new Date(),
        },
        });
        res.status(201).json({ message: 'Chat message created.', post_id: newMessage.post_id });

    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create chat message.' });
  }
})

router.get('/chat', async (req, res) => {
  try {
    const messages = await prisma.chat.findMany({
      orderBy: { timestamp: 'desc' },
    });

    // Pobierz wszystkich użytkowników
    const users = await prisma.users.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
      },
    });

    // Mapuj użytkowników na obiekt dla łatwego dostępu
    const userMap = users.reduce((acc, user) => {
      acc[user.id] = `${user.first_name} ${user.last_name}`;
      return acc;
    }, {});

    // Połącz wiadomości z danymi użytkowników
    const formattedMessages = messages.map((message) => ({
      post_id: message.post_id,
      user_id: message.user_id,
      content: message.content,
      timestamp: message.timestamp,
      name: userMap[message.user_id] || 'Unknown User',
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch chat messages.' });
  }
});


module.exports=router