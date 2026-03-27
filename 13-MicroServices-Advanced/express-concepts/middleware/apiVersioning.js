const urlVersioning = (version) => (req, res, next) => {
    if (req.url.startsWith(`/api/${version}`)) {
        next();
    } else {
        res.status(404).json({ error: 'Version not found' });
    }
};

const headerUrlVersioning = (version) => (req, res, next) => {
    if (req.headers['api-version'] === version) {
        next();
    } else {
        res.status(404).json({ error: 'Version not found' });
    }
};

const contentTypeVersioning = (version) => (req, res, next) => {
    if (req.headers['content-type'] === version) {
        next();
    } else {
        res.status(404).json({ error: 'Version not found' });
    }
};

const queryVersioning = (version) => (req, res, next) => {
    if (req.query.version === version) {
        next();
    } else {
        res.status(404).json({ error: 'Version not found' });
    }
};
module.exports = {
    urlVersioning,
    headerUrlVersioning,
    contentTypeVersioning,
    queryVersioning
};
