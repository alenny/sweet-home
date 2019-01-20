REM Check here for runtime versions: https://sweet-home.scm.azurewebsites.net/api/diagnostics/runtime
az webapp deployment user set --user-name $sweet-home --password 0q5lJTt83uzdTolHslBPFRQxlY1asXWBwLqxztYyK87bdKAHHXfTE1CAen2F
az webapp deployment source config-local-git --name sweet-home --resource-group rg-sweet --query url --output tsv
git remote add azure https://$sweet-home@sweet-home.scm.azurewebsites.net/sweet-home.git
git push azure master
