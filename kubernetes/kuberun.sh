#!/bin/zsh

# Postgres

cd postgres : kubectl create -f postgres-secret.yaml
wait
cd postgres : kubectl create -f postgres-configMap.yaml
wait
cd postgres : kubectl create -f postgres-storage.yaml
wait
cd postgres : kubectl create -f postgres-clusterip.yaml
wait
cd postgres : kubectl create -f postgres-deployment.yaml
wait
echo "Postgres is ready"

# Redis

wait
cd redis : kubectl apply -f redis-configMap.yaml
wait
cd redis : kubectl apply -f redis-deployment.yaml
wait
cd redis : kubectl apply -f redis-clusterip.yaml
wait
echo "Redis is ready"

# Backend

wait
cd backend : kubectl create -f backend-clusterip.yaml
wait
cd backend : kubectl create -f backend-deployment.yaml
wait
cd backend : kubectl create -f backend-nodeport.yaml
wait
echo "Backend is ready"

# Frontend

wait
cd frontend : kubectl create -f frontend-clusterip.yaml
wait
cd frontend : kubectl create -f frontend-deployment.yaml
wait
cd frontend : kubectl create -f frontend-nodeport.yaml
wait
echo "Frontend is ready"

# Nginx

wait
cd controller : kubectl create -f nginx-clusterip.yaml
wait
cd controller : kubectl create -f nginx-deployment.yaml
wait
cd controller : kubectl create -f nginx-nodeport.yaml
wait
echo "Nginx is ready"
