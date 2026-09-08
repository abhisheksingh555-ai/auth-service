
import argon2 from "argon2";

export const hashValue = (value) => {
    return argon2.hash(value, {
        type: argon2.argon2id,
    });
};


export const compareHash = (hash, value) => {
    return argon2.verify(hash, value);
};

