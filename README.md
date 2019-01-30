# MediaPlayerPlugin
Plugin Javascript permettant le déploiement d'un media-player audio et/ou vidéo sur votre site web

![MediaPlayerPluginExemple](https://image.noelshack.com/fichiers/2019/05/2/1548783526-mediaplayerplugin1.png)

## Langages utilisés ?
* HTML5, CSS3
* JavaScript, jQuery

## Pour commencer
Afin d'inclure le plugin à votre projet web, dans un premier temps il suffit de coller la totalité du dossier 
__MediaPlayerPlugin/__ à l'intérieur de votre projet :
* soit au coeur même de l'arborescence de votre projet
* soit dans un sous dossier __plugin/__ par exemple

![ExemplePourCommencer](https://image.noelshack.com/fichiers/2019/05/2/1548786164-exemple1.png)

### Pré-requis
Avant de déployer le média player sur une de vos vues(.html) il vous faut :
1. Supprimer les fichiers audio et vidéo d'exemple dans les dossiers __audio/__ et __video/__ et les remplacer par vos fichiers audio et vidéo personnels.
2. Mettre à jour la variable **DIRECTORY** dans le fichier __js/mediaPlayer_main.js__ à  la ligne 2. Cette variable **DIRECTORY** indique le chemin (relatif ou absolu) ou se trouve le dossier __MediaPlayerPlugin/__ en fonction de la vue ou vous faite appelle au plugin. Elle est indispensable au bon fonctionnement de média player.
Par exemple : si la vue.html dans laquelle vous souhaitez faire apparaître le média player se trouve dans le dossier __WebContent/vue.html__, alors la variable **DIRECTORY** vaudra **DIRECTORY = "../MediaPlayerPlugin/"**(chemin relatif) ou **DIRECTORY = "/MediaPlayerPlugin/"**(chemin absolu). Voir image d'au dessus pour l'exemple (celle de gauche)

### Déploiement
