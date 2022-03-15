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

cat <<EOF > ./.env
# Server Configuration
HOST=
PORT=
# Postgre Configuration
PGUSER=$varpguser
PGPASSWORD=$varpgpassword
PGDATABASE=$varpgdatabase
PGHOST=$varpghost
PGPORT=$varpgport
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