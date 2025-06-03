import tkinter as tk
from tkinter import messagebox, ttk
import requests
from requests.auth import HTTPBasicAuth
import qrcode
from PIL import ImageTk
import time
import threading
import sqlite3
from datetime import datetime
import winsound
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt
import os
from dotenv import load_dotenv

# Razorpay API credentials
load_dotenv()
KEY_ID = os.getenv("KEY_ID")
KEY_SECRET = os.getenv("KEY_SECRET")
EMAIL = os.getenv("EMAIL")
NUMBER = os.getenv("NUMBER")

# Product list (name, price in INR)
PRODUCTS = [
    ("Tampoons", 10),
    ("Menstrual Cup", 20),
    ("Pads", 30),
    ("Wipes", 50)
]

ADMIN_PASSWORD = "admin123"

class PaymentApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Saarthi Payment UI")
        self.link_id = None
        self.timer_thread = None

        self.selected_product = tk.StringVar()
        self.time_left = tk.IntVar(value=60)

        self.init_db()

        # UI Elements
        tk.Label(root, text="Select Product", font=("Arial", 14)).pack(pady=5)
        self.product_menu = ttk.Combobox(root, textvariable=self.selected_product, values=[f"{p[0]} - ₹{p[1]}" for p in PRODUCTS], state="readonly")
        self.product_menu.pack(pady=5)
        self.product_menu.current(0)

        self.pay_button = tk.Button(root, text="Proceed to Pay", command=self.start_payment)
        self.pay_button.pack(pady=10)

        self.qr_canvas = tk.Label(root)
        self.qr_canvas.pack(pady=10)

        self.status_label = tk.Label(root, text="Status: Waiting", font=("Arial", 12))
        self.status_label.pack(pady=5)

        self.timer_label = tk.Label(root, text="Time Left: 120s", font=("Arial", 12))
        self.timer_label.pack(pady=5)

        self.history_button = tk.Button(root, text="View Transaction History", command=self.show_history)
        self.history_button.pack(pady=10)

        self.analytics_button = tk.Button(root, text="Admin Dashboard", command=self.admin_login)
        self.analytics_button.pack(pady=10)

    def init_db(self):
        self.conn = sqlite3.connect("transactions.db", check_same_thread=False)
        self.cursor = self.conn.cursor()
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                product_name TEXT NOT NULL,
                price INTEGER NOT NULL
            )
        ''')
        self.conn.commit()

    def start_payment(self):
        product_index = self.product_menu.current()
        product_name, price = PRODUCTS[product_index]
        amount_paise = price * 100

        self.status_label.config(text="Status: Creating Payment Link...")
        data = {
            "amount": amount_paise,
            "currency": "INR",
            "description": f"{product_name}",
            "customer": {
                "name": "Shaurya Srivastava",
                "email": "shikharmishra2505@gmail.com",
                "contact": "8707000797"
            }
        }

        response = requests.post(
            "https://api.razorpay.com/v1/payment_links",
            json=data,
            auth=HTTPBasicAuth(KEY_ID, KEY_SECRET)
        )

        if response.status_code == 200:
            result = response.json()
            self.link_id = result['id']
            short_url = result['short_url']
            self.status_label.config(text="Status: Waiting for Payment")
            self.show_qr(short_url)
            threading.Thread(target=self.poll_payment_status, args=(product_name, price)).start()
            self.time_left.set(120)
            self.timer_thread = threading.Thread(target=self.countdown_timer)
            self.timer_thread.start()
        else:
            messagebox.showerror("Error", "Failed to create payment link")

    def show_qr(self, url):
        qr_img = qrcode.make(url)
        qr_img = qr_img.resize((200, 200))
        qr_tk = ImageTk.PhotoImage(qr_img)
        self.qr_canvas.config(image=qr_tk)
        self.qr_canvas.image = qr_tk

    def countdown_timer(self):
        def update_ui():
            if self.status_label.cget("text") == "✅ Payment Successful!":
                # Reset UI after short delay on payment success
                self.root.after(2000, self.redirect_home)
                return
            time_left = self.time_left.get()
            if time_left > 0:
                self.timer_label.config(text=f"Time Left: {time_left}s")
                self.time_left.set(time_left - 1)
                self.root.after(1000, update_ui)
            else:
                if self.status_label.cget("text") != "✅ Payment Successful!":
                    self.status_label.config(text="⏰ Payment Timed Out")
                    self.qr_canvas.config(image='')
                    messagebox.showwarning("Timeout", "Payment not completed in time.")
                    self.redirect_home()
        self.root.after(0, update_ui)

    def poll_payment_status(self, product_name, price):
        while self.time_left.get() > 0:
            url = f"https://api.razorpay.com/v1/payment_links/{self.link_id}"
            response = requests.get(url, auth=HTTPBasicAuth(KEY_ID, KEY_SECRET))
            status = response.json().get("status", "unknown")
            if status == "paid":
                self.status_label.config(text="✅ Payment Successful!")
                winsound.MessageBeep()
                messagebox.showinfo("Success", "Payment Received!")
                self.log_transaction(product_name, price)
                self.trigger_led()
                break
            time.sleep(5)

    def trigger_led(self):
        print("🔔 Simulated LED Trigger")

    def redirect_home(self):
            self.status_label.config(text="Status: Waiting")
            self.qr_canvas.config(image='')
            self.time_left.set(120)
            self.timer_label.config(text="Time Left: 120s")

    def log_transaction(self, product_name, price):
        conn = sqlite3.connect("transactions.db")
        cursor = conn.cursor()
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cursor.execute("INSERT INTO transactions (timestamp, product_name, price) VALUES (?, ?, ?)",
                    (timestamp, product_name, price))
        conn.commit()
        conn.close()

    def show_history(self):
        history_window = tk.Toplevel(self.root)
        history_window.title("Transaction History")
        history_window.geometry("500x400")

        filter_frame = tk.Frame(history_window)
        filter_frame.pack(pady=5)

        tk.Label(filter_frame, text="Product:").pack(side=tk.LEFT, padx=5)
        product_filter = ttk.Combobox(filter_frame, values=["All"] + [p[0] for p in PRODUCTS], state="readonly")
        product_filter.set("All")
        product_filter.pack(side=tk.LEFT)

        tree = ttk.Treeview(history_window, columns=("Timestamp", "Product", "Price"), show='headings')
        tree.heading("Timestamp", text="Timestamp")
        tree.heading("Product", text="Product")
        tree.heading("Price", text="Price")

        tree.pack(expand=True, fill='both', padx=10, pady=10)

        def load_history():
            tree.delete(*tree.get_children())
            product = product_filter.get()
            query = "SELECT timestamp, product_name, price FROM transactions"
            if product != "All":
                query += f" WHERE product_name = '{product}'"
            query += " ORDER BY id DESC"
            for row in self.cursor.execute(query):
                tree.insert("", "end", values=row)

        def export_csv():
            import csv
            with open("transactions_export.csv", "w", newline="") as f:
                writer = csv.writer(f)
                writer.writerow(["Timestamp", "Product", "Price"])
                for row in self.cursor.execute("SELECT timestamp, product_name, price FROM transactions"):
                    writer.writerow(row)
            messagebox.showinfo("Exported", "Transaction history exported to transactions_export.csv")

        product_filter.bind("<<ComboboxSelected>>", lambda _: load_history())
        tk.Button(history_window, text="Export to CSV", command=export_csv).pack(pady=5)

        load_history()

    def admin_login(self):
        login = tk.Toplevel(self.root)
        login.title("Admin Login")
        login.geometry("300x150")

        tk.Label(login, text="Enter Admin Password:").pack(pady=10)
        pwd_entry = tk.Entry(login, show="*")
        pwd_entry.pack(pady=5)

        def verify():
            if pwd_entry.get() == ADMIN_PASSWORD:
                login.destroy()
                self.show_analytics()
            else:
                messagebox.showerror("Denied", "Incorrect Password")

        tk.Button(login, text="Login", command=verify).pack(pady=10)

    def show_analytics(self):
        analytics_window = tk.Toplevel(self.root)
        analytics_window.title("Admin Dashboard")
        analytics_window.geometry("600x400")

        self.cursor.execute("SELECT COUNT(*), SUM(price) FROM transactions")
        count, total = self.cursor.fetchone()
        count = count or 0
        total = total or 0

        tk.Label(analytics_window, text=f"Total Transactions: {count}", font=("Arial", 12)).pack(pady=5)
        tk.Label(analytics_window, text=f"Total Revenue: ₹{total}", font=("Arial", 12)).pack(pady=5)

        fig, ax = plt.subplots(figsize=(5, 3))
        self.cursor.execute("SELECT product_name, COUNT(*) FROM transactions GROUP BY product_name")
        product_data = self.cursor.fetchall()
        names = [x[0] for x in product_data]
        values = [x[1] for x in product_data]

        ax.pie(values, labels=names, autopct='%1.1f%%')
        ax.set_title("Product Share")

        canvas = FigureCanvasTkAgg(fig, master=analytics_window)
        canvas.draw()
        canvas.get_tk_widget().pack()

        def export_analytics():
            import csv
            with open("analytics_export.csv", "w", newline="") as f:
                writer = csv.writer(f)
                writer.writerow(["Product", "Sold"])
                for name, qty in product_data:
                    writer.writerow([name, qty])
            messagebox.showinfo("Exported", "Analytics exported to analytics_export.csv")

        tk.Button(analytics_window, text="Export Analytics to CSV", command=export_analytics).pack(pady=10)

if __name__ == '__main__':
    root = tk.Tk()
    root.geometry("350x550")
    root.configure(bg="#f2f2f2")
    app = PaymentApp(root)
    root.mainloop()
