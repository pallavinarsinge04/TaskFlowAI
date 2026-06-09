const express = require("express");

const router = express.Router();

router.post("/suggest", (req, res) => {

    const { task } = req.body;

    let priority = "Low";

    if(task.toLowerCase().includes("bug"))
        priority = "High";

    else if(task.toLowerCase().includes("api"))
        priority = "Medium";

    res.json({

        success:true,

        suggestion:priority

    });

});

module.exports = router;