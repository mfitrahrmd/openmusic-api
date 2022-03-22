echo -e "Creating .env file...."

echo -e "~~~Set Postgre Config Variable~~~"

read -p 'Postgre User : ' varpguser

read -sp 'Postgre Password : ' varpgpassword

echo

read -p 'Postgre Database : ' varpgdatabase

read -p 'Postgre Host(localhost) : ' varpghost
varpghost=${varpghost:-localhost}

read -p 'Postgre Port(5432) : ' varpgport
varpgport=${varpgport:-5432}

echo -e "~~~Set JWT Key~~~"

read -p 'JWT Access Token key : ' varjwtaccesstoken
varjwtaccesstoken=${varjwtaccesstoken:-accessToken}

read -p 'JWT Refresh Token key : ' varjwtrefreshtoken
varjwtrefreshtoken=${varjwtrefreshtoken:-refreshToken}


cat <<EOF > ./.env
# Server Configuration
HOST=localhost
PORT=5000

# Postgre Configuration
PGUSER=$varpguser
PGPASSWORD=$varpgpassword
PGDATABASE=$varpgdatabase
PGHOST=$varpghost
PGPORT=$varpgport

# JWT key
ACCESS_TOKEN_KEY=$varjwtaccesstoken
REFRESH_TOKEN_KEY=$varjwtrefreshtoken
ACCESS_TOKEN_AGE=1800
EOF

echo -e "File created."

echo "Installing dependencies..."
npm install

echo "Start migration..."
npm run migrate up

echo "Lint code..."
npm run lint

echo "Done."
echo "'npm run start' to start project"
echo "'npm run dev' to start project for development"

read -p "Press any key to continue ..."