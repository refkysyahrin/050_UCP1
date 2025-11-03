const express = require("express");
const app = express();
const port = 3000;
const db = require("./models");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.listen(port, () => {
  console.log("Server is started on port 3000");
});

db.sequelize
  .sync()
  .then((result) => {
    app.listen(port, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/Music", async (req, res) => {
  const data = req.body;
  try {
    const music = await db.Music.create(data);
    res.send(music);
  } catch (error) {
    res.send(error);
  }
});

app.get("/Music", async (req, res) => {
  try {
    const music = await db.Music.findAll();
    res.send(music);
  } catch (error) {
    res.send(err);
  }
});

app.put("/Music/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Music = await db.Music.findByPk(id);
    if (!Music) {
      return res.status(404).send({ message: "Musik tidak tersedia" });
    }
    await Music.update(data);
    res.send({ message: "Musik berhasil diupdate", Music });
  } catch (error) {
    res.status(500).send(err);
  }
});

app.delete("/Music/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const Music = await db.Music.findByPk(id);
    if (!Music) {
      return res.status(404).send({ message: "Musik tidak tersedia" });
    }
    await Music.destroy();
    res.send({ message: "Musik berhasil dihapus" });
  } catch (error) {
    res.status(500).send(err);
  }
});
