import { dbQuery } from '../db/db-connection.mjs';

const getAllAuthors = async () => {
    return await dbQuery(
        `SELECT * FROM authors`
    )
};

export { getAllAuthors }