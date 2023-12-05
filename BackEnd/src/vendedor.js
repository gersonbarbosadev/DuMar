const connection = require('./connection');

const getVendedor = async () => {
    try{
    const [query] = await connection.execute('SELECT * FROM dumar.ven_vendendor')
    return query
} catch(erro){
    throw new Error(`Erro ao buscar items: ${error.message}`);
}
}

const inserirVendedor = async(VEN_NOME, VEN_EMAIL, VEN_DATA, VEN_SEXO, VEN_DOCUMENTO, VEN_ENDERECO, VEN_TELEFONE, VEN_WHATSAPP, VEN_SENHA) => {
    try {
        const insertSeller = 'INSERT INTO VEN_VENente (VEN_NOME, VEN_EMAIL, VEN_DATA, VEN_SEXO, VEN_DOCUMENTO, VEN_ENDERECO, VEN_TELEFONE, VEN_WHATSAPP, VEN_SENHA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const vendedores = [VEN_NOME, VEN_EMAIL, VEN_DATA, VEN_SEXO, VEN_DOCUMENTO, VEN_ENDERECO, VEN_TELEFONE, VEN_WHATSAPP, VEN_SENHA];

        const [result] = await connection.execute(insertSeller, vendedores);
        return result;
    } catch (error) {
        throw new Error(`Erro ao inserir item: ${error.message}`);
    }
}

module.exports = getVendedor, inserirVendedor