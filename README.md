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

Já a instalação do composer pode ser feita seguinda a [documentação oficial](https://getcomposer.org/download/).
