FROM mcr.microsoft.com/powershell:lts-7.2-ubuntu-20.04 AS base
RUN apt-get update  \
    && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y \
    nodejs

WORKDIR /home

COPY ./src ./src
COPY package.json .
COPY tsconfig.json .
COPY webpack.config.js .
COPY build.ps1 .

RUN pwsh ./build.ps1

EXPOSE 4000

ENTRYPOINT [ "/bin/bash", "-c", "npm run start" ]
