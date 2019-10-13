echo '#################################'
echo "        Install shadowsocks      "
echo '#################################'


echo '#################################'
echo "      start install python      "
echo '#################################'
# install python
yum install python-setuptools && easy_install pip


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
curl https://raw.githubusercontent.com/zhoukekestar/drafts/master/2019-08~12/2019-10-13-ss/passwords.json > /etc/shadowsocks.json


echo '#################################'
echo "  start shadowsocks with config  "
echo '#################################'
# start shadowsocks
/usr/local/bin/ssserver -c /etc/shadowsocks.json -d start
