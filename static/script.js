// ici j'ai fais les appels des toutes les fonctions(routes) definies dans mon serveur flask.
// et la gestion des erreurs.
function appendToScreen(value) {document.getElementById('screen').value += value;}

function clearScreen() {document.getElementById('screen').value = '';}

function backspc() {let screen = document.getElementById('screen');
    if (screen.value.length > 0) {screen.value = screen.value.substr(0, screen.value.length - 1);}}

function showHistory() {let history = localStorage.getItem('calculatorHistory');
    if (history) {
        history = JSON.parse(history);
        let historyString = '<h2>HISTORIQUE DES OPERATIONS</h2><ul>';
        history.forEach(operation => {historyString += '<li>' + operation + '</li>';
        });historyString += '</ul>';
document.getElementById('history').innerHTML = historyString;
    } else {document.getElementById('history').innerHTML = '<p>Aucune opération récente.</p>';}}


function calculateResult() {const expression = document.getElementById('screen').value;
    fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },body: JSON.stringify({ 'expression': expression })
    }).then(response => {
            if (!response.ok) { document.getElementById('screen').value = "Syntax ERROR";}
            return response.json();
        }).then(data => {
            if (data.error) {
                document.getElementById('screen').value = "Syntax ERROR";
            } else {document.getElementById('screen').value = data.result;
                let history = localStorage.getItem('calculatorHistory');if (!history) {history = [];} 
                else {history = JSON.parse(history);}history.push(expression + ' = ' + data.result);localStorage.setItem('calculatorHistory', JSON.stringify(history));
            }}).catch(error => {console.error('Error:', error);
            document.getElementById('screen').value = "Syntax ERROR";});}


function calculateFactorial() {
    let number = document.getElementById('screen').value;
    fetch('http://localhost:5000/fact', {
        method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({ 'number': number })}).then(response => {if (!response.ok) 
            {document.getElementById('screen').value = "Syntax ERROR";}return response.json();
        }).then(data => {if (data.error) {alert(data.error);
            } else {document.getElementById('screen').value = data.result;}}).catch(error => {
            console.error('Error:', error);
            document.getElementById('screen').value = "Syntax ERROR";
        });
}

function calculateSin() {
    let angleStr = document.getElementById('screen').value;
    if (angleStr.trim() === '') {document.getElementById('screen').value = "Syntax ERROR";
        return;}let angle = parseFloat(angleStr);
    if (!isNaN(angle)) {
        fetch('http://localhost:5000/sin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'
            },body: JSON.stringify({ 'angle': angle })}).then(response => {
                if (!response.ok) {
                    document.getElementById('screen').value = "Syntax ERROR";}return response.json();})
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    document.getElementById('screen').value = data.result;}})
            .catch(error => {console.error('Error:', error);document.getElementById('screen').value = "Syntax ERROR";});
    } else {
        document.getElementById('screen').value = "Syntax ERROR";
    }
}


function calculateCos() {
    let angleStr = document.getElementById('screen').value;
    if (angleStr.trim() === '' || isNaN(angleStr.trim())) {
        document.getElementById('screen').value = "Syntax ERROR";
        return;
    }let angle = parseFloat(angleStr);
    fetch('http://localhost:5000/cos', {
        method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({ 'angle': angle })
    }).then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données du serveur.');
            }return response.json();
        }).then(data => {
            if (data.error) {
                document.getElementById('screen').value = "Syntax ERROR";
            } else {
                document.getElementById('screen').value = data.result;}
        }).catch(error => {console.error('Error:', error);
            document.getElementById('screen').value = "Syntax ERROR";});}

function calculateTan() {
    let angleStr = document.getElementById('screen').value;
    if (angleStr.trim() === '' || isNaN(angleStr.trim())) {
        document.getElementById('screen').value = "Syntax ERROR";
        return;}let angle = parseFloat(angleStr);
    fetch('http://localhost:5000/tan', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },body: JSON.stringify({ 'angle': angle })
    }).then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données du serveur.');
            }  return response.json();
        }).then(data => {if (data.error) {
                document.getElementById('screen').value = "Syntax ERROR";
            } else {document.getElementById('screen').value = data.result;
            }}).catch(error => {
            console.error('Error:', error);
            document.getElementById('screen').value = "Syntax ERROR"; });
}


function calculateSqrt() {
    let number = parseFloat(document.getElementById('screen').value);
    fetch('http://localhost:5000/sqrt', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },body: JSON.stringify({ 'number': number })
    }).then(response => {
            if (!response.ok) {document.getElementById('screen').value = "Syntax ERROR";
            }return response.json();
        }).then(data => {
            if (data.error) {alert(data.error);
            } else {
                document.getElementById('screen').value = data.result; }}).catch(error => {
            console.error('Error:', error);
            document.getElementById('screen').value = "Syntax ERROR";});
}


function calculateCubeRoot() {
    let number = parseFloat(document.getElementById('screen').value);
    if (!isNaN(number)) {
        fetch('http://localhost:5000/cube_root', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'
            },body: JSON.stringify({ 'number': number })
        }).then(response => {
                if (!response.ok) {
                    document.getElementById('screen').value = "Syntax ERROR";
                }return response.json();
            }).then(data => {if (data.error) {
                    document.getElementById('screen').value = "Syntax ERROR";
                } else {
                    document.getElementById('screen').value = data.result;}
            }).catch(error => {
                console.error('Error:', error);
                document.getElementById('screen').value = "Syntax ERROR";
            });} else {document.getElementById('screen').value = "Syntax ERROR";
    }
}



// Fonction pour calculer le logarithme
function calculateLog() {
    let number = document.getElementById('screen').value;
    fetch('http://localhost:5000/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},body: JSON.stringify({ 'number': number })}).then(response => {
            if (!response.ok) {document.getElementById('screen').value = "Syntax ERROR";
            } return response.json();
        }).then(data => {
            if (data.error) {
                alert(data.error);
            } else {document.getElementById('screen').value = data.result; }
        }).catch(error => {
            console.error('Error:', error);
            document.getElementById('screen').value = "Syntax ERROR";});
}


function getPi() {
    fetch('http://localhost:5000/pi', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'}
    }).then(response => {
            if (!response.ok) {document.getElementById('screen').value = "Syntax ERROR";
            }return response.json();
        }) .then(data => {document.getElementById('screen').value = data.result;
        }).catch(error => {console.error('Error:', error);
            document.getElementById('screen').value = "Syntax ERROR";});
}


function getE() {
    fetch('http://localhost:5000/e', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }}).then(response => {
            if (!response.ok) {
                document.getElementById('screen').value = "Syntax ERROR";
            }return response.json();
        }).then(data => {
            document.getElementById('screen').value += data.result;
        }).catch(error => {console.error('Error:', error);
            document.getElementById('screen').value = "Syntax ERROR";});
}

function calculaSquare() {
    let number = parseFloat(document.getElementById('screen').value);
    if (!isNaN(number)) {
        let result = number * number;
        document.getElementById('screen').value = result;
    } else {
        alert('Veuillez entrer un nombre valide.');
    }
}

function calculateAbsolute() {
    let number = document.getElementById('screen').value;

    fetch('http://localhost:5000/absolute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'number': number })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données du serveur.');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('screen').value = data.result;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Une erreur est survenue lors du calcul de la valeur absolue.');
    });
}





