const Creature = require('../models/Creature');
exports.getCreatures = async (req, res) => {
const userId = req.session.userId;
if (!userId) return res.status(401).json({ error: 'Not logged in' });
const creatures = await Creature.find({ owner: userId });
res.json(creatures);
};

exports.addCreature = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Not logged in' });
    const { name, power, imageUrl } = req.body;
    const newCreature = new Creature({ name, power, imageUrl, owner: userId });
    await newCreature.save();
    res.status(201).json(newCreature);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create creature' });
  }
};

exports.deleteCreature = async (req, res) => {
const userId = req.session.userId;
if (!userId) return res.status(401).json({ error: 'Not logged in' });
const { id } = req.params;
const creature = await Creature.findOneAndDelete({ _id: id, owner:
userId });
if (!creature) return res.status(404).json({ error: 'Creature not found' });
res.json({ message: 'Creature deleted' });
};