#!/bin/bash

echo "Iniciando ambiente de tests..."
echo "Desconstruindo containers, caso existam..."
# sudo docker-compose -f docker-compose-test.yml down --rmi all -v --remove-orphans
# sudo docker-compose -f docker-compose-test.yml down
echo "Construindo containers de testes..."
sudo docker-compose -f docker-compose-test.yml up -d --build
echo "Inciando testes de integração..."
npm run test:integration
# echo "Finalizando containers de teste..."
# sudo docker-compose -f docker-compose-test.yml down --rmi all -v --remove-orphans
