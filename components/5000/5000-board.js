class X5000Board extends HTMLElement {

    init() {
        this.diceContainer = document.createElement('div');
        this.commandContainer = document.createElement('div');
        this.currentScoreContainer = document.createElement('div');
        this.PlayersContainer = document.createElement('div');
    }

    constructor() {

        super();

        this.init.call(this);

        const shadow = this.attachShadow({ mode: 'open' });

        shadow.appendChild(currentScoreContainer)
    }
}

customElements.define('x-5000-board', X5000Board);
