const mongoose = require('mongoose');
const express = require('express');
const { MongoClient, GridFSBucket } = require('mongodb');
const url = 'http://localhost:5555';

let gridfsBucket;

const conn = mongoose.connection;

conn.once('open', async() => {
    const db = conn.db;
    gridfsBucket = new GridFSBucket(db, {
        bucketName: 'fs'
    });
});

const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(404).json({ message: 'File not found' });
    }

    const imageUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json({ imageUrl });
};

const getImage = async(req, res) => {
    try {
        if (!gridfsBucket) {
            return res.status(500).json({ message: 'GridFS not initialized' });
        }

        const file = await gridfsBucket.find({ filename: req.params.filename }).toArray();

        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }

        const readStream = gridfsBucket.openDownloadStream(file[0]._id);
        readStream.pipe(res);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { uploadImage, getImage };