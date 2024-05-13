<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Sobre o projeto

Este projeto implementa um pequeno sistema de registro de consultas. Nele o usuário (médico) pode cadastrar seus atendimentos associando os dados do paciente, exames solicitados e prescrição feita. Guardando isto em um histórico que mostra também o tempo de atendimento gasto em cada consulta.

## Preparação do ambiente

Para executar este projeto em máquina local é necessário: 

Docker com WSL2: caso a configuração esteja sendo feita em uma máquina Windows, por favor instale a ferramenta Docker com WSL2 através da ([documentação oficial](https://docs.docker.com/desktop/install/windows-install/)). Se você é usuário Linux, só será necessária a [instalação do Docker](https://docs.docker.com/desktop/install/linux-install/).

PHP e Composer: a versão do PHP requerida é no mínimo 8.2. Siga os seguintes passos:
  1. Abra um Terminal Linux ou um WSL;
  2. Execute a atualização de pacotes: `sudo apt update` e `sudo apt upgrade -y`
  3. Adicione o repositório:
     ```
     sudo add-apt-repository ppa:ondrej/php
     ```
     e atualize novamente os pacotes `sudo apt update`
  5. Instale o PHP  
     ```
     sudo apt install php8.2 -y
     ```  
     e algumas bibliotecas essenciais  
     ```
     sudo apt-get install -y php8.2-cli php8.2-common php8.2-fpm php8.2-mysql php8.2-zip php8.2-gd php8.2-mbstring php8.2-curl php8.2-xml php8.2-bcmath
     ```
  6. Para verificar a instalação execute `php --version`. A saída deste comando deve ser:
     ```
     PHP 8.2.19 (cli) (built: May 13 2024 18:20:15) (NTS)
     ```
Estes passos foram retirados do tutorial [How to install PHP 8.2 on Ubuntu 22.04](https://techvblogs.com/blog/install-php-8-2-ubuntu-22-04).

Já a instalação do composer pode ser feita seguindo a [documentação oficial](https://getcomposer.org/download/).

## Iniciando o projeto

1. Copie, baixe ou clone o repositório em uma pasta dentro do seu ambiente Linux WSL.
   ```
   git clone https://github.com/Dhayvison/sistema-consultas-medicas.git
   ```
2. Entre na pasta criada
   ```
   cd ./sistema-consultas-medicas
   ```
3. Copie o arquivo `cp .env.example .env` e preencha os dados de conexão com o banco. Segue exemplo de configuração que pode ser utilizada.
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=pgsql
   DB_PORT=5432
   DB_DATABASE=sail
   DB_USERNAME=root
   DB_PASSWORD=password
   ```
   Além disso é interessante alterar a variável `APP_ENV` para `development`
4. Instale as dependências do projeto com `composer install`
5. Suba os containers de desenvolvimento com o comando
   ```
   ./vendor/bin/sail up -d
   ```
6. Gere a chave de aplicação
   ```
   docker exec sistema-consultas-medicas-laravel.test-1 php artisan key:generate
   ```
7. Execute as migrations e em seguida o seed do banco
   ```
   docker exec sistema-consultas-medicas-laravel.test-1 php artisan migrate
   ```
   ```
   docker exec sistema-consultas-medicas-laravel.test-1 php artisan db:seed
   ```
8. Instale os pacotes Javascript e execute o servidor Vite.
   ```
   docker exec sistema-consultas-medicas-laravel.test-1 npm install
   ```
   ```
   docker exec sistema-consultas-medicas-laravel.test-1 npm run dev
   ```
Feito! Sua aplicação foi configurada e pode ser acessada no endereço local (http://localhost/).

Caso ocorra um erro do tipo `UnexpectedValueException` com a messagem `The stream or file "/var/www/html/storage/logs/laravel.log" could not be opened in append mode: Failed to open stream: Permission denied` na primeira execução do seu código, execute os seguintes comandos.
```
sudo chmod o+w ./storage/ -R
```
```
sudo chown www-data:www-data -R ./storage
```
