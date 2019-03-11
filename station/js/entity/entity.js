function AirSession() {
	this.sessionId = "";
	this.sessionIndex = 0;
	this.sessionState = SESSION_STATE_IDLE;

	this.mediaState = MEDIA_STATE_IDLE;
	this.mediaSpeaker = null;

	this.lock = 0;
}