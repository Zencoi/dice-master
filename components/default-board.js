class XDefaultBoard extends HTMLElement {

    init() {
        this.addDice = this.addDice.bind(this);
        this.removeDice = this.removeDice.bind(this);
        this.rollAll = this.rollAll.bind(this);
        this.refreshScore = this.refreshScore.bind(this);
        this.total = 0;

        this.scoreContainer = document.createElement('div');
        this.diceContainers = document.createElement('div');
        this.commandContainer = document.createElement('div');

        for (let i = 0; i < 5; i++) { this.addDice(); }
        this.refreshScore();
    }

    addDice() {
        const dice = document.createElement('x-dice');
        const self = this;
        dice.addEventListener('onDiceRolled', function (value) {
            self.refreshScore();
        });
        this.diceContainers.appendChild(dice);
        this.refreshScore();
    }

    removeDice() {
        if (this.diceContainers.lastChild == null) return;
        this.diceContainers.removeChild(this.diceContainers.lastChild);
        this.refreshScore();
    }

    rollAll() {
        [].forEach.call(this.diceContainers.children, dice => dice.roll());
    }

    refreshScore() {
        let total = 0;
        [].forEach.call(this.diceContainers.children, dice => total += dice.value);
        if (this.scoreContainer.firstChild != null) this.scoreContainer.removeChild(this.scoreContainer.firstChild);
        this.scoreContainer.appendChild(document.createTextNode(total));
    }

    constructor() {

        super();

        this.init.call(this);

        const shadow = this.attachShadow({ mode: 'open' });
        const gameBoard = document.createElement('div');

        const addButton = document.createElement('button');
        addButton.setAttribute('type', 'button');
        addButton.appendChild(document.createTextNode('+'));
        addButton.onclick = this.addDice;

        const removeButton = document.createElement('button');
        removeButton.setAttribute('type', 'button');
        removeButton.appendChild(document.createTextNode('-'));
        removeButton.onclick = this.removeDice;

        const rollAllButton = document.createElement('button');
        rollAllButton.setAttribute('type', 'button');
        rollAllButton.appendChild(document.createTextNode('Lancer'));
        rollAllButton.onclick = this.rollAll;

        this.commandContainer.appendChild(addButton);
        this.commandContainer.appendChild(rollAllButton);
        this.commandContainer.appendChild(removeButton);
        this.commandContainer.classList.add('command-container');

        this.scoreContainer.classList.add('score-container');

        this.diceContainers.classList.add('dice-containers');

        let style = document.createElement('style');
        style.textContent = `
            .command-container {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                text-align: center;
                font-size: 50px;
            }
            .command-container button {
                margin: 10px;
                font-size: 40px;
                padding: 20px;
            }
            .score-container {
                text-align: center;
                font-size: 100px;
            }
            .dice-containers {
                text-align: center;
            }`;

        gameBoard.appendChild(this.scoreContainer);
        gameBoard.appendChild(this.diceContainers);
        gameBoard.appendChild(this.commandContainer);

        shadow.appendChild(gameBoard);
        shadow.appendChild(style);
    }
}

customElements.define('x-default-board', XDefaultBoard);
