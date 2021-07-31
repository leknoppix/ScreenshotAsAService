# ScreenshotAsAService

## Introduction

Simple script pour générer un imprim ecran de la page complete d'un site internet

## Code Samples



## Installation

### Etape 1:
```
docker run -e FUNCTION_ENABLE_INCOGNITO_MODE=true -e KEEP_ALIVE=true -e PREBOOT_CHROME=true -p 3000:3000 --restart always --name browserless browserless/chrome
```
### Etape 2:
Modifier le fichier .env:
```
WSCHROME=127.0.0.1
WSCHROME_PORT=3000
```
### Etape 3:
```
docker build -t screenshotasaservice .
```
ou utiliser l'instruction
```
docker run -p 8888:8888 leknoppix/screenshotasaservice:0.0.6
```
### Etape 4:
http://127.0.0.1:8888/png/URLENCODER/Titre