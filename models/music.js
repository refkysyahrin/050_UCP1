module.exports = (sequelize, DataTypes) => {
  const Komik = sequelize.define("Music", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    tahun_terbit: {
      type: DataTypes.STRING,
    },
    genre: {
      type: DataTypes.STRING,
    },
  });
  return Komik;
};
