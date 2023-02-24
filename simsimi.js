const { create, decryptMedia } = require('@open-wa/wa-automate');
const axios = require('axios').default;

// Definir a URL da API do Simsimi
const simsimiUrl = 'https://api.simsimi.net/v1/';

// Definir a chave da API do Simsimi
const simsimiApiKey = 'YOUR_API_KEY';

// Definir a função para enviar uma solicitação para o Simsimi
async function sendToSimsimi(message) {
  // Definir os parâmetros da solicitação
  const params = {
    key: vXAYgbLxJR57RgJ2k.3PqrmlZY~u15H.ETn8M0t1,
    lc: 'pt',
    ft: '1.0',
    text: message
  };

  // Enviar a solicitação para a API do Simsimi
  const response = await axios.get(simsimiUrl, { params });
  
  // Retornar a resposta do Simsimi
  return response.data.response;
}

// Criar a instância do bot
create().then(client => start(client));

// Definir a função para lidar com as mensagens recebidas
function start(client) {
  client.onMessage(async message => {
    if (message.body === '!sair') {
      client.sendText(message.from, 'Tchau!');
      client.kill();
      return;
    }

    // Enviar a mensagem para o Simsimi
    const response = await sendToSimsimi(message.body);

    // Responder com a mensagem do Simsimi
    client.sendText(message.from, response);
  });
}
