echo '#################################'
echo "        Install shadowsocks      "
echo '#################################'


echo '#################################'
echo "      start install python      "
echo '#################################'
# install python
yum -y install python-setuptools && easy_install pip


echo '#################################'
echo "  start install shadowsocks      "
echo '#################################'
# install shadowsocks
pip install shadowsocks

# export PATH
# ls /usr/local/bin
# export PATH=/usr/local/bin:$PATH


echo '#################################'
echo "  Get default config to /etc/shadowsocks.json"
echo '#################################'
# get config form git

# get current ip address
# IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d\  -f2)
IP=`curl -s https://api.ipify.org`
PASSWORD="$IP-$RANDOM"

# set a random password
curl https://raw.githubusercontent.com/zhoukekestar/drafts/master/2019-08~12/2019-10-13-ss/passwords.json | sed "s/PASSWORD/$PASSWORD/g" > /etc/shadowsocks.json


echo '#################################'
echo "  start shadowsocks with config  "
echo '#################################'
# start shadowsocks
/usr/local/bin/ssserver -c /etc/shadowsocks.json -d start


echo '#############################'
echo '       Finished !!!          '
echo "IP: $IP"
echo 'PORT: 8383, 8384, 8385'
echo "PASSWORD: $PASSWORD"
echo '#############################'
