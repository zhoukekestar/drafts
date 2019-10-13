echo "\n\n\n---------------------------------"
echo "        Install shadowsocks      "
echo "---------------------------------\n\n\n"


echo "\n\n\n---------------------------------"
echo "        Uninstall Aliyun Software      "
echo "---------------------------------\n\n\n"
- uninstall alyun soft
- @see https://www.laozuo.org/13023.html
curl http://update.aegis.aliyun.com/download/uninstall.sh | bash
curl http://update.aegis.aliyun.com/download/quartz_uninstall.sh | bash
pkill aliyun-service
rm -fr /etc/init.d/agentwatch /usr/sbin/aliyun-service
rm -rf /usr/local/aegis*


echo "\n\n\n---------------------------------"
echo "      Start install python      "
echo "---------------------------------\n\n\n"
- install python
yum -y install python-setuptools && easy_install pip

echo "\n\n\n---------------------------------"
echo "  start install shadowsocks      "
echo "---------------------------------\n\n\n"
- install shadowsocks
pip install shadowsocks -i https://files.pythonhosted.org/

- export PATH
- ls /usr/local/bin
export PATH=/usr/bin:/usr/local/bin:$PATH


echo "\n\n\n---------------------------------"
echo "  Get default config & set PASSWORD"
echo "---------------------------------\n\n\n"
- get config form git

- get current ip address
- IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d\  -f2)
IP=`curl -s https://api.ipify.org`
PASSWORD="$IP-$RANDOM"

- set a random password
curl https://raw.githubusercontent.com/zhoukekestar/drafts/master/2019-08~12/2019-10-13-ss/passwords.json | sed "s/PASSWORD/$PASSWORD/g" > /etc/shadowsocks.json


echo "\n\n\n---------------------------------"
echo "  Start shadowsocks with config  "
echo "---------------------------------\n\n\n"
- start shadowsocks
ssserver -c /etc/shadowsocks.json -d start


echo "\n\n\n---------------------------------"
echo '       Finished !!!          '
echo "IP: $IP"
echo 'PORT: 8383, 8384, 8385'
echo "PASSWORD: $PASSWORD"
echo 'MODE: aes-256-cfb'
echo "---------------------------------\n\n\n"
