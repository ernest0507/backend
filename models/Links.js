module.exports = (sequelize, DataType) => {
    const Links = sequelize.define("Links", {
        title: {
            type: DataType.STRING, 
            allowNull: false, 
        },

        link: {
            type: DataType.STRING, 
            allowNull: false, 
        },
    })
    return Links
}

