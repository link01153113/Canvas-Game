let start = document.querySelector('#startScreen');

let ex = 10;
function swing(element) {

    function update(time) {
        
        const x = Math.sin(time / 1231) * ex;
        const y = Math.sin(time / 1458) * ex;

        element.style.transform = [
            `rotateX(${x}deg)`,
            `rotateY(${y}deg)`
        ].join(' ');

        requestAnimationFrame(update);
    }
    update(0);
}

swing(start);

let button = start.querySelector('a');

// Reference: https://codepen.io/nodws/pen/aVBoVp