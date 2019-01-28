
$( document ).ready(function() {
    var DIRECTORY = ""; // indiquer le repertoire du plugin "MediaPlayerPlugin/" en fonction du repertoire d'appel(en fct de la vue)

    /*  tracks = Tableau contenant la liste des musiques à jouer
    Attention : path --> laisser le DIRECTORY devant définit juste au dessus */
    var tracks = [
        {"track":0,"name":"Sakura","artist":"Evan's Prod","duration":"03:53","path":DIRECTORY+"audio/Sakura.mp3"},
        {"track":1,"name":"Vibes","artist":"Evan's Prod","duration":"02:48","path":DIRECTORY+"audio/Vibes.mp3"},
        {"track":2,"name":"Underground","artist":"Evan's Prod","duration":"03:05","path":DIRECTORY+"audio/Underground.mp3"},
        {"track":3,"name":"Glorious","artist":"Evan's Prod","duration":"03:43","path":DIRECTORY+"audio/Glorious.mp3"},
        {"track":4,"name":"Utchiwa","artist":"Evan's Prod","duration":"04:08","path":DIRECTORY+"audio/Utchiwa.mp3"},
        {"track":5,"name":"Stranger-things","artist":"Evan's Prod","duration":"03:47","path":DIRECTORY+"audio/Stranger-things.mp3"},
        {"track":6,"name":"Morpheus","artist":"Evan's Prod","duration":"02:39","path":DIRECTORY+"audio/Morpheus.mp3"},
        {"track":7,"name":"Savage","artist":"Evan's Prod","duration":"03:50","path":DIRECTORY+"audio/Savage.mp3"},
        {"track":8,"name":"Gotham","artist":"Evan's Prod","duration":"04:14","path":DIRECTORY+"audio/Gotham.mp3"},
        {"track":9,"name":"Endless","artist":"Evan's Prod","duration":"03:53","path":DIRECTORY+"audio/Endless.mp3"}
    ];
    /*Lien ou l'on peut télécharger la music par exemple */
    var download_link = "https://evansmht.beatstars.com/";

    /* LIEN DE PARTAGE */
    var share_facebook = "#";
    var share_twitter = "#";
    var share_google = "#";

    /* Images des boutons composant le design du player (mouseover et mouseout */
    var img_btnPlay = {"main" : DIRECTORY+"img/bouton_play_red.png", "hover" : DIRECTORY+"img/bouton-play-white.png"}; // img du bouton play en mode classique(=main) et en mode mouseover
    var img_btnPause = { "main" : DIRECTORY+"img/bouton-pause-red.png", "hover" : DIRECTORY+"img/bouton-pause-white.png" };
    var img_btnPrev = {"main" : DIRECTORY+"img/btn_prev.png", "hover" : DIRECTORY+"img/btn_prev_hover.png" };
    var img_btnNext = {"main" : DIRECTORY+"img/btn_next.png", "hover" : DIRECTORY+"img/btn_next_hover.png" };
    var img_left_arrow = DIRECTORY+"img/fleche-left-likeShare.png";


    // On creer le code HTML DU MEDIA PLAYER
    initHTML_MediaPlayer();

    /* Variable indispensable pour le fonctionnement du player */
    var media_played = false; // Media en cours(=true) ou en pause(=false)
    var id_track = 0; // id track/media en cours.
    var onplayhead = false; // BOOL = FALSE QUAND LE PLAYHEAD EST LACHER
    var timeline = document.getElementById('timeline'); // timeline
    var timeline_activeBar1 =  document.getElementById('activeBar1_timeline');
    var playhead = document.getElementById('playhead'); // playhead
    var playhead_activeBar1 = document.getElementById('activeBar1_playhead');
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    var timelineWidth_activeBar1 =  timeline_activeBar1.offsetWidth - playhead_activeBar1.offsetWidth;






    /******** SELECTEUR (Jquery) ********/
    var tracklist_element = $('#trackList_music'); // div qui va recevoir la liste des pistes audio

    var button_play = $('#btn_play');
    var button_prev = $("#btn_prev");
    var button_next = $("#btn_next");
    var mediaPlayer = $("#media-player"); // DIV  globale du media player
    var media = null; // element html media de type audio ou video
    // selecteur include w3-include-html
    var playerPlugin = $('.playerPlugin');
    var activeBarPlugin1 = $('.activeBarPlugin1');

    // selecteur activeBar
    var btnPlay_activeBar1 = $("#btnPlay_activeBar1");
    var btnPrev_activeBar1 = $("#btnPrev_activeBar1");
    var btnNext_activeBar1 = $("#btnNext_activeBar1");


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



            /******** FUNCTION ********/


    function create_mediaPlayer() {
        var media_player = document.createElement('div');
        media_player.id = "media-player";
        media_player.className="col-lg-12";
        var player = document.createElement('div');
        player.id = "player";
        player.className = "col-lg-12";
        var player_left = document.createElement('div');
        player_left.id ="player-left";
        player_left.className = "col-lg-2";
        var btn_play = document.createElement('img');
        btn_play.id = "btn_play";
        player_left.appendChild(btn_play);
        player.appendChild(player_left);
        var player_middle = document.createElement('div');
        player_middle.id = "player-middle";
        player_middle.className = "col-lg-8";
        var audio_played = document.createElement('h2');
        audio_played.id = "audio_played";
        player_middle.appendChild(audio_played);
        var timeline =  document.createElement('div');
        timeline.id = "timeline";
        timeline.className = "col-lg-12";
        player_middle.appendChild(timeline);
        var playheadPlayer =  document.createElement('div');
        playheadPlayer.id = "playhead";
        timeline.appendChild(playheadPlayer);
        var artist_played = document.createElement('h3');
        artist_played.id = "artist_played";
        player_middle.appendChild(artist_played);
        player.appendChild(player_middle);
        var player_right = document.createElement('div');
        player_right.id = "player-right";
        player_right.className = "col-lg-2";
        var button_prevNext = document.createElement('div');
        button_prevNext.id = "button_prevNext";
        var btn_prev = document.createElement('img');
        btn_prev.id = "btn_prev";
        var btn_next = document.createElement('img');
        btn_next.id = "btn_next";
        button_prevNext.appendChild(btn_prev);
        button_prevNext.appendChild(btn_next);
        var counter = document.createElement('div');
        counter.id = "counter";
        var track_time = document.createElement('span');
        track_time.id = 'track_time';
        track_time.appendChild(document.createTextNode('00:00'));
        var count_separate = document.createElement('span');
        count_separate.id = "count_separate";
        count_separate.appendChild(document.createTextNode('/'));
        var track_duration = document.createElement('span');
        track_duration.id = "track_duration";
        track_duration.appendChild(document.createTextNode('00:00'));
        counter.appendChild(track_time);
        counter.appendChild(count_separate);
        counter.appendChild(track_duration);

        player_right.appendChild(button_prevNext);
        player_right.appendChild(counter);
        player.appendChild(player_right);

        media_player.appendChild(player);

        var trackList = document.createElement('div');
        trackList.id = "trackList";
        trackList.className = "col-lg-12";
        var trackList_titles = document.createElement('div');
        trackList_titles.id = "trackList_titles";
        var title = document.createElement('div');
        title.className = "title col-lg-3";
        title.appendChild(document.createTextNode('Titre'));
        var artist = document.createElement('div');
        artist.className = "artist col-lg-3";
        artist.appendChild(document.createTextNode('Artiste'));
        var duree = document.createElement('div');
        duree.className = "duree col-lg-2";
        duree.appendChild(document.createTextNode('Durée'));
        var share = document.createElement('div');
        share.className = "share col-lg-2";
        share.appendChild(document.createTextNode('Partager'));
        var download = document.createElement('div');
        download.className = "download col-lg-2";
        download.appendChild(document.createTextNode('Télécharger'));


        trackList_titles.appendChild(title);
        trackList_titles.appendChild(artist);
        trackList_titles.appendChild(duree);
        trackList_titles.appendChild(share);
        trackList_titles.appendChild(download);

        var trackList_music = document.createElement("div");
        trackList_music.id = "trackList_music";
        trackList_music.className = "mCustomScrollbar";
        trackList_music.setAttribute("data-mcs-theme", "light-3");
        trackList.appendChild(trackList_titles);
        trackList.appendChild(trackList_music);



        media_player.appendChild(trackList);

        playerPlugin[0].appendChild(media_player);

    }
    // Creation [HTML Element] des Sources audio ( remplissage de la div trackList_music )
    function create_trackList(tabTracks) {   // creer le code HTML comprenant la liste des music [CREATE HTML ELEMENT] ==> Track List
        for(var i= 0; i < tabTracks.length; i++) // boucle for pour parcourir le tableau tracks.
        {
            var div_music = document.createElement('div');
            div_music.className = "music";
            div_music.setAttribute("data-number", tabTracks[i]['track']);
                var div_title = document.createElement('div');
                div_title.className= "title col-lg-3";
                    var link_name = document.createElement('a');
                    link_name.href = "#";
                    link_name.innerHTML = tabTracks[i]['name'];
                div_title.appendChild(link_name);
            div_music.appendChild(div_title);

                var div_artist = document.createElement('div');
                div_artist.className= "artist col-lg-3";
                    var link_artist = document.createElement('a');
                    link_artist.href = "#";
                    link_artist.innerHTML = tabTracks[i]['artist'];
                div_artist.appendChild(link_artist);
            div_music.appendChild(div_artist);

                var div_duree = document.createElement('div');
                div_duree.className= "duree col-lg-2";
                    var link_duree = document.createElement('a');
                    link_duree.href = "#";
                    link_duree.innerHTML = tabTracks[i]['duration'];
                div_duree.appendChild(link_duree);
            div_music.appendChild(div_duree);

            var div_share = document.createElement('div');
            div_share.className= "share col-lg-2";
                var link_fa = document.createElement('a');
                link_fa.href = "javascript:void(0)";
                    var icon_fa = document.createElement('i');
                    icon_fa.className = "fa fa-thumbs-up";
                link_fa.appendChild(icon_fa);
            div_share.appendChild(link_fa);

                var div_likeShare = document.createElement('div');
                div_likeShare.className = "like_share";
                    var span_arrow = document.createElement('span');
                    span_arrow.className = "arrow-left";
                        var img_arrow = document.createElement('img');
                        img_arrow.src = img_left_arrow;
                    span_arrow.appendChild(img_arrow);
                div_likeShare.appendChild(span_arrow);
                    var div_share_social_icons = document.createElement('div');
                    div_share_social_icons.className = "share_social_icons";
                        var link_share_facebook = document.createElement('a');
                        link_share_facebook.href = share_facebook;
                        link_share_facebook.className = "shareFacebook";
                            var icon_share_fa = document.createElement('i');
                            icon_share_fa.className= "fa fa-facebook circle push";
                        link_share_facebook.appendChild(icon_share_fa);
                    div_share_social_icons.appendChild(link_share_facebook);
                        var link_share_Twitter = document.createElement('a');
                        link_share_Twitter.href = share_twitter;
                        link_share_Twitter.className = "shareTwitter";
                            var icon_share_twi = document.createElement('i');
                            icon_share_twi.className= "fa fa-twitter circle push";
                        link_share_Twitter.appendChild(icon_share_twi);
                    div_share_social_icons.appendChild(link_share_Twitter);
                        var link_share_Google = document.createElement('a');
                        link_share_Google.href = share_google;
                        link_share_Google.className = "shareGoogle";
                            var icon_share_goo = document.createElement('i');
                            icon_share_goo.className= "fa fa-google-plus circle push";
                         link_share_Google.appendChild(icon_share_goo);
                    div_share_social_icons.appendChild(link_share_Google);

                div_likeShare.appendChild(div_share_social_icons);
            div_share.appendChild(div_likeShare);
            div_music.appendChild(div_share);

            var div_download = document.createElement('div');
            div_download.className = "download col-lg-2";
                var link_download = document.createElement('a');
                link_download.href = download_link;
                link_download.setAttribute("target", "_blank");
                    var icon_download = document.createElement('i');
                    icon_download.className = "fa  fa-cloud-download";
                link_download.appendChild(icon_download);
            div_download.appendChild(link_download);
            div_music.appendChild(div_download);
            tracklist_element = $('#trackList_music');
            tracklist_element[0].appendChild(div_music); // ajoute la music a la tracklist de la page
        }
    }
    //Creation du code html concernant la bar active
    function create_activeBar(){
        var activeBar1 = document.createElement('div');
        activeBar1.className = "row col-lg-12 activeBar1";

        var left_activeBar1 = document.createElement('div');
        left_activeBar1.className = "left_activeBar1 col-lg-3";

        var middle_activeBar1 = document.createElement("div");
        middle_activeBar1.className = "middle_activeBar1 col-lg-6";
        var player_activeBar1 = document.createElement("div");
        player_activeBar1.id = "player_activeBar1";
        var btnPrev_activeBar1 = document.createElement("button");
        btnPrev_activeBar1.id = "btnPrev_activeBar1";
        player_activeBar1.appendChild(btnPrev_activeBar1);
        var btnPlay_activeBar1 = document.createElement("button");
        btnPlay_activeBar1.id = "btnPlay_activeBar1";
        btnPlay_activeBar1.className = "play";
        player_activeBar1.appendChild(btnPlay_activeBar1);
        var btnNext_activeBar1 = document.createElement("button");
        btnNext_activeBar1.id = "btnNext_activeBar1";
        player_activeBar1.appendChild(btnNext_activeBar1);
        var activeBar1_center = document.createElement("div");
        activeBar1_center.id = "activeBar1_center";
        var topLine = document.createElement("div");
        topLine.id = "topLine";
        var activeBar1_mediaTitle = document.createElement("div");
        activeBar1_mediaTitle.id = "activeBar1_mediaTitle";
        topLine.appendChild(activeBar1_mediaTitle);
        var activeBar1_time = document.createElement("div");
        activeBar1_time.id = "activeBar1_time";
        var activeBar1_tracktime = document.createElement("span");
        activeBar1_tracktime.id = "activeBar1_tracktime";
        activeBar1_time.appendChild(activeBar1_tracktime);
        activeBar1_time.appendChild(document.createTextNode('/'));
        var activeBar1_durationTime = document.createElement("span");
        activeBar1_durationTime.id = "activeBar1_durationTime";
        activeBar1_durationTime.appendChild(document.createTextNode('00:00'));
        activeBar1_time.appendChild(activeBar1_durationTime);
        topLine.appendChild(activeBar1_time);
        activeBar1_center.appendChild(topLine);
        var activeBar1_timeline = document.createElement("div");
        activeBar1_timeline.id = "activeBar1_timeline";
        var activeBar1_playhead = document.createElement("div");
        activeBar1_playhead.id = "activeBar1_playhead";
        activeBar1_timeline.appendChild(activeBar1_playhead);
        activeBar1_center.appendChild(activeBar1_timeline);
        player_activeBar1.appendChild(activeBar1_center);
        middle_activeBar1.appendChild(player_activeBar1);

        var right_activeBar1 = document.createElement("div");
        right_activeBar1.className = "right_activeBar1 col-lg-3";

        activeBar1.appendChild(left_activeBar1);
        activeBar1.appendChild(middle_activeBar1);
        activeBar1.appendChild(right_activeBar1);


        activeBarPlugin1[0].appendChild(activeBar1);

    }

    function initHTML_MediaPlayer() {
        if ($('.playerPlugin').length) {  // si l'élément playerPlugin est inclue
            playerPlugin = $('.playerPlugin');
            create_mediaPlayer();
            create_trackList(tracks);// Creer ma liste de music dans la div trackList_music

            if ($(".activeBarPlugin1").length) {
                activeBarPlugin1 = $(".activeBarPlugin1");
                create_activeBar();
            }
        }

    }
    initButton();
    /*****  INITIALISATION DES IMG DES BOUTONS DU PLUGIN en fonction des élément HTML inclue *****/
    function initButton() {
        if ($('.playerPlugin').length) {  // si l'élément playerPlugin est inclue
            button_play.attr("src",img_btnPlay["main"]); // alors on defini les img des bouton pour cet élément
            button_next.attr("src",img_btnNext["main"]);
            button_prev.attr("src",img_btnPrev["main"]);
        }
        if($(".activeBarPlugin1").length) {

        }
    }

    function define_typeOfMedia(divMediaPlayer){
        if(playerPlugin.hasClass('audioType')){
            var audio_element = document.createElement('audio'); // on creer l'element <audio>
            audio_element.id = "audio";
            mediaPlayer.prepend(audio_element);
            media = document.getElementById("audio");// je met a jour la variable media avec l'élément que l'on vient de creer
        } else if (playerPlugin.hasClass('videoType')){
            var contentFullscreen_video = document.createElement('div');
            contentFullscreen_video.id = "contentFullscreen_video";
            var video_element = document.createElement('video'); // on creer l'element <video>
            video_element.id = "video";
            contentFullscreen_video.prepend(video_element); // on ajoute l'élément au debut la div media-player
            $('body').prepend(contentFullscreen_video);
            media = document.getElementById("video");// je met a jour la variable media avec l'élément que l'on vient de creer
        } else {
            console.log("ERROR : [Element HTML] <audio> or <video> not found !")
        }


    }



    /********** INITIALISATION DU LECTEUR AVEC 1ER MEDIA DU TABLEAU tracks **********/
    function initialize(id_media) { // param: tableau tracks, l'id du tracks à jouer
        $('.music').removeClass('background_transparent');
        $('.music:nth-child(' + (id_media+1) + ')').addClass('background_transparent');
        $("#audio_played").html(tracks[id_media].name); // On initialise avec le titre du 1er media
        $("#activeBar1_mediaTitle").html(tracks[id_media].name);
        $("#artist_played").html(tracks[id_media].artist);
        // video.attr('src', $tab[0].video);

        media.src = tracks[id_media].path;
        updateTrackTime(media)
    }
    /********** Met a jour le design des boutons du player **********/
    function majButton() {
        if(!media_played) { // si le media est a l'arret == false
            if ($('.playerPlugin').length) {  // si l'élément playerPlugin est inclue
                button_play.attr("src", img_btnPlay["main"]);
            }
            if($(".activeBarPlugin1").length) {
                btnPlay_activeBar1.removeClass("pause");
                btnPlay_activeBar1.addClass("play");
            }
        } else if(media_played) {
            if ($('.playerPlugin').length) {  // si l'élément playerPlugin est inclue
                button_play.attr("src", img_btnPause["main"]);
            }
            if($(".activeBarPlugin1").length) {
                btnPlay_activeBar1.removeClass("play");
                btnPlay_activeBar1.addClass("pause");
            }
        } else {
            console.log("Error : The media element (var media) is not defind !")
        }

    }

    // LECTURE DU MEDIA
    function playMedia() {
        if (media_played) { // si media en lecture
            media.pause(); // alors on met en pause le lecteur
            media_played = false;// met a jour la variable media_played
        } else if(!media_played) { //si media en pause
            media.play(); // alors on lance la lecture du media
            media_played = true;
        } else {
            console.log("Error : The media element (var media) is not defind !")
        }
        majButton();
    }
    function nextPrevPlay() {
        media.play(); // alors on lance la lecture du media
        media_played = true;
        majButton();
    }

    /********** MISE A JOUR DU TEMPS (00:00) **********/

    function updateTrackTime(media){
        //media player
        var currTimeDiv = document.getElementById('track_time');
        var durationDiv = document.getElementById('track_duration');
        // activebar
        var currTimeDiv_activeBar1 = document.getElementById('activeBar1_tracktime');
        var durationDiv_activeBar1 = document.getElementById('activeBar1_durationTime');
        var currTime = Math.floor(media.currentTime).toString();
        var duration = Math.floor(media.duration).toString();

        currTimeDiv.innerHTML = formatSecondsAsTime(currTime);
        currTimeDiv_activeBar1.innerHTML = formatSecondsAsTime(currTime);
        if (isNaN(duration)){
            durationDiv.text = '00:00';
            durationDiv_activeBar1.text = '00:00';
        }
        else{
            durationDiv.innerHTML = formatSecondsAsTime(duration);
            durationDiv_activeBar1.innerHTML = formatSecondsAsTime(duration);
        }
    }

    /********** FORMATATION SECONDE EN TEMPS **********/

    function formatSecondsAsTime(secs, format) {
        var hr  = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hr * 3600))/60);
        var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

        if (min < 10){
            min = "0" + min;
        }
        if (sec < 10){
            sec  = "0" + sec;
        }

        return min + ':' + sec;
    }

    /********** RETURN UN POURCENTAGE AU CLICK (FORMAT DEC ex: .75) **********/
    function clickPercent(event) {
        return (event.clientX - getPosition(timeline)) / timelineWidth;
    }
    function clickPercent_activeBar1(event) {
        return (event.clientX - getPosition(timeline_activeBar1)) / timelineWidth_activeBar1;
    }

    //*************** RETOURNE LA LONGUEUR ENTRE UN ELEMENT ET LA GAUCHE DE L'ECRAN *********************//
    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }

    /********** MOUVEMENT MANUEL PLAYHEAD **********/
    function mouseDown() {
        onplayhead = true;
        window.addEventListener('mousemove', moveplayhead, true);
        media.removeEventListener('timeupdate', timeUpdate, false);
    }

    function mouseUp(event) {
        if (onplayhead == true) {
            moveplayhead(event);
            window.removeEventListener('mousemove', moveplayhead, true);
            // change current time
            media.currentTime = MediaDuration * clickPercent(event);
            starttime = MediaDuration * clickPercent(event);
            media.addEventListener('timeupdate', timeUpdate, false);
        }
        onplayhead = false;
    }
    function moveplayhead(event) {
        var newMargLeft = event.clientX - getPosition(timeline);
        var newMargLeft_activeBar1 = event.clientX - getPosition(timeline_activeBar1);

        if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
            playhead.style.marginLeft = newMargLeft + "px";
            playhead_activeBar1.style.marginLeft = newMargLeft_activeBar1 + "px";
        }
        if (newMargLeft < 0) {
            playhead.style.marginLeft = "0px";
            playhead_activeBar1.style.marginLeft = "0px";
        }
        if (newMargLeft > timelineWidth) {
            playhead.style.marginLeft = timelineWidth + "px";
            playhead_activeBar1.style.marginLeft = timelineWidth_activeBar1 + "px";
        }
    }
    //*************** MOUVEMENT AUTO PLAYHEAD *****************//
    function timeUpdate() {
        var playPercent = timelineWidth * (media.currentTime / MediaDuration);
        var playPercent_activeBar1 = timelineWidth_activeBar1 * (media.currentTime / MediaDuration);
        playhead.style.marginLeft = playPercent + "px";
        playhead_activeBar1.style.marginLeft = playPercent_activeBar1 + "px";
        if (media.currentTime === MediaDuration) { // sin on arrive a la fin de la lecture
            if((id_track+1) < tracks.length) {
                id_track++;
                initialize(id_track);
            } else {
                id_track = 0;
                initialize(id_track)
            }
            nextPrevPlay();
        }
    }



    /******** EXECUTE FUNCTION ********/



    define_typeOfMedia(mediaPlayer); // met a jour la variable media(= [ELEMENT HTML] <audio> ou <video> et crer aussi l'element HTML
    initialize(id_track);
    media.addEventListener("timeupdate", timeUpdate, false); // execute fct timeUpdate a chaque changement de time

    /******** SELECTEUR (Jquery) ********/
    var music_element = $(".music");



////////////////////////////////////////////////////  EVENTS  //////////////////////////////////////////////////////////


    /******** EVENEMENTS CLICK ********/


    // BUTTON PLAY EVENT CLICK
    button_play.click(function () {
        playMedia();
    });
    //BUTTON EVENT NEXT/PREV
    button_next.click(function () {
        if((id_track+1) < tracks.length) {
            id_track++;
            initialize(id_track);
        } else {
            id_track = 0;
            initialize(id_track);
        }
        nextPrevPlay();
    });
    button_prev.click(function () {
        if((id_track - 1) >= 0) {
            id_track--;
            initialize(id_track);
        } else {
            id_track = tracks.length-1;
            initialize(id_track);
        }
        nextPrevPlay();
    });


    btnPlay_activeBar1.click(function () {
        playMedia();
    });
    btnNext_activeBar1.click(function () {
        if((id_track+1) < tracks.length) {
            id_track++;
            initialize(id_track);
        } else {
            id_track = 0;
            initialize(id_track);
        }
        nextPrevPlay();
    });
    btnPrev_activeBar1.click(function () {
        if((id_track - 1) >= 0) {
            id_track--;
            initialize(id_track);
        } else {
            id_track = tracks.length-1;
            initialize(id_track);
        }
        nextPrevPlay();
    });

    /******** EVENEMENTS HOVER ********/

    button_play                                         // button play
        .mouseover(function () {
            if(!media_played) { // si media_played == false -> media en pause
                $(this).attr("src", img_btnPlay["hover"]);//-> on affiche le bouton play hover
            } else {            // si media_played == false -> media en lecture
                $(this).attr("src", img_btnPause["hover"]);//-> on affiche le bouton pause hover
            }
        })
        .mouseout( function () {
            if(!media_played) { // si media_played == false -> media en pause
                $(this).attr("src",img_btnPlay["main"]);//-> on affiche le bouton play hover
            } else {            // si media_played == false -> media en lecture
                $(this).attr("src", img_btnPause["main"]);//-> on affiche le bouton pause hover
            }
        });
    button_prev                                         // button previous music
        .mouseover(function () {
            $(this).attr("src", img_btnPrev["hover"]);
        })
        .mouseout(function () {
            $(this).attr("src", img_btnPrev["main"]);
        });
    button_next                                         // button next music
        .mouseover(function () {
            $(this).attr("src", img_btnNext["hover"]);
        })
        .mouseout(function () {
            $(this).attr("src", img_btnNext["main"]);
        });

    //*********************** EVENT CLICK SUR DIV .music ******************//

    music_element.click( function() {
        id_track = parseInt($(this).attr("data-number"));
        initialize(id_track);
        nextPrevPlay();
    });


    $(".fa-thumbs-up, .fa-cloud-download")
        .mouseover(function() {
        music_element.off('click');
        })
        .mouseout(function () {
            music_element.on('click.mynamespace', function() { id_track = parseInt($(this).attr("data-number"));
                                                                console.log(id_track);
                                                                initialize(id_track);
                                                                nextPrevPlay(); });
        });


    // BUTTON SHARE CLICK
    $('.share a').click(function() {
        $(this).next('div').toggle(300,"swing"); // fait appraitre/disparaitre la div like_share
    });



    var MediaDuration = media.duration; // Duration of audio clip, calculated here for embedding purposes
    /******** AUTRES EVENEMENTS ********/

    media.addEventListener("canplaythrough", function() {
        MediaDuration = media.duration;
    }, false);
    // A chaque changement de temps du media on modifie les valeurs
    media.ontimeupdate = function() {
        updateTrackTime(this);
    };

    /************************* TIMELINE PLAYHEAD EVENT *********************/
    // makes timeline clickable
    timeline.addEventListener("click", function(event) {
        moveplayhead(event);
        media.currentTime = MediaDuration * clickPercent(event);
        second = MediaDuration * clickPercent(event);
    }, false);
    timeline_activeBar1.addEventListener("click", function(event) {
        moveplayhead(event);
        media.currentTime = MediaDuration * clickPercent_activeBar1(event);
        second = MediaDuration * clickPercent_activeBar1(event);
    }, false);
    // makes playhead draggable
    playhead.addEventListener('mousedown', mouseDown, false);
    playhead_activeBar1.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);


    if(playerPlugin.hasClass('hiddenElements')) {
        window.onmousemove = mousemoved;
        var timer;
        function mousemoved() {
            clearTimeout(timer);
            playerPlugin.fadeIn( "slow");
            if(activeBarPlugin1.length)  activeBarPlugin1.fadeIn( "slow");
            timer = setTimeout(function() {
                $('.playerPlugin').show(function() {
                    $(this).fadeOut("slow");
                    if(activeBarPlugin1.length)  activeBarPlugin1.fadeOut("slow");
                });
            }, 2500);
        }
    }




});