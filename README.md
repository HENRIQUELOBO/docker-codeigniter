# Projeto em ambiente Docker e o framework Codeigniter


Esse projeto é um exemplo de como usar docker e CodeIgniter, temos um exemplo de Tabela para exibição dos dados, com filtros e paginação.

## Tecnologias
   * PHP
   * MYSQL - Base de dados.
   * Docker - Criação dos ambientes(Server, MYSQL, PHP).
   * Nginx
   * Framework CodeIgniter 3

## Requisitos
- É necessário ter instalado os seguintes modulos:

  * Docker - vesão 19+ - guia de instalação https://docs.docker.com/engine/install/
  * Docker-compose - versão 1.26 - guia de instalação https://docs.docker.com/compose/install/
  * git(opcional)

## Entrutura do projeto
 ```text
docker-codeigniter/
└── app/
      ├── Pasta do projeto codeigniter
└── msql/
      └── initial_data/
          ├── db_default.sql
      ├── diagrama.mwb
      ├── diagrama.png
└── nginx/
└── php/
```

## Instalação e execução
Baixe o pacote 

1. Faça um clone desse repositório 
  `git clone https://github.com/HENRIQUELOBO/docker-codeigniter.git` 
  ou baixe diretamente por aqui - [BAIXAR](https://codeload.github.com/HENRIQUELOBO/docker-codeigniter/zip/master).
2. Entre na pasta `cd docker-codeigniter/`.
3. Rode `sudo docker-compose up` para criar/iniciar os ambientes, aguarde até que apareça os serviços em execução.
5. Pronto só é acessar o link `http://localhost:8080/` para visualizar a aplicação rodando.
6. Se tudo estiver funcionando deverá apararecer essa tela
![alt text](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)
## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
