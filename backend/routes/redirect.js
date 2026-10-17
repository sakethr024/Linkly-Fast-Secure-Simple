import express from "express"
import Url from "../models/Url.js"
const router = express.Router();

router.get("/:code", async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code })
        if (url) {
            url.clicks++
            await url.save()
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).json("No url found")
        }
        
    } catch (err) {
        console.log(error)
        res.status(500).json("server Error")
    }
})
export default router