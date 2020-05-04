const Sequelize = require("sequelize");
const config = require("../configs/database");
const bcrypt = require("bcrypt");


const bodyController = {
    home: (req, res) => {
        return res.render("index", {usuario: req.session.usuario});
    },
    noticia: (req, res) => {
        return res.render("noticia", {usuario: req.session.usuario});
    },
    cadastro: (_req, res) => {
        return res.render("cadastro");
    },
    store: async (req, res) => {
        const {email, password, CPF, nome, endereco, nascimento, sexo, ofertas} = req.body;
        const con = new Sequelize(config);
        const hashPassword = bcrypt.hashSync(password, 10);

        const user = await con.query(
            "INSERT INTO usuario (email, password, CPF, nome, endereco, nascimento, sexo, ofertas) values (:email, :password, :CPF, :nome, :endereco, :nascimento, :sexo, :ofertas)",
            {
              replacements: {
                email,
                password: hashPassword,
                CPF, 
                nome,
                endereco,
                nascimento,
                sexo,
                ofertas
              },
              type: Sequelize.QueryTypes.INSERT,
            }
            );
            if (!email) {
              return res.render("register", {
                msg: "Erro ao cadastrar um usuario",
              });
            }
        
            return res.redirect("cliente");
    },

    storeProduto: async (req, res) => {
      const {nome_produto, valor, descricao, id_usuario} = req.body;
      const con = new Sequelize(config);
      const [foto] = req.files;

     
      


      const user = await con.query(
          "INSERT INTO produtos (nome_produto, valor, descricao, id_usuario, foto) values (:nome_produto, :valor, :descricao,:id_usuario, :foto)",
          {
            replacements: {
              nome_produto,
              valor,
              descricao, 
              id_usuario,
              foto: [foto.filename]
            },
            type: Sequelize.QueryTypes.INSERT,
          }
          );

          
          
          
          return res.redirect("paginaAdmin");
  },
    
    carrinho: async (req, res) => {
        return res.render("carrinho", {usuario: req.session.usuario});
    },
    cliente: (req, res) => {
        return res.render("cliente", {usuario: req.session.usuario});
    },
    ecomerce: async(req, res) => {
      const con = new Sequelize(config);

      const produtos = await con.query("select * from produtos",
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
        return res.render("ecomerce", {usuario: req.session.usuario, produtos: produtos});
    },
    finalizar: (req, res) => {
        return res.render("finalizar", {usuario: req.session.usuario});
    },
    infoProdutos: async (req, res) => {
      const con = new Sequelize(config);
      const id = req.query;
      const produtos = await con.query(
        "select * from produtos where id_produtos=:produtos_id;",
        {
          replacements: {
            produtos_id: id
        },
          type: Sequelize.QueryTypes.SELECT,
        }
      );
        return res.render("infoProdutos", {usuario: req.session.usuario, produtos: produtos});
    },
    login: (_req, res) => {
        return res.render("login");
    },
    validatorLogin: async (req, res) => {
      const { email, password } = req.body;
      const con = new Sequelize(config);
  
      const [usuario] = await con.query(
        "select * from usuario where email=:email;",
        {
          replacements: {
            email,
          },
          type: Sequelize.QueryTypes.SELECT,
        }
      );
  
      if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
        return res.render("cadastro", {
          msg: "Email ou senha errados!",
        });
      }
      
      
      req.session.usuario = {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        CPF: usuario.CPF,
        endereco: usuario.endereco,
        nascimento: usuario.nascimento,
        sexo: usuario.sexo,
      };
          return res.redirect("cliente");
    },
    validando:(req,res,next)=>{
    
      if(!req.session.usuario){
        res.redirect('/login');
        
    }next();
  
    
  },
    mapa: (req, res) => {
        return res.render("mapa", {usuario: req.session.usuario});
    },
    paginaAdmin: async(req, res) => {
      const con = new Sequelize(config);
      let id = req.session.usuario.id

      const produtos = await con.query(
        "select * from produtos where id_usuario=:usuario_id;",
        {
          replacements: {
            usuario_id: id
        },
          type: Sequelize.QueryTypes.SELECT,
        }
      );
        

        return res.render("paginaAdmin", {usuario: req.session.usuario, produtos: produtos});
    }
};

module.exports = bodyController;