#!/bin/bash
MY_EMAIL_ADDRESS="arya.vaziri@gmail.com"
DOMAIN="aryav.nl"

apt-get -y update
apt-get -y upgrade

git config --global user.email $MY_EMAIL_ADDRESS
git config --global user.name "aryaVultr"

echo '#!/bin/bash' >> .ssl
echo 'apt-get -y update' >> .ssl
echo 'apt-get -y install certbot' >> .ssl
echo 'certbot certonly --standalone -m '$MY_EMAIL_ADDRESS' --agree-tos --no-eff-email -d '$DOMAIN' -d v1.'$DOMAIN' -v' >> .ssl

. ./.ssl
