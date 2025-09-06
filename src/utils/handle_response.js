const { ERROR_MESSAGE } = require("../config/error")

const Response = (handel) => {
    return async (req, res, next) => {
        try {
            let data = await handel(req, res, next);
            return res.send({
                signal: 1,
                code: 200,
                data
            });
        } catch (err) {
            console.log('=====', err);
            const code = err && err.message ? err.message : ERROR_MESSAGE.ERROR
            const message = ERROR_MESSAGE[code] ? ERROR_MESSAGE[code]: ERROR_MESSAGE.ERR_0000
            if (typeof message !== 'string') {
                message = ERROR_MESSAGE.ERR_0000
            }

            return res.send({
                signal: 0,
                code: 400,
                errorCode: code ? code : ERROR_MESSAGE.ERROR,
                error: message
            });
        }
    };
}

const ResponseAdmin = (handel) => {
    return async (req, res, next) => {
        try {
            let data = await handel(req, res, next);
            return res.send({
                signal: 1,
                message: 'SUCCESS',
                code: 200,
                data: data
            });
        } catch (err) {
            return res.send({
                signal: 0,
                code: 400,
                errorCode: 'ERR',
                message: err.message
            });
        }
    };
}

const ResponseApp = (handel) => {
    return async (req, res, next) => {
        try {
            let data = await handel(req, res, next);
            return res.send(data);
        } catch (err) {
            console.log('===222==', err);
            return res.send({
                signal: 0,
                code: 400,
                errorCode: 'ERR',
                message: err.message
            });
        }
    };
}


module.exports = {
    Response,
    ResponseAdmin,
    ResponseApp
};