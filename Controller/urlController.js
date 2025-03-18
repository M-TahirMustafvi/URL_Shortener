
const URLs = require('../Models/urlModel');
const shortUrl = require('./shortURL');


//Creates Short Url and stores it in DB
exports.createShortUrl = async(req, res) => {
    try {
        const {url} = req.body;
        if(!url) return res.status(400).json({error: 'URL required.'});

        const shortCode = shortUrl;
        const newURL = await URLs.create({url, shortCode});
        
        const { accessCount, ...responseData } = newURL.toJSON();
        res.status(201).json(responseData);
    }
    catch(error) {
        console.error("Error in createShortURL:", error); 
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Gets url object from db based on shortUrl in request params
exports.getLongUrl = async(req, res) => {
    try {
        const {shortCode} = req.params;
        const URL = await URLs.findOne({ 
            where: {shortCode},
            attributes: {exclude: ['accessCount']}  //excludes access account.
        });

        if(!URL) return res.status(404).json({error: 'No such URL'});

        await URLs.increment('accessCount', { where: { shortCode } });

        res.status(200).json(URL);
    }
    catch(error) {
        console.error("Error in getLargeUrl:", error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Update Long URL
exports.updateLongUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const { url } = req.body;
        
        const oldUrl = await URLs.findOne({ where: { shortCode } });
        if (!oldUrl) return res.status(404).json({ error: 'URL not found' });

        oldUrl.url = url;
        await oldUrl.save();
        
        const { accessCount, ...responseData} = oldUrl.toJSON();
        res.status(200).json(responseData);  

    } catch (error) {
        console.error("Error while updating URL:", error);  
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Deletes URL obj based on short URL in req params
exports.deleteUrl = async (req, res) => {
    try {
        const {shortCode} = req.params;

        const deleted = await URLs.destroy({ where: {shortCode}});
        if(!deleted) return res.status(201).json( { error: 'No Such URL' });

        res.status(204).send();
    }
    catch(error) {
        console.error("Error while updating URL", error);
        res.status(500).json({error: 'Server error', details: error.message});
    }
};

//Retrievs URL obj with its stats
exports.getUrlStats = async (req, res) => {
    try {
        const {shortCode} = req.params;
        const URL = await URLs.findOne({ where: {shortCode}});

        if(!URL) return res.status(404).json({error: 'No such URL'});

        res.status(200).json(URL);
    }
    catch(error) {
        console.error("Error while updating URL", error);
        res.status(500).json({error: 'Server error', details: error.message});
    }
}