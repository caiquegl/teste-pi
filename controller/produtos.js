const Sequelize = require("sequelize");
const config = require("../configs/database");
const bcrypt = require("bcrypt");

const produtosController = {
    storeProduto: async (req, res) => {
        const {nome_produto, valor, descricao, id_usuario} = req.body;
        const con = new Sequelize(config);
        const [foto] = req.files;
        const {usuario} = req.session;
       
        
  
  
        const user = await con.query(
            "INSERT INTO produtos (nome_produto, valor, descricao, id_usuario, foto) values (:nome_produto, :valor, :descricao,:id_usuario, :foto)",
            {
              replacements: {
                nome_produto,
                valor,
                descricao, 
                id_usuario: usuario.id,
                foto: [foto.filename]
              },
              type: Sequelize.QueryTypes.INSERT,
            }
            );
  
            
            
            
            return res.redirect("paginaAdmin");
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
      infoProdutos: async (req, res) => {
        const con = new Sequelize(config);
        const id = req.params.id;
        const infoProduto = await con.query(
          "select * from produtos where id_produto=:produtos_id;",
          {
            replacements: {
              produtos_id: id
          },
            type: Sequelize.QueryTypes.SELECT,
          }
        );
          return res.render("infoProdutos", {usuario: req.session.usuario, infoProduto: infoProduto});
      },
}

module.exports = produtosController;