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
 
  if(email == null || senha == null){
    return res.status(400).json({error : "Preenchar todos os campos!!!"});
  }

  const emailExiste = await Usuario.findOne({email : email});

  if(emailExiste){
    return res.status(400).json({error : "O email informado já existe"});
  }

   
  const usuario = new Usuario({
    email: email,
    senha: senha
  });


  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}


});

  const produtoesporteSchema = new mongoose.Schema({ 
    id_produtoesporte: { type: String, required: true },
    Descricao: { type: String},
    Marca: { type: String},
    Data_fabricacao: { type: Date},
    Quantidade_estoque: { type: Number}
  });
  
  const Produtoesporte = mongoose.model("produtoesporte", produtoesporteSchema);
  
  app.post("/cadastroprodutoesporte", async (req, res) => {
    const id_produtoesporte = req.body.id_produtoesporte;
    const Descricao = req.body.Descricao;
    const Marca = req.body.Marca;
    const Data_fabricacao = req.body.Data_fabricacao;
    const Quantidade_estoque = req.body.Quantidade_estoque

    if(id_produtoesporte == null || Descricao == null || Marca == null || Data_fabricacao == null || Quantidade_estoque == null){
      return res.status(400).json({error : "Preenchar todos os campos!!!"});
    }
  
    const idExiste = await Produtoesporte.findOne({id_produtoesporte : id_produtoesporte});
  
    if(idExiste){
      return res.status(400).json({error : "O produto informado já existe"});
    }

    if(Quantidade_estoque > 10){
      return res.status(400).json({error : "A quantidade maxmima de produtos é 10"});
    }
    if (Quantidade_estoque <= 0){
      return res.status(400).json({error : "O estoque deve estar entre 1 e 10"});
    }


  const produtoesporte = new Produtoesporte({
      id_produtoesporte:id_produtoesporte,
      Descricao:Descricao,
      Marca:Marca,
      Data_fabricacao:Data_fabricacao,
      Quantidade_estoque:Quantidade_estoque
    });
  
  try {
    const newProduto = produtoesporte.save();
    res.json({ error: null, msg: "produtoEsporte OK", UsuarioId: newProduto._id });
  } catch (error) {}


});

app.get("/cadastrousuario", async (req, res) => {
  res.sendFile(__dirname + "/cadastroUsuario.html");
});

app.get("/cadastroProdutos", async (req, res) => {
  res.sendFile(__dirname + "/cadastroProdutos.html");
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
