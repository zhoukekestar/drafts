echo ""
echo ""
echo ""
echo "#################################"
echo "     Install shadowsocks      "
echo "#################################"
echo ""
echo ""
echo ""
echo "#################################"
echo "  Uninstall Aliyun Software      "
echo "#################################"
echo ""
echo ""
echo ""

# uninstall alyun soft
# @see https://www.laozuo.org/13023.html
curl http://update.aegis.aliyun.com/download/uninstall.sh | bash
curl http://update.aegis.aliyun.com/download/quartz_uninstall.sh | bash
pkill aliyun-service
rm -fr /etc/init.d/agentwatch /usr/sbin/aliyun-service
rm -rf /usr/local/aegis*

echo ""
echo ""
echo ""
echo "#################################"
echo "      Start install python      "
echo "#################################"
echo ""
echo ""
echo ""
# install python
yum -y install python-setuptools && easy_install pip

echo ""
echo ""
echo ""
echo "#################################"
echo "  Start install shadowsocks      "
echo "#################################"
echo ""
echo ""
echo ""
# install shadowsocks
pip install shadowsocks

# export PATH
# ls /usr/local/bin
export PATH=/usr/bin:/usr/local/bin:$PATH

echo ""
echo ""
echo ""
echo "#################################"
echo "  Get default config & set PASSWORD"
echo "#################################"
echo ""
echo ""
echo ""
# get config form git

# get current ip address
IP=`curl -s https://api.ipify.org`
PASSWORD="$IP-$RANDOM"

# set a random password
curl https://raw.githubusercontent.com/zhoukekestar/drafts/master/2019-08~12/2019-10-13-ss/passwords.json | sed "s/PASSWORD/$PASSWORD/g" > /etc/shadowsocks.json


echo ""
echo ""
echo ""
echo "#################################"
echo "  Start shadowsocks with config  "
echo "#################################"
echo ""
echo ""
echo ""
# start shadowsocks
ssserver -c /etc/shadowsocks.json -d start


echo ""
echo ""
echo ""
echo "#################################"
echo '       Finished !!!          '
echo "IP: $IP"
echo 'PORT: 8383, 8384, 8385'
echo "PASSWORD: $PASSWORD"
echo 'MODE: aes-256-cfb'
echo "#################################"
echo ""
echo ""
echo ""
