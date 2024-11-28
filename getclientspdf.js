const { MongoClient } = require('mongodb');
const fs = require('fs');
const PDFDocument = require('pdfkit');

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

    // Criando o documento PDF
    const doc = new PDFDocument();
    const pdfFilePath = './usuarios_encontrados.pdf';
    doc.pipe(fs.createWriteStream(pdfFilePath));

    // Título do PDF
    doc.fontSize(18).text('Usuários Encontrados', { align: 'center' });
    doc.moveDown(2); // Espaçamento após o título

    // Adicionando cada usuário ao PDF
    users.forEach((user, index) => {
      doc.fontSize(12)
        .text(`Usuário ${index + 1}:`, { underline: true })
        .text(`Nome: ${user.name}`)
        .text(`E-mail: ${user.email}`)
        .text(`Telefone: ${user.phone}`)
        .moveDown(1); // Espaçamento entre os usuários
    });

    // Finalizando o PDF
    doc.end();

    console.log(`Arquivo PDF criado em: ${pdfFilePath}`);

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
