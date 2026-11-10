# Prospector Local MG Tour 360

Projeto de prospecção assistida para empresas locais com oportunidade de organização do Perfil da Empresa no Google, fotografias profissionais, Street View e experiências em 360°.

## Objetivo da primeira versão segura

1. Receber empresas coletadas pelo extrator.
2. Organizar os dados comerciais e manter a validação do WhatsApp separada do número principal da MG Tour.
3. Gravar ou atualizar o prospecto sem duplicar o mesmo contato.
4. Manter a auditoria visual do perfil e das imagens 360° sob responsabilidade humana.
5. Gerar uma mensagem curta somente depois que a auditoria estiver concluída.
6. Registrar o consentimento explícito para contato pelo WhatsApp.
7. Liberar apenas uma simulação local depois da aprovação humana; nenhum envio real existe nesta fase.

## Plataforma local de testes

A aplicação funcional está em `app/`. Ela pode ser aberta por um servidor local ou publicada como site estático no GitHub Pages.

- os dados de teste ficam no navegador;
- os cinco exemplos iniciais são fictícios;
- é possível cadastrar, editar, auditar, pontuar e revisar empresas;
- a autorização para WhatsApp tem origem e data;
- o contato é apenas simulado;
- JSON e CSV podem ser exportados para cópia local.

### Endereços publicados

- Plataforma online: https://mgtour360graus.github.io/mg-tour-prospector-local-360/
- Repositório: https://github.com/mgtour360graus/mg-tour-prospector-local-360
- Relatório de testes: [docs/RELATORIO-TESTES-GITHUB-2026-11-10.md](docs/RELATORIO-TESTES-GITHUB-2026-11-10.md)

## Fluxos entregues

- `01-entrada-validacao-leads.json`: recebe o extrator, normaliza os dados, valida o WhatsApp e registra o prospecto.
- `02-gerar-diagnostico-mensagem.json`: calcula a prioridade e gera a primeira mensagem usando somente informações confirmadas.
- `03-enviar-aprovados.json`: fluxo legado entregue desativado. Não deve ser conectado ao número principal. A substituição segura será uma fila de contato consentido.

Todos os fluxos são entregues desativados. Selecione as credenciais, configure as variáveis e execute o roteiro de teste antes de ativar.

## Estrutura do projeto

```text
MG-TOUR-PROSPECTOR-LOCAL-360/
  config/
    n8n.env.example
  docs/
    ARQUITETURA-HOMOLOGACAO.md
    CHECKLIST-IMPLANTACAO.md
    DICIONARIO-DA-BASE.md
    RELATORIO-TESTES-GITHUB-2026-11-10.md
  database/
    001-initial.sql
  server/
    src/
    test/
    package.json
  prompts/
    DIAGNOSTICO-E-MENSAGEM.md
  tools/
    payload-teste.json
  workflows/
    01-entrada-validacao-leads.json
    02-gerar-diagnostico-mensagem.json
    03-enviar-aprovados.json
```

Para usar a plataforma funcional, abra `app/index.html` por um servidor local ou acesse a versão publicada no GitHub Pages. A pasta `preview/` contém somente a apresentação visual anterior.

## Regra de segurança comercial

O sistema não considera um prospecto pronto para envio apenas porque foi extraído. A sequência obrigatória é:

```text
PENDENTE → auditoria manual → CONCLUIDA → mensagem sugerida
→ consentimento registrado → revisão humana → APROVADO → contato manual
```

Se `nao_contatar` estiver marcado como `SIM`, qualquer ação de contato permanece bloqueada mesmo que a mensagem esteja aprovada.

## Início rápido

1. Abra a planilha Google Sheets já criada para este projeto.
2. Confirme o ID registrado em `config/n8n.env.example`.
3. Defina as variáveis do arquivo de exemplo no ambiente do n8n.
4. Reinicie o n8n para carregar as variáveis.
5. Importe os três workflows.
6. Selecione a credencial do Google Sheets em todos os nós correspondentes.
7. Selecione uma credencial da OpenAI no fluxo 02.
8. Teste o fluxo 01 com `tools/payload-teste.json`.
9. Faça a auditoria manual de um prospecto e marque `auditoria_status` como `CONCLUIDA`.
10. Execute manualmente o fluxo 02 e revise a mensagem.
11. Use um número de teste e execute manualmente o fluxo 03.
12. Ative os agendamentos somente depois da conferência do histórico de execuções.

Consulte `docs/CHECKLIST-IMPLANTACAO.md` para o procedimento completo.

## Ambiente isolado de homologação

A estrutura em `server/` prepara um aplicativo Node.js separado, com autenticação, API, armazenamento exclusivo de testes e testes automáticos. Ela não deve compartilhar pastas, bancos, usuários ou configurações com o site principal. Consulte `docs/ARQUITETURA-HOMOLOGACAO.md` antes de qualquer implantação.
