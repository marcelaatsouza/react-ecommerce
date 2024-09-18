const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { mongoURI } = require('./config/dbConfig');

app.use(express.json());
app.use(cors());

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Executando Aplicação Express");
});

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage })

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('produto'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

const Produto = mongoose.model("Produto", {
    id: {
        type: Number,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    imagem: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    tamanhos: {
        type: [String],
        required: true,
    },
    novo_preco: {
        type: Number,
        required: true,
    },
    antigo_preco: {
        type: Number,
        required: true,
    },
    data: {
        type: Date,
        default: Date.now,
    },
    disponivel: {
        type: Boolean,
        default: true,
    }
});

app.post('/addproduct', async (req, res) => {
    let produtos = await Produto.find({});
    let id;
    if (produtos.length > 0) {
        let last_product_array = produtos.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    };

    const tamanhosArray = req.body.tamanhos.split(',').map(tamanho => tamanho.trim());

    const produto = new Produto({
        id: id,
        nome: req.body.nome,
        imagem: req.body.imagem,
        categoria: req.body.categoria,
        tamanhos: tamanhosArray,
        novo_preco: req.body.novo_preco,
        antigo_preco: req.body.antigo_preco,
    });
    console.log(produto);
    await produto.save();
    console.log("Salvo");
    res.json({
        success: true,
        nome: req.body.nome,
    });
});

app.delete('/removeproduct', async (req, res) => {
    await Produto.findOneAndDelete({ id: req.body.id });
    console.log("Removido");
    res.json({
        success: true,
        nome: req.body.nome
    });
});

app.get('/allproducts', async (req, res) => {
    let produtos = await Produto.find({});
    console.log("Todos os produtos listados");
    res.send(produtos);
});

const Users = mongoose.model('Usuários', {
    nome: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    senha: {
        type: String,
    },
    dadosSacola: {
        type: [],
        default: []
    },
    data: {
        type: Date,
        default: Date.now,
    }
});

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

app.post('/signup', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, errors: "Formato de e-mail inválido." });
    }

    let check = await Users.findOne({ email });
    if (check) {
        return res.status(400).json({ success: false, errors: "E-mail em uso." });
    }
    let bag = {};

    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const user = new Users({
        nome,
        email,
        senha: hashedPassword,
        dadosSacola: bag,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = await bcrypt.compare(req.body.senha, user.senha);
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            const bagItems = req.body.bagItems || [];

            await Users.findOneAndUpdate(
                { _id: user.id },
                { dadosSacola: bagItems }
            );

            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Senha incorreta" });
        }
    } else {
        res.json({ success: false, erros: "E-mail incorreto" });
    }
});

app.get('/newcollections', async (req, res) => {
    let products = await Produto.find({});
    let newcolletions = products.slice(1).slice(-8);
    console.log("Newcollection fetched");
    res.send(newcolletions);
});

app.get('/populares', async (req, res) => {
    let products = await Produto.find({ categoria: 'feminino' });
    let populars = products.slice(0, 4);
    console.log('Populars fetched');
    res.send(populars);
});

app.get('/relatedproducts', async (req, res) => {
    const { categoria } = req.query;
    let products = await Produto.find({ categoria: categoria });
    let relatedproducts = products.slice(0, 4);
    console.log("Related Products fetched");
    res.send(relatedproducts);
});

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: 'Autentique-se utilizando um token válido.' });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: 'Autentique-se utilizando um token válido.' })
        };
    };
};

app.post('/adicionarasacola', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        const { idProduto, quantidade, tamanho } = req.body;
        let itemExistente = userData.dadosSacola.find(item => item.id === idProduto && item.tamanho === tamanho);

        if (!itemExistente) {
            userData.dadosSacola.push({
                id: idProduto,
                quantidade: quantidade || 1,
                tamanho: tamanho || null
            });
        } else {
            itemExistente.quantidade += (quantidade || 1);
        };

        await Users.findOneAndUpdate(
            { _id: req.user.id },
            { dadosSacola: userData.dadosSacola }
        );

        res.send('Produto adicionado à sacola com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao adicionar produto à sacola' });
    };
});

app.post('/removerdasacola', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });

        const idItemSacola = req.body.idItemSacola;

        let itemIndex = userData.dadosSacola.findIndex(item => item.id === idItemSacola);

        if (itemIndex !== -1) {
            if (userData.dadosSacola[itemIndex].quantidade > 1) {
                userData.dadosSacola[itemIndex].quantidade -= 1;
            } else {
                userData.dadosSacola.splice(itemIndex, 1);
            }

            await Users.findOneAndUpdate(
                { _id: req.user.id },
                { dadosSacola: userData.dadosSacola }
            );

            res.send('Produto removido da sacola com sucesso');
        } else {
            res.status(404).send({ error: 'Item não encontrado na sacola' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao remover produto da sacola' });
    };
});

app.post('/atualizarsacola', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        const { idProduto, tamanho, quantidade } = req.body;
        let itemExistente = userData.dadosSacola.find(item => item.id === idProduto);

        if (itemExistente) {
            if (tamanho) {
                itemExistente.tamanho = tamanho;
            }
            if (quantidade) {
                itemExistente.quantidade += quantidade;
            }
            if (itemExistente.quantidade <= 0) {
                userData.dadosSacola = userData.dadosSacola.filter(item => item.id !== idProduto);
            }
        };

        await Users.findOneAndUpdate(
            { _id: req.user.id },
            { dadosSacola: userData.dadosSacola }
        );

        res.send('Sacola atualizada com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao atualizar sacola' });
    };
});

app.post('/sincronizarsacola', fetchUser, async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        const bagItems = req.body.bagItems;

        await Users.findOneAndUpdate(
            { _id: req.user.id },
            { dadosSacola: bagItems }
        );

        res.send('Sacola sincronizada com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao sincronizar a sacola' });
    };
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Servidor escutando na porta " + port)
    } else {
        console.log("Erro " + error);
    };
});