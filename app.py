import math
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='static', static_url_path='', template_folder='templates')
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/calculate', methods=['POST'])
def calculateResult():
    data = request.get_json()
    expression = data['expression']
    try:
        result = eval(expression)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/fact', methods=['POST'])
def calculateFactorial():
    data = request.get_json()
    number = data['number']
    try:
        result = math.factorial(int(number))
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/sin', methods=['POST'])
def  calculateSin():
    data = request.get_json()
    angle = data['angle']
    try:
        result = math.sin(math.radians(float(angle))) 
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/cos', methods=['POST'])
def calculateCos():
    data = request.get_json()
    angle = data['angle']
    try:
        result = math.cos(math.radians(float(angle))) 
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/tan', methods=['POST'])
def calculateTan():
    data = request.get_json()
    angle = data['angle']
    try:
        result = math.tan(math.radians(float(angle)))  
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/sqrt', methods=['POST'])
def calculateSqrt():
    data = request.get_json()
    number = data['number']
    try:
        result = math.sqrt(number)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})
    
    
@app.route('/cube_root', methods=['POST'])
def calculateCubeRoot():
    data = request.get_json()
    number = data['number']
    try:
        result = math.pow(number, 1/3)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})   

@app.route('/log', methods=['POST'])
def calculateLog():
    data = request.get_json()
    number = data['number']
    try:
        result = math.log(number)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/pi', methods=['GET'])
def getPi():
    pi_value = math.pi
    return jsonify({'result': pi_value})


@app.route('/e', methods=['GET'])
def getE():
    return jsonify({'result': math.e})

@app.route('/power', methods=['POST'])
def calculatePower():
    data = request.get_json()
    base = data.get('base')
    exponent = data.get('exponent')
    try:
        result = math.pow(base, exponent)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/square', methods=['POST'])
def  calculateSquare():
    data = request.get_json()
    number = data.get('number')
    try:
        result = float(number) ** 2
        return jsonify({'result': result})
    except ValueError:
        return jsonify({'error': 'Veuillez entrer un nombre valide.'})
  
    
@app.route('/absolute', methods=['POST'])
def calculateAbsolute(): 
    data = request.get_json()
    number = data.get('number')
    try:
        result = abs(float(number))
        return jsonify({'result': result})
    except ValueError:
        return jsonify({'error': 'Veuillez entrer un nombre valide.'})

if __name__ == '__main__':
    app.run(debug=True)
