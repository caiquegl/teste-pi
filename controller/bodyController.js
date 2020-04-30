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
        const {email, password, CPF, nome} = req.body;
        const con = new Sequelize(config);
        const hashPassword = bcrypt.hashSync(password, 10);

        const user = await con.query(
            "INSERT INTO usuario (email, password, CPF, nome) values (:email, :password, :CPF, :nome)",
            {
              replacements: {
                email,
                password: hashPassword,
                CPF, 
                nome
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
    carrinho: (req, res) => {
        return res.render("carrinho", {usuario: req.session.usuario});
    },
    cliente: (req, res) => {
        return res.render("cliente", {usuario: req.session.usuario});
    },
    ecomerce: (req, res) => {
        return res.render("ecomerce", {usuario: req.session.usuario});
    },
    finalizar: (req, res) => {
        return res.render("finalizar", {usuario: req.session.usuario});
    },
    infoProdutos: (req, res) => {
        return res.render("infoProdutos", {usuario: req.session.usuario});
    },
    login: (_req, res) => {
        return res.render("login");
    },
    validatorLogin: async (req, res) => {
      const { email, password } = req.body;
      const con = new Sequelize(config);
  
      const [usuario] = await con.query(
        "select * from usuario where email='teste@teste.com' limit 1;",
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
    paginaAdmin: (req, res) => {
        return res.render("paginaAdmin", {usuario: req.session.usuario});
    }
};

module.exports = bodyController;