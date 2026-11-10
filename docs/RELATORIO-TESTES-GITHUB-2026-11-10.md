# Relatório de testes — GitHub Pages

Data da verificação: 10 de novembro de 2026  
Ambiente testado: versão pública no GitHub Pages  
Endereço: https://mgtour360graus.github.io/mg-tour-prospector-local-360/

## Resultado geral

A versão estática foi aprovada para testes internos do fluxo comercial assistido. Não foram identificados erros de console, falhas de persistência local ou vazamento horizontal nas larguras de tela verificadas.

Esta aprovação se limita à aplicação executada no navegador. Extrator automático, autenticação, banco central, sincronização entre usuários, n8n e envio real por WhatsApp ainda não fazem parte da versão pública.

## Cenários aprovados

- carregamento inicial com cinco registros fictícios;
- cadastro de um novo prospecto com validação dos campos obrigatórios;
- pesquisa, filtro e edição de dados;
- persistência do registro após recarregar a página;
- bloqueio da conclusão da auditoria sem fato confirmado;
- bloqueio da conclusão sem sugestão comercial;
- cálculo da pontuação `11/11` e prioridade `A`;
- conclusão da auditoria após preencher os requisitos;
- botão de simulação bloqueado antes do consentimento;
- bloqueio do consentimento sem fonte e sem data;
- aprovação humana com fonte e data registradas;
- simulação local confirmando que nenhuma mensagem foi enviada;
- exportação dos seis registros em JSON e CSV;
- validação da estrutura e da quantidade de registros exportados;
- restauração dos dados de demonstração;
- importação do backup JSON e recuperação do registro de teste;
- bloqueio de contato após marcar `Não contatar`;
- restauração final da base fictícia de demonstração;
- ausência de erros e avisos no console do navegador;
- carregamento de recursos somente a partir do domínio público do projeto.

## Verificação responsiva

| Largura testada | Resultado |
| --- | --- |
| 390 px | Sem rolagem horizontal; navegação e formulário utilizáveis |
| 768 px | Sem rolagem horizontal |
| 1440 px | Sem rolagem horizontal |

O modal também permaneceu dentro da área visível na largura de 390 px.

## Proteções confirmadas

- nenhum número real foi publicado no GitHub;
- o teste funcional utilizou somente dados fictícios;
- não há credenciais no aplicativo público;
- não existe chamada para Evolution API ou outro provedor de WhatsApp;
- não há envio automático ou disparo em massa;
- auditoria, consentimento e aprovação permanecem obrigatórios;
- a ação `Não contatar` prevalece sobre a aprovação anterior.

## Limites da versão atual

- os dados ficam apenas no navegador usado pelo operador;
- limpar os dados do navegador remove a base local, salvo se houver backup exportado;
- não há usuários, senhas ou níveis de acesso;
- não há extração automática do Google Maps;
- não há banco de dados central;
- não há integração ativa com n8n;
- não há integração ativa com WhatsApp;
- não há monitoramento do servidor ou trilha de auditoria centralizada.

## Próxima etapa recomendada

Construir uma segunda fase isolada da versão pública, com autenticação, banco central, importação controlada de prospectos e API própria. A integração com WhatsApp deve continuar desativada até existir um número dedicado, consentimento verificável e teste manual aprovado.
