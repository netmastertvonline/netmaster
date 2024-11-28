const { MongoClient } = require('mongodb');
const { Parser } = require('json2csv');
const fs = require('fs');

// Configuração de conexão com o MongoDB Atlas
const uri = 'mongodb+srv://contatonetmastertvonline:vN6fBtSyzDYoEsNN@cluster0.ef0jt.mongodb.net/netmastertvonline'; // Substitua com suas credenciais
const dbName = 'netmastertvonline'; // Substitua pelo nome do seu banco de dados
const collectionName = 'users'; // Nome da coleção onde os dados estão armazenados

// Função principal
async function exportUsers() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Conecta ao MongoDB
    await client.connect();
    console.log('Conectado ao MongoDB Atlas');

    // Acessa o banco de dados e a coleção
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Consulta: Filtra números de telefone que começam com os códigos de área entre 11 e 20
    const query = {
      phone: { $regex: '^(11|12|13|14|15|16|17|18|19|20)', $options: 'i' }
    };

    // Busca os documentos
    const users = await collection.find(query).toArray();
    console.log(`Encontrados ${users.length} usuários`);

    // Se não houver usuários encontrados
    if (users.length === 0) {
      console.log('Nenhum usuário encontrado com o critério especificado.');
      return;
    }

    // Preparar os dados para exportação para CSV
    const usersData = users.map(user => ({
      name: user.name,
      email: user.email,
      phone: user.phone
    }));

    // Usar o Parser do json2csv para converter os dados em CSV
    const csvParser = new Parser();
    const csv = csvParser.parse(usersData);

    // Caminho do arquivo .csv
    const csvFilePath = './usuarios_encontrados.csv';

    // Escrever o conteúdo no arquivo .csv
    fs.writeFileSync(csvFilePath, csv);
    console.log(`Arquivo CSV criado em: ${csvFilePath}`);

  } catch (error) {
    console.error('Erro ao exportar usuários:', error);
  } finally {
    // Fecha a conexão com o MongoDB
    await client.close();
    console.log('Conexão com MongoDB fechada.');
  }
}

// Executar a função
exportUsers();
