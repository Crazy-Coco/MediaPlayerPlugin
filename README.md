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
* inclure la feuille de style du plugin dans le `<head>` de votre vue : `<link rel="stylesheet" href="../MediaPlayerPlugin/style/mediaPlayer.css">`
* inclure les scripts javascript indispensable au bon fonctionnement du plugin (3 au total) à la fin de votre `<body>`, juste avant la balise fermante `</body>` :
  1. `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>`
  2. `<script src="../MediaPlayerPlugin/js/jquery.CustomScrollbar.js"></script>`
  3. `<script src="../MediaPlayerPlugin/js/mediaPlayer_main.js"></script>`

### Creation du MédiaPlayer Principal

![MediaPlayer+ListeMedia](https://image.noelshack.com/fichiers/2019/05/4/1548958634-mediaplayerandlist.png)

Créer dans le corps de votre vue entre les balises `<body>` et `</body>` un élément `<div>` contenant comme class `playerPlugin` pour faire apparaitre le lecteur principal et la liste des fichiers audios/vidéos :

__`<div class="playerPlugin audioType"></div>`__
* La classe **.playerPlugin** sert à afficher le corps du MédiaPlayer (Lecteur + Timeline + Liste des médias) __INDISPENSABLE__
* La classe **.audioType** sert à informer le plugin que les médias à lire sont de type audio (.mp3, .wav ...)

#### Options du MédiaPlayer Principal
Différentes options peuvent être ajouter au MédiaPlayer. Pour cela il suffit simplement de rajouter certaines classes à l'élément `<div class="playerPlugin audioType"></div>` créer plus haut.
Voici les différentes options de classes existantes :
* La classe **.videoType** sert à informer au plugin que les médias à lire sont de type vidéo (.mp4, .avi ...). Cette classe remplace la classe audioType (soit audioType, soit videoType). Elle permet de lire a la fois des fichiers de type vidéo et audio. Vous pouvez donc mettre à jour le tableau __tracks__ dans le fichier __js/mediaPlayer_main.js__ à la ligne **6** avec des fichiers audio et vidéo sans problème.
* La classe **.hiddenElement** sert à faire disparaitre le MédiaPlayer lorsqu'il n'y a plus de mouvement de souris détecté, à l'inverse le MédiaPlayer réapparait lorsqu'un mouvement de souris est détecté.
* Les classes responsive de **Bootstrap** sont aussi acceptés pour définir la largeur du MédiaPlayer (col-sm-#, col-md-#, col-lg-#, col-xl-#, => # à remplacer par un chiffre entre 1 et 12). Liens Bootstrap : [Bootstrap initiation](https://www.w3schools.com/booTsTrap/bootstrap_grid_basic.asp)

Exemple de code HTML pour créer un MédiaPlayer de type vidéo avec apparition/disparition de celui-ci au mouvement de souris et avec une largeur définie (bootstrap) :
`<div class="playerPlugin videoType hiddenElement col-lg-7"></div>`

### Creation d'une ActiveBar

![ActiveBarMediaPlayer](https://image.noelshack.com/fichiers/2019/05/4/1548966609-mediaplayeractivebar.png)

Il suffit de créer un élément `<div>` contenant comme class `activeBarPlugin1` pour faire apparaitre l' ActiveBar qui se place automatiquement en bas de l'écran et qui prend toute la largeur de celui-ci.<br>
Comme pour le MédiaPlayer Principal, on peut rajouter à cette `<div>` la classe `hiddenElement` qui fait apparaitre/disparaitre l'ActiveBar en fonction du mouvement de la souris.<br>

Exemple de code HTML pour le déploiement d'une ActiveBar : `<div class="activeBarPlugin1 hiddenElement"></div>`
<br>
Exemple de code HTML complet MédiaPlayer + ActiveBar :
`<div class="playerPlugin videoType hiddenElement col-lg-7"></div>

 <div class="activeBarPlugin1 hiddenElement"></div>`

