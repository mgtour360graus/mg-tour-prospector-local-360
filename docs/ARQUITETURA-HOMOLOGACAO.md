# Arquitetura do ambiente de homologação

## Isolamento obrigatório

O ambiente de testes deve usar um subdomínio novo, uma pasta nova, dados próprios e segredos próprios. Nenhuma pasta, banco, usuário, domínio ou configuração já existente no cPanel pode ser reutilizada, renomeada, movida ou alterada.

Endereço planejado: `prospector-teste.mgtour360.com.br`.

## Componentes

1. A aplicação visual continua em `app/`.
2. A API Node.js está em `server/` e também entrega os arquivos visuais.
3. O armazenamento de homologação começa em um arquivo JSON privado e isolado.
4. O desenho do banco definitivo está em `database/001-initial.sql`, mas não deve ser executado em banco existente.
5. Os testes automáticos validam autenticação, cadastro, auditoria, consentimento e bloqueio de contato.

## Proteções

- WhatsApp permanece desativado;
- não existe rota de disparo;
- a rota de saúde informa explicitamente `whatsapp: disabled`;
- toda rota de dados exige sessão autenticada;
- consentimento com fonte e data é obrigatório;
- `Não contatar` bloqueia novas aprovações;
- o aplicativo limita o corpo das requisições;
- segredos ficam somente em variáveis de ambiente;
- a base de homologação não entra no GitHub.

## Etapas de implantação isolada

1. Criar o subdomínio novo sem reaproveitar diretório existente.
2. Criar um aplicativo Node.js novo apontando somente para este projeto.
3. Definir senha e segredo exclusivos no ambiente do aplicativo.
4. Confirmar HTTPS antes de aceitar autenticação.
5. Publicar inicialmente apenas a rota `/health` e a interface.
6. Executar os testes de cadastro usando exclusivamente dados fictícios.
7. Só depois avaliar um banco MySQL novo e exclusivo.
8. Manter WhatsApp, Evolution API e n8n desativados durante toda a homologação inicial.

## O que não será alterado

- site principal da MG Tour;
- WordPress atual;
- subdomínios existentes;
- bancos e usuários existentes;
- arquivos e pastas existentes;
- DNS dos endereços atuais;
- contas de e-mail;
- versões de PHP dos sites atuais;
- chaves, certificados e integrações já configuradas.

