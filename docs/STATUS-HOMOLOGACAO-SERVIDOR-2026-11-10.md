# Status da homologação no servidor — 10/11/2026

## Resultado

O ambiente isolado `prospector-teste.mgtour360.com.br` foi criado no cPanel sem reutilizar ou alterar os sites, diretórios, bancos ou configurações existentes.

O aplicativo Node.js 22 está em execução e utiliza código do repositório público do projeto. Não foi criado banco MySQL nesta etapa.

## Testes aprovados

- inicialização do servidor Node.js;
- interface visual encontrada dentro do pacote de implantação;
- página inicial respondendo `200 OK`;
- arquivo JavaScript principal respondendo `200 OK`;
- API de prospectos respondendo `401 Unauthorized` sem sessão;
- rota `/health` respondendo `200 OK`;
- modo informado como `homologacao`;
- WhatsApp informado como `disabled`;
- cabeçalhos de segurança presentes;
- verificações automáticas do GitHub concluídas com sucesso.

## Isolamento confirmado

- subdomínio novo;
- pasta e contêiner próprios;
- variáveis próprias;
- armazenamento de teste próprio;
- nenhum banco existente foi vinculado;
- nenhum site existente foi editado;
- nenhuma integração de WhatsApp ou n8n foi ativada.

## Pendência para acesso público normal

O DNS oficial de `mgtour360.com.br` é administrado no Cloudflare. O registro do novo subdomínio ainda não existe na zona pública, portanto o endereço não resolve normalmente e o AutoSSL não consegue emitir o certificado confiável.

Próximo passo: criar no Cloudflare somente o registro A de `prospector-teste` apontando para o endereço do servidor exibido no cPanel, inicialmente em modo **Somente DNS**. Depois da propagação, executar novamente o AutoSSL no cPanel e validar o endereço por HTTPS sem exceções.

Até essa etapa, o aplicativo está operacional no servidor e foi testado por resolução direta controlada, mas não deve ser apresentado como endereço público final.
