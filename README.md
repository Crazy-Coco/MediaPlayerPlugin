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
2. Mettre à jour la variable **DIRECTORY** dans le fichier __js/mediaPlayer_main.js__ à  la ligne **2**. Cette variable **DIRECTORY** indique le chemin (relatif ou absolu) ou se trouve le dossier __MediaPlayerPlugin/__ en fonction de la vue ou vous faites appelle au plugin. Elle est indispensable au bon fonctionnement de média player.
<br>_Par exemple_ : si la vue.html dans laquelle vous souhaitez faire apparaître le média player se trouve dans le dossier __WebContent/vue.html__, alors la variable **DIRECTORY** vaudra `DIRECTORY = "../MediaPlayerPlugin/"` (chemin relatif) ou `DIRECTORY = "/MediaPlayerPlugin/"` (chemin absolu). Voir image d'au dessus pour l'exemple (celle de gauche).

3. Modifier les lignes du tableau __tracks__ dans le fichier __js/mediaPlayer_main.js__ à  la ligne **6**, remplacer les valeurs(track, name, artist, duration, path) par les valeurs correspondant à vos fichiers audio et vidéo. La valeur la plus importante est **path**, elle indique au média player le chemin de vos fichiers audio et vidéo. 

### Déploiement
Pour déployer le média player, placé vous dans votre __vue.html__, pour l'exemple considérons que cette vue est dans dossier __WebContent/__.

Ensuite il vous faut :
* inclure la feuille de style du plugin dans le __<head>__ de votre vue : `<link rel="stylesheet" href="../MediaPlayerPlugin/style/mediaPlayer.css">`
* inclure les scripts javascript indispensable au bon fonctionnement du plugin (3 au total) à la fin de votre `<body>`, juste avant la balise fermante `</body>` :
  1. `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>`
  2. `<script src="../MediaPlayerPlugin/js/jquery.CustomScrollbar.js"></script>`
  3. `<script src="../MediaPlayerPlugin/js/mediaPlayer_main.js"></script>`

#### Creation du Média Player Principal
Creer dans le corps de votre vue entre les balises __<body>__ et `</body>` un élément `<div>` contenant comme class `playerPlugin`pour faire apparaitre le lecteur principal et la liste des fichiers audios/vidéos :<br>
`<div class="playerPlugin"></div>`
