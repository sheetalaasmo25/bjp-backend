const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Card = require('./userModel');

exports.createCard = async (req, res) => {
  try {
    const { otp, phoneNumber } = req.body;

    const newCard = new Card({
    
      otp,
      phoneNumber,
    
    });

    await newCard.save(); // Make sure createdAt is set automatically by Mongoose

    const token = jwt.sign(
      { cardId: newCard._id, name: newCard.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Card created successfully', card: newCard, token });
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ message: 'Error creating card', error: error.message || error });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const {  otp, phoneNumber } = req.body;
    const cardId = req.user.cardId;

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      {
      
        otp,
        phoneNumber,
     
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Fetch all cards and place the updated card at the top
    const allCards = await Card.find().sort({ createdAt: -1 });
    const filteredCards = allCards.filter(card => card._id.toString() !== updatedCard._id.toString());
    const result = [updatedCard, ...filteredCards];

    res.status(200).json({ message: 'Card updated successfully', cards: result });
  } catch (error) {
    res.status(500).json({ message: 'Error updating card', error });
  }
};




exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cards', error });
  }
};


exports.getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// const handleUpdate = async (updatedCardData) => {
//   try {
//     const response = await axios.put(`http://localhost:4000/api/cards/${updatedCardData.id}`, updatedCardData);
//     const updatedCards = response.data.cards; // Use the updated cards list
//     setUsers(updatedCards); // Set the state with the updated cards list
//   } catch (error) {
//     console.error("There was an error updating the card!", error);
//     setError("There was an error updating the card.");
//   }
// };
