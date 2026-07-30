const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res, next) => {

    const token =
        req.headers.authorization?.replace(
            "Bearer ",
            ""
        );

    if (!token) {

        return res.status(401).json({
            message: "Unauthorized",
        });

    }

    const {
        data,
        error,
    } = await supabase.auth.getUser(token);

    if (error) {

        return res.status(401).json(error);

    }

    req.user = data.user;

    next();

};