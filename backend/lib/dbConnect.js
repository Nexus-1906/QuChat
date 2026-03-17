import mongoose from "mongoose";
import redis from 'redis';

export const mongoConnect = () => {
    try {
        mongoose.connect(process.env.MONGODB_CONN);
    }
    catch (err) {
        console.error("Unexpected error occurred: Database could not be connected.");
        console.error(err.message);
    }
};

export const redisConnect = async () => {
    try {
        const client = redis.createClient({
            username: 'thestarslayer',
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: 'redis-10401.crce283.ap-south-1-2.ec2.cloud.redislabs.com',
                port: 10401
            }
        });
        client.on('error', (err) => {
            console.error("Unexpected error occurred: Cache could not be connected.");
            console.error(err.message);
        });
        await client.connect();
        return client;
    }
    catch (err) {
        console.error("Unexpected error occurred: Cache could not be connected.");
        console.error(err.message);
    }
};