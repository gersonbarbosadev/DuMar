const connection = require('./connection');

const getCliente = async () => {
    try{
    const [query] = await connection.execute('SELECT * FROM dumar.cli_cliente')
    return query
} catch(erro){
    throw new Error(`Erro ao buscar items: ${error.message}`);
}
}

const inserirCliente = async(CLI_NOME, CLI_EMAIL, CLI_DATA, CLI_SEXO, CLI_DOCUMENTO, CLI_ENDERECO, CLI_TELEFONE, CLI_WHATSAPP, CLI_SENHA) => {
    try {
        const insertCustomer = 'INSERT INTO cli_cliente (CLI_NOME, CLI_EMAIL, CLI_DATA, CLI_SEXO, CLI_DOCUMENTO, CLI_ENDERECO, CLI_TELEFONE, CLI_WHATSAPP, CLI_SENHA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const compradores = [CLI_NOME, CLI_EMAIL, CLI_DATA, CLI_SEXO, CLI_DOCUMENTO, CLI_ENDERECO, CLI_TELEFONE, CLI_WHATSAPP, CLI_SENHA];

        const [result] = await connection.execute(insertCustomer, compradores);
        return result;
    } catch (error) {
        throw new Error(`Erro ao inserir item: ${error.message}`);
    }
}
module.exports = getCliente, inserirCliente