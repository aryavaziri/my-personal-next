FROM node:18-alpine

WORKDIR /backend

# Install dependencies based on the preferred package manager
COPY package.json ./
RUN npm i

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

CMD npm start;
