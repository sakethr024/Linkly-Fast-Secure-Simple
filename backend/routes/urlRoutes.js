import express from "express"
import shortid from "shortid"
import Url from "../models/Url.js"

const router = express.Router();

router.post("/shorten", async (req,res) => {
    const { longUrl } = req.body
    try {
        let urlCode = shortid.generate()
        let shortUrl=`${process.env.BaseURL}/${urlCode}`
        const url = new Url({
            longUrl,
            shortUrl,
            urlCode
        })
        await url.save()
        res.json(url)
    } catch (err) {
        console.log(err)
        res.status(500).json('server error')
        
    }
})
export default router