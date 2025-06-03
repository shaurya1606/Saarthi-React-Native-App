# app.py
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_cors import CORS
import razorpay
import os
import sqlite3 as sql
import socket



# Razorpay credentials
KEY_ID = "rzp_test_09odDMSwOWGzN1"
KEY_SECRET = "i1XFL8Z6IVgDv9Ou5Z4hbiPm"
EMAIL = "shikharmishra2505@gmail.com"
NUMBER = "8707000797"
order_status = {}

# Razorpay client setup
razorpay_client = razorpay.Client(auth=(KEY_ID, KEY_SECRET))

# Flask app
app = Flask(_name_)
app.secret_key = os.urandom(4).hex()
CORS(app)

# Database setup
db = sql.connect('Machine.db', check_same_thread=False)
MachineData = db.execute('SELECT * FROM machine').fetchall()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    machine_code = request.form.get('machine_code')
    return redirect(url_for('machine_page', machine_id=machine_code))

@app.route('/<machine_id>', methods=['GET'])
def get_machine(machine_id):
    for data in MachineData:
        if data[2] == machine_id:
            return jsonify({
                'machine_address': data[0],
                'machine_products': data[1],
                'machine_id': data[2]
            })
    return jsonify({'error': 'Machine not found'}), 404

@app.route('/machine/<machine_id>')
def machine_page(machine_id):
    return render_template('machine.html', machine_id=machine_id)

@app.route('/purchase', methods=['POST'])
def purchase():
    data = request.get_json()
    machine_id = data.get('machine_id')
    order = data.get('order')

    prices = {
        'Sanitary Pad': 6,
        'Tampon': 13,
        'Menstrual Cup': 355,
        'Pantyliner': 3,
        'Period Panty': 490
    }
    total = sum(prices[item] * qty for item, qty in order.items()) * 100

    razorpay_order = razorpay_client.order.create({
        'amount': total,
        'currency': 'INR',
        'payment_capture': 1
    })

    full_order = {
        'machine_id': machine_id,
        'items': order,
        'total': total // 100,
        'razorpay_order_id': razorpay_order['id']
    }

    # Save to session for front-end
    session['order'] = full_order

    # Also update backend status for Tkinter polling
    order_status[machine_id] = {
        'confirmed': False,
        'order': order,
        'ip': request.remote_addr,
        'vending': 'pending'
    }

    return jsonify({
        'order': full_order,
        'key_id': KEY_ID
    })


@app.route('/payment')
def payment():
    order = session.get('order')
    if not order:
        return "No order found", 400

    return render_template('Pay.html', order=order, key_id=KEY_ID)


@app.route('/confirm_payment', methods=['POST'])
def confirm_payment():
    order = session.pop('order', None)
    if not order:
        return jsonify({'error': 'No active order'}), 400

    machine_id = order.get('machine_id')
    if machine_id in order_status:
        order_status[machine_id]['confirmed'] = True
        order_status[machine_id]['vending'] = 'in_progress'

    return jsonify({'message': 'Payment confirmed'})

@app.route('/vending_done/<machine_id>', methods=['POST'])
def vending_done(machine_id):
    if machine_id in order_status:
        order_status[machine_id]['vending'] = 'completed'
        return jsonify({'message': 'Vending marked as completed'})
    return jsonify({'error': 'Machine not found'}), 404


@app.route('/status/<machine_id>', methods=['GET'])
def get_status(machine_id):
    status = order_status.get(machine_id, {})
    return jsonify(status)

@app.route('/update_status', methods=['POST'])
def update_status():
    data = request.get_json()
    machine_id = data.get('machine_id')
    order = data.get('order')
    confirmed = data.get('confirmed', False)
    vending = data.get('vending', 'pending')

    ip = request.remote_addr or socket.gethostbyname(socket.gethostname())

    order_status[machine_id] = {
        'confirmed': confirmed,
        'order': order,
        'ip': ip,
        'vending': vending
    }
    return jsonify({'message': 'Status updated'})



if _name_ == '_main_':
    app.run(debug=True, host='0.0.0.0', port=5000)