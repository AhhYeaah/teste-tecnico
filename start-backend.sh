cd ./backend/
npm install
mv .env.example .env
docker compose up --detach
npm run start:dev
