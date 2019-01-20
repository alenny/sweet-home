#!/bin/bash

gitdirectory=.
username=$sweet-home
password=0q5lJTt83uzdTolHslBPFRQxlY1asXWBwLqxztYyK87bdKAHHXfTE1CAen2F
webappname=sweet-home

# Create a resource group.
az group create --location westeurope --name myResourceGroup

# Create an App Service plan in FREE tier.
az appservice plan create --name $webappname --resource-group myResourceGroup --sku FREE

# Create a web app.
az webapp create --name $webappname --resource-group myResourceGroup --plan $webappname

# Set the account-level deployment credentials
az webapp deployment user set --user-name $username --password $password

# Configure local Git and get deployment URL
url=$(az webapp deployment source config-local-git --name $webappname \
--resource-group myResourceGroup --query url --output tsv)

# Add the Azure remote to your local Git respository and push your code
cd $gitdirectory
git remote add azure $url
git push azure master

# When prompted for password, use the value of $password that you specified

# Copy the result of the following command into a browser to see the web app.
echo http://$webappname.azurewebsites.net