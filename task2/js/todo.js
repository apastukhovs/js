document.body.innerHTML = '';
var speed = 5;

function addElement(color, key) {
    var player_el = document.createElement('div');
    player_el.style.backgroundColor = color;
    player_el.style.height = '100px';
    player_el.style.width = '100px';
    player_el.style.position = 'absolute';
    player_el.style.top = '0px';
    player_el.style.left = '0px';

    var keyState = {
        up: false,
        down: false,
        left: false,
        right: false
    };
    
    var position = {
       top: 0,
       left: 0  
    };
    
    document.body.appendChild(player_el);
    
    
    
    
    document.addEventListener('keydown', function(event) {
        if (event.code === key) {
            keyState.down = true;
        } else if (event.code === key) {
            keyState.up = true;
        } else if (event.code === key) {
            keyState.left = true;
        } else if (event.code === key) {
            keyState.right = true;
        }
    })
    
    document.addEventListener('keyup', function(event) {
        if (event.code === key) {
            keyState.down = false;
        } else if (event.code === key) {
            keyState.up = false;
        } else if (event.code === key) {
            keyState.left = false;
        } else if (event.code === key) {
            keyState.right = false;
        }
    })
    
    
    var actionInterval = setInterval(function() {
        if (keyState.up) {
            position.top--;
        }
    
        if (keyState.down) {
            position.top++;
        }
        
        if (keyState.left) {
            position.left--;
        }
    
        if (keyState.right) {
            position.left++;
        }
    });
    
    
    var drawInterval = setInterval(function() {
        player_el.style.top = position.top + 'px';
        player_el.style.left = position.left + 'px';
    }, (1000/30));

}


