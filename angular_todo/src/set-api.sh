sed -i '/hostname/d' ./src/environments/environment.prod.ts
ANGULAR_BACKEND_HOSTNAME=$(hostname)
sed -i "3i\  hostname: '$ANGULAR_BACKEND_HOSTNAME'," ./src/environments/environment.prod.ts
