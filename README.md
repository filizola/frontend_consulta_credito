# Frontend Consulta Crédito

Este projeto foi gerado usando [Angular CLI](https://github.com/angular/angular-cli) versão 20.1.5.

## Sobre o Projeto

Frontend desenvolvido em Angular para consulta de créditos constituídos, fornecendo uma interface moderna e responsiva para interação com a API de consulta de créditos.

## Tecnologias Utilizadas

- **Angular 18+**
- **TypeScript**
- **HTML5 & CSS3/SCSS**
- **Angular CLI**
- **RxJS**
- **Angular HTTP Client**

## Funcionalidades

- Consulta de créditos por número da NFS-e
- Consulta de crédito específico por número do crédito
- Interface responsiva e moderna
- Validação de formulários
- Tratamento de erros
- Loading states

## Servidor de Desenvolvimento

Para iniciar um servidor de desenvolvimento local, execute:

```bash
ng serve
```

Após o servidor estar rodando, abra seu navegador e navegue para `http://localhost:4200/`. A aplicação será recarregada automaticamente sempre que você modificar qualquer um dos arquivos fonte.

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   └── consulta-credito/     # Componente principal de consulta
│   ├── models/
│   │   └── credito.model.ts      # Modelo de dados do crédito
│   ├── services/
│   │   └── credito.service.ts    # Serviço para comunicação com a API
│   ├── app.config.ts             # Configurações da aplicação
│   ├── app.routes.ts             # Configuração de rotas
│   └── app.ts                    # Componente raiz
├── index.html                    # Página principal
├── main.ts                       # Ponto de entrada da aplicação
└── styles.scss                   # Estilos globais
```

## Geração de Código

O Angular CLI inclui ferramentas poderosas de geração de código. Para gerar um novo componente, execute:

```bash
ng generate component nome-do-componente
```

Para uma lista completa de esquemas disponíveis (como `components`, `directives` ou `pipes`), execute:

```bash
ng generate --help
```

## Compilação

Para compilar o projeto execute:

```bash
ng build
```

Isso irá compilar seu projeto e armazenar os artefatos de compilação no diretório `dist/`. Por padrão, a compilação de produção otimiza sua aplicação para performance e velocidade.

## Executando Testes Unitários

Para executar testes unitários com o test runner [Karma](https://karma-runner.github.io), use o seguinte comando:

```bash
ng test
```

## Executando Testes End-to-End

Para testes end-to-end (e2e), execute:

```bash
ng e2e
```

O Angular CLI não vem com um framework de testes end-to-end por padrão. Você pode escolher um que atenda às suas necessidades.

## Configuração da API

O serviço está configurado para se comunicar com a API backend em `http://localhost:8080`. Para alterar essa configuração, modifique o arquivo `src/app/services/credito.service.ts`.

## Executando com Docker

### Pré-requisitos
- Docker
- Docker Compose

### Executar o Frontend
```bash
# Navegar para o diretório do frontend
cd frontend-consulta-credito

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
ng serve --host 0.0.0.0 --port 4200
```

A aplicação estará disponível em: `http://localhost:4200`

## Scripts Disponíveis

- `ng serve` - Inicia o servidor de desenvolvimento
- `ng build` - Compila a aplicação para produção
- `ng test` - Executa os testes unitários
- `ng lint` - Executa o linter para verificar qualidade do código
- `ng e2e` - Executa testes end-to-end

## Recursos Adicionais

Para mais informações sobre o uso do Angular CLI, incluindo referências detalhadas de comandos, visite a página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona alguma MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Autor

Desenvolvido como parte de um sistema completo de consulta de créditos, demonstrando conhecimentos em:
- Desenvolvimento frontend com Angular
- Integração com APIs REST
- Design responsivo e moderno
- Boas práticas de desenvolvimento frontend
- TypeScript e programação reativa com RxJS
