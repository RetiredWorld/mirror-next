pm2 stop ustc-mirror
pm2 delete ustc-mirror
cd /home/zeka/files/ustc-next
pm2 start npm --name "ustc-mirror" -- run start
