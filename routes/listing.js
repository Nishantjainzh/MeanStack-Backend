const router = require('express').Router()
const Listing = require('../models/Listing')
const verifiedRoute = require('./verifyToken')
//Add new routing
router.post('/',verifiedRoute, async (req, res) => {
    const listing = new Listing({
        title: req.body.title,
        price: req.body.price,
        locality: req.body.locality,
        details: req.body.details
    })
    try {
        const savedListing = await listing.save()
        res.send('Listing added' + savedListing)
    } catch (error) {
        res.status(400).send(error)
    }
})
//Get all listing
router.get('/', async (req, res) => {
    try {
        const listing = await Listing.find()
        res.json(listing)
    } catch (error) {
        res.json({ message: error });
    }
})
// Single Listing 
router.get('/:listingId', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.listingId)
        res.json(listing)
    } catch (error) {
        res.json({ message: 'Something Went Wrong!!' + error })
    }
})
// Update Listing 
router.put('/:listingId',verifiedRoute, async (req, res) => {
    try {
        const listingdata = {
            title: req.body.title,
            price: req.body.price,
            locality: req.body.locality,
            details: req.body.details
        }
        const updatelisting = await Listing.findByIdAndUpdate({_id:req.params.listingId},listingdata)
        res.json(updatelisting)

    } catch (error) {
        console.log({message:error});
    }
})
// Delete Listing 
router.delete('/:listingId',verifiedRoute,async (req, res) => {
    try {
        let listing =  await Listing.findByIdAndDelete(req.params.listingId)
        if(listing){
            res.json('It has been deleted'+listing)
        }
        else{
            res.send('it is not present');
        }
        
    } catch (error) {
        console.log({message:error});
    }
})
module.exports = router