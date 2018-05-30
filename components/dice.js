
class XDice extends HTMLElement {
    init() {
        this.minValue = this.getAttribute('min') || 1;
        this.maxValue = this.getAttribute('max') || 6;
        this.size = this.getAttribute('size') || 100;
        this.value = 1;
        this.wrapper = document.createElement('div');
        this.onDiceRolledEvent = new CustomEvent('onDiceRolled', {
            detail: this.value
        });
        this.roll = this.roll.bind(this);
        this.updateWrapper = this.updateWrapper.bind(this);
    }
    
    updateWrapper(value) {
        if(this.wrapper.firstChild) this.wrapper.removeChild(this.wrapper.firstChild);
        this.wrapper.appendChild(document.createTextNode(value));
    }

    roll() {
        if (this.isRolling) return;
        this.isRolling = true;
        var count = 10;
        var oldRandom = 0;
        var animationId = setInterval(function () {
            var random = 0;
            while (oldRandom == random || random == 0) {
                random = Math.ceil(Math.random() * (this.maxValue - parseInt(this.minValue, 10))) + parseInt(this.minValue, 10);
            }
            oldRandom = random;

            this.updateWrapper(random);

            count--;
            if (count > 0) return;
            
            this.isRolling = false;
            this.value = random;
            if (this.onDiceRolledEvent != null) {
                this.dispatchEvent(this.onDiceRolledEvent);
            } 
            clearInterval(animationId);
        }.bind(this), 100);
    }

    constructor() {
        super();

        this.init.call(this);

        var shadow = this.attachShadow({ mode: 'open' });
        
        this.wrapper.classList.add('wrapper');

        this.wrapper.appendChild(document.createTextNode(this.minValue));
        this.wrapper.addEventListener('click', this.roll);

        var style = document.createElement('style');
        style.textContent = `
            .wrapper {
                display: inline-block;
                border: 2px black solid;
                border-radius: 5px;
                height: ${this.size}px;
                width: ${this.size}px;
                line-height: ${this.size}px;
                text-align: center;
                font-size: 50px;
                margin: 5px;
            }`;

        shadow.appendChild(this.wrapper);
        shadow.appendChild(style);
    }
}

customElements.define('x-dice', XDice);
