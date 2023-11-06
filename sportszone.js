const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/sportszone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true }
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
})

// const usuario = new Usuario({
//     email: email,
//     senha: senha
//   });


  const produtoesporteSchema = new mongoose.Schema({ 
    id_produtoesporte: { type: String, required: true },
    Descrição: { type: String},
    Marca: { type: String},
    Data_fabricação: { type: Date},
    Quantidade_estoque: { type: Number}
  });
  
  const Produtoesporte = mongoose.model("produtoesporte", produtoesporteSchema);
  
  app.post("/cadastroprodutoesporte", async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
  });
  
  const produtoesporte = new Produtoesporte({
      email: email,
      senha: senha
    });
  
  try {
    const newUsuario = usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}

  app.get("/cadastrousuario", async (req, res) => {
    res.sendFile(__dirname + "/cadastrousuario.html");
  });
  
  
  app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.get("/produtoesporte", async (req, res) => {
    res.sendFile(__dirname + "/cadastrousuario.html");
  });
  
  
  app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
  

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
