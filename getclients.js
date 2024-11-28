const { MongoClient } = require('mongodb');
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
      phone: { $regex: '^(11|12|13|14|15|16|17|18|19|20|92|97)', $options: 'i' }
    };

    // Busca os documentos
    const users = await collection.find(query).toArray();
    console.log(`Encontrados ${users.length} usuários`);

    // Se não houver usuários encontrados
    if (users.length === 0) {
      console.log('Nenhum usuário encontrado com o critério especificado.');
      return;
    }

    // Criar conteúdo do arquivo .txt
    let fileContent = 'Usuários encontrados:\n\n';
    users.forEach((user, index) => {
      fileContent += `Numero ${index + 1}:\n`;
      fileContent += `Nome: ${user.name}\n`;
      fileContent += `Telefone: ${user.phone}\n`;
      fileContent += `E-mail: ${user.email}\n\n`;
    });

    // Caminho do arquivo .txt
    const txtFilePath = './usuarios_encontrados.txt';

    // Escrever conteúdo no arquivo .txt
    fs.writeFileSync(txtFilePath, fileContent);
    console.log(`Arquivo de texto criado em: ${txtFilePath}`);

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
