/**
 * Films.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'movieSqlServer',
    tableName: 'films',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        id: {
            type: "integer",
            autoIncrement: false,
            primaryKey: true,
            unique: true
        },
        title: {
            type: "string"
        }
    }
};
