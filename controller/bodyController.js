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
    
    
    
    finalizar: (req, res) => {
        return res.render("finalizar", {usuario: req.session.usuario});
    },
    carrinho: async (req, res) => {
    
      const con = new Sequelize(config);
      let id = req.session.usuario.id;

      const produtos = await con.query(
        "select * from carrinho where id_usuario=:usuario_id;",
        {
          replacements: {
            usuario_id: id
        },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      return res.render("carrinho", {usuario: req.session.usuario, carrinho: produtos});

  },
    cliente: (req, res) => {

      
      return res.render("cliente", {usuario: req.session.usuario});
  },
    

    login: (_req, res) => {
        return res.render("login");
    },
    
    mapa: (req, res) => {
        return res.render("mapa", {usuario: req.session.usuario});
    },
    paginaAdmin: async(req, res) => {
      const con = new Sequelize(config);
      let id = req.session.usuario.id;

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