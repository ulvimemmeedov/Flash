namespace Guard {
    export function check(req, res, next) {
        const onlyLettersPattern = new RegExp(/(script)|(&lt;)|(&gt;)|(%3c)|(%3e)|(SELECT)|(UPDATE)|(INSERT)|(DELETE)|(GRANT)|(REVOKE)|(UNION)|(&amp;lt;)|(&amp;gt;)/g);
        if (onlyLettersPattern.test(req.query.toString())) {
            return res.status(400).json({ error: "No special characters and no numbers, please!" })
        }
        next();
    }
}

export default Guard;