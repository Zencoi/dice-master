class XPlayerTab extends HTMLElement {

    init() {
        this.playerNameDiv = document.createElement('div');
        this.playerNameDiv.classList.add('player-name-container');
        this.scoreDiv = document.createElement('div');
        this.scoreDiv.classList.add('score-container');
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('player-tab-container');

        this.setPlayerName('Player 1');
        this.setScore(1550);
    }

    setPlayerName(playerName) {
        if (playerName == this.playerName) return;
        this.playerName = playerName;
        if (this.playerNameDiv.FirstChild) this.playerNameDiv.removeChild(this.playerNameDiv.FirstChild);
        this.playerNameDiv.appendChild(document.createTextNode(this.playerName));
    }

    setScore(score) {
        if (score == this.score) return;
        this.score = score;
        if (this.scoreDiv.FirstChild) this.scoreDiv.removeChild(this.scoreDiv.FirstChild);
        this.scoreDiv.appendChild(document.createTextNode(this.score));
    }

    setIsActivePlayer(isActivePlayer) {
        if (isActivePlayer == this.isActivePlayer) return;
        this.isActivePlayer = isActivePlayer;
        if(this.isActivePlayer)
            this.playerNameDiv.classList.add('active-player');
        else
            this.playerNameDiv.classList.remove('active-player');
    }

    constructor() {
        super();

        this.init.call(this);

        const shadow = this.attachShadow({ mode: 'open' });

        let style = document.createElement('style');
        style.textContent = `
            .player-tab-container {
                text-align: center;
            }
            .player-name-container {
                font-size: 16px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .score-container {
                font-size: 30px;
            }
            .player-tab-container.active-player .score-container {
                font-size: 40px;
            }
            .player-tab-container.active-player .player-name-container {
                font-size: 20px;
            }`;
        
        this.wrapper.appendChild(this.playerNameDiv);
        this.wrapper.appendChild(this.scoreDiv);
        shadow.appendChild(this.wrapper);
        shadow.appendChild(style);
    }
}

customElements.define('x-player-tab', XPlayerTab);
