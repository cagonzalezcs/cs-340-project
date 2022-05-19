import { dbQuery } from '../db/db-connection.mjs';

const getAllGenres = async () => {
    return await dbQuery(
        `SELECT * FROM genres`
    )
};

export { getAllGenres }