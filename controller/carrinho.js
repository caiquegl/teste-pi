const Sequelize = require("sequelize");
const config = require("../configs/database");
const bcrypt = require("bcrypt");

const carrinho = {
    store: async (req, res) => {
        const con = new Sequelize(config);
        const {nome_produto, valor_produto, id_produto, descricao_produto, foto_produto} = req.body;
        const {usuario} = req.session;
        

        const carrinho = await con.query(
            "INSERT INTO carrinho (nome_produto, valor_produto, id_produto, quantidade, descricao_produto, foto_produto, id_usuario) values (:nome_produto, :valor_produto, :id_produto, :quantidade, :descricao_produto, :foto_produto, :id_usuario)",
            {
              replacements: {
                nome_produto,
                valor_produto,
                id_produto,
                quantidade: 1,
                descricao_produto,
                foto_produto,
                id_usuario: usuario.id,
              },
              type: Sequelize.QueryTypes.INSERT,
            }
            );

            return res.redirect("/carrinho");

    }
}

module.exports = carrinho;