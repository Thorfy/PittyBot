# PittyBot
My Discord Bot
R&D for the moment.
I'm going to restructure it.

# ///////////////////////////////////////////////////////////:TO DO //////////////////////////////////////////////////////////////////////
# Premiere etape revu de code 




# gestionnaire de commande : 
insurportable de gerer chaque commande par un if
# gestionnaire d'appelle au text-to-speech, 
a voir pour crer une classe correspondante
# gestionnaire d'event : 
onconnect, onwritemessage, onFirstCOnnect, onDisconnet ? , onMuted
# gestionnaire de config:
pas ouf de foutre toute les clefs dans le code comme ça 

# faire un système propre pour git
# refaire la structure du package node -> package.json etc

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
# deuxieme etape avancer dans le code

# essayer de ne plus passer par les fichier avec fs mais directement passer dans la memoire via le stream ou autre (cf doc stream avec fs)
# reconnaissance vocal a voir, pas sur que ça marche mais on sait jamais-> google cloud api a voir pour gerer les credentiel correpctement parceque c'est archi chiant 

bot.login(DiscordConfig.key)
