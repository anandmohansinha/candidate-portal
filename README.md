# candidatePortal
candidate portal


## Install on ec2
sudo yum update -y

sudo yum install git -y

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"


git clone https://github.com/anandmohansinha/candidate-portal.git
npm install


npm install forever -g
forever start -c "npm start" ./

Ajay