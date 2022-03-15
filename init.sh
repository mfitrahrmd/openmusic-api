echo -e "Creating .env file....\nFile created. Fill the required variables in .env file."

cat <<EOF > ./.env
# Server Configuration
HOST=
PORT=
# Postgre Configuration
PGUSER=
PGPASSWORD=
PGDATABASE=
PGHOST=
PGPORT=
EOF

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