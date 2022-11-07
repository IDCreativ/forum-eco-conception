import { QUESTION_STATUS_API } from "../../config";
import axios from "axios";

const moduleStatus = function (status) {
	console.log("changeModuleStatus");
	var statusReceived = JSON.parse(status);
	if (document.getElementById("nav-" + statusReceived.moduleSlug + "-tab")) {
		if (statusReceived.moduleStatus == true) {
			document.querySelectorAll(".tab-pane").forEach(function (item) {
				item.classList.remove("show");
				item.classList.remove("active");
			});
			var allTabs = document
				.querySelectorAll(".nav-block")
				.forEach(function (item) {
					item.classList.remove("active");
				});
			document.getElementById(
				"nav-" + statusReceived.moduleSlug + "-tab"
			).style.display = "flex";
			document
				.getElementById("nav-" + statusReceived.moduleSlug + "-tab")
				.classList.add("active");
			document
				.getElementById("nav-" + statusReceived.moduleSlug)
				.classList.add("show");
			document
				.getElementById("nav-" + statusReceived.moduleSlug)
				.classList.add("active");
		} else {
			document.querySelectorAll(".tab-pane").forEach(function (item) {
				item.classList.remove("show");
				item.classList.remove("active");
			});
			document.getElementById(
				"nav-" + statusReceived.moduleSlug + "-tab"
			).style.display = "none";
			var allTabs = document
				.querySelectorAll(".nav-block")
				.forEach(function (item) {
					item.classList.remove("active");
				});
			document.getElementById("nav-programme").classList.add("show");
			document.getElementById("nav-programme").classList.add("active");
			document.getElementById("nav-programme-tab").classList.add("active");
		}
	}
};

const videoStatus = function(videoStatus) {
    console.log('changeVideoStatus');
    var videoStatusReceived = JSON.parse(videoStatus);
    console.table(videoStatusReceived);
    var createdEventReceiver = document.getElementById('js-live-container');
    if (videoStatusReceived.eventStatus ==  true && videoStatusReceived.videoStatus == true && videoStatusReceived.eventVideo == videoStatusReceived.videoID) {
        console.log('La vidéo passe à true')
        createdEventReceiver.innerHTML =  `
            <div id="video-${videoStatusReceived.eventVideo}" class="video-container" data-ytid="${videoStatusReceived.youtubeId}">
                <div id="code-video-${videoStatusReceived.eventVideo}" class="embed-responsive embed-responsive-16by9">
                    ${videoStatusReceived.videoEmbeded}
                </div>
            </div>
        `;
    }
    else if (videoStatusReceived.eventStatus ==  true && videoStatusReceived.videoStatus == false && videoStatusReceived.videoPosition < videoStatusReceived.eventVideoPosition) {
        console.log('La vidéo passe à false. On passe sur une autre vidéo');
        createdEventReceiver.innerHTML =  `
            <div id="video-${videoStatusReceived.eventVideo}" class="video-container" data-ytid="${videoStatusReceived.youtubeId}">
                <div id="code-video-${videoStatusReceived.eventVideo}" class="embed-responsive embed-responsive-16by9">
                    ${videoStatusReceived.videoEmbeded}
                </div>
            </div>
        `;
    }
    else if (videoStatusReceived.eventVideo == false) {
        console.log('Y\'a plus de vidéos pour cet événement.');
        createdEventReceiver.innerHTML =  `
            <div class="waiting-block">
                <div id="disclaimer" class="alert alert-danger text-center" role="alert">
                    De retour prochainement.
                </div>
                <img src="img/waiting-bg.jpg" alt="">
            </div>
        `;
    }
    else {
        console.log('Tous les autres cas');
    }
}

const eventStatus = function(eventStatus) {
    console.log('changeEventStatus');
    var eventStatusReceived = JSON.parse(eventStatus);
    console.table(eventStatusReceived);
    if (eventStatusReceived.eventStatus == true && eventStatusReceived.eventEmbeded) {
        document.getElementById('fieldset-qr').disabled = false;
        console.log('L\'événement passe à true')
        var createdEventReceiver = document.getElementById('js-live-container');
        createdEventReceiver.innerHTML =  `
            <div id="video-${eventStatusReceived.videoID}" class="video-container" data-ytid="${eventStatusReceived.youtubeId}">
                <div id="code-video-${eventStatusReceived.videoID}" class="embed-responsive embed-responsive-16by9">
                    ${eventStatusReceived.eventEmbeded}
                </div>
            </div>
        `;
    }
    else if (eventStatusReceived.eventStatus == false) {
        document.getElementById('fieldset-qr').disabled = true;
        console.log('L\'événement passe à false')
        var createdEventReceiver = document.getElementById('js-live-container');
        createdEventReceiver.innerHTML =  `
            <div class="waiting-block">
                <div id="disclaimer" class="alert alert-danger text-center" role="alert">
                    De retour prochainement.
                </div>
                <img src="img/waiting-bg.jpg" alt="">
            </div>
        `;
    }
    else {
        console.log('L\'événement passe à '+eventStatusReceived.eventStatus)
        if (eventStatusReceived == true) {
            document.getElementById('fieldset-qr').disabled = false;
        }
        else {
            document.getElementById('fieldset-qr').disabled = true;
        }
        var createdEventReceiver = document.getElementById('js-live-container');
        createdEventReceiver.innerHTML =  `
            <div class="waiting-block">
                <div id="disclaimer" class="alert alert-danger text-center" role="alert">
                    De retour prochainement.
                </div>
                <img src="img/waiting-bg.jpg" alt="">
            </div>
        `;
    }
}

const pollStatus = function(pollStatus) {
    console.log('changePollStatus');
    pollStatusReceived = JSON.parse(pollStatus);
    if (pollStatusReceived.pollStatus == true) {
        document.getElementById('fieldset-'+pollStatusReceived.pollID).disabled = false;
        document.getElementById('poll-overlay-'+pollStatusReceived.pollID).classList.remove('active');
    }
    else {
        document.getElementById('fieldset-'+pollStatusReceived.pollID).disabled = true;
        document.getElementById('poll-overlay-'+pollStatusReceived.pollID).classList.add('active');
    }
}

export default {
    moduleStatus: moduleStatus,
    videoStatus: videoStatus,
    eventStatus: eventStatus,
    pollStatus: pollStatus
}
