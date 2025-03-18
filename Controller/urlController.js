
const URLs = require('../Models/urlModel');
const crypto = require('crypto');

function generateUniqueString() {
    // Generate 3 random bytes (24 bits of entropy)
    const randomBytes = crypto.randomBytes(3);
    // Convert to a hexadecimal string and then to an integer
    const num = parseInt(randomBytes.toString('hex'), 16);
    // Convert to base36 and pad/truncate to 6 characters
    let base36 = num.toString(36).toUpperCase();
    // Ensure it’s 6 characters (pad with zeros if needed, or slice if too long)
    return base36.padStart(6, '0').substring(0, 6);
  }

//Creates Short Url and stores it in DB
exports.createShortUrl = async(req, res) => {
    try {
        const {url} = req.body;
        if(!url) return res.status(400).json({error: 'URL required.'});

        const shortCode = generateUniqueString();
        const newURL = await URLs.create({url, shortCode});
        
        const { accessCount, ...responseData } = newURL.toJSON();
        res.status(201).json(responseData);
    }
    catch(error) {
        console.error("Error in createShortURL:", error); 
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};