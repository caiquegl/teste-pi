const Sequelize = require("sequelize");
const config = require("../configs/database");
const bcrypt = require("bcrypt");

const registerController = {
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

}

module.exports = registerController;