# K8S PROJECT

## Komendy

### Docker budowanie i pushowanie

docker build -t kkolodziejski/projectfrontend .
docker push kkolodziejski/projectfrontend

docker build -t kkolodziejski/projectbackend .
docker push kkolodziejski/projectbackend

docker build -t kkolodziejski/projectnginx .
docker push kkolodziejski/projectnginx

### Kubernetes

#### Postgres

kubectl create -f postgres-secret.yaml
kubectl create -f postgres-storage.yaml
kubectl create -f postgres-configMap.yaml
kubectl create -f postgres-deployment.yaml
kubectl create -f postgres-clusterip.yaml

#### Redis

kubectl apply -f redis-configMap.yaml
kubectl apply -f redis-deployment.yaml
kubectl apply -f redis-clusterip.yaml

#### Backend

kubectl create -f backend-deployment.yaml
kubectl create -f backend-clusterip.yaml
kubectl create -f backend-nodeport.yaml

#### Frontend

kubectl create -f frontend-deployment.yaml
kubectl create -f frontend-clusterip.yaml
kubectl create -f frontend-nodeport.yaml

#### Nginx

kubectl create -f nginx-deployment.yaml
kubectl create -f nginx-clusterip.yaml
kubectl create -f nginx-nodeport.yaml

#### Ingress

minikube addons enable ingress
trzeba zrobic sudo nano /etc/hosts   i dodac do hostow nazwe domeny
kubectl create -f ingress.yaml
