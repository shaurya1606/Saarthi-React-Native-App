import tkinter as tk
from tkinter import ttk
import qrcode
from PIL import Image, ImageTk
import requests

baseUrl = "http://10.12.0.17:5000"
machineId = "MN-011"
statusUrl = f"{baseUrl}/status/{machineId}"
machineUrl = f"{baseUrl}/machine/{machineId}"

class QRApp(tk.Tk):
    def __init__(self):
        super().__init__()

        self.last_order = None
        self.last_ip = None

        self.title("QR Code Viewer")
        self.geometry("400x600")
        self.configure(bg="white")

        # Main frame
        self.container = ttk.Frame(self, padding=10, style="Main.TFrame")
        self.container.pack(fill="both", expand=True)

        # QR Code area
        self.qr_label = ttk.Label(self.container, background="white", anchor="center")
        self.qr_label.pack(pady=(10, 10), expand=True)

        # URL display
        self.url_label = ttk.Label(
            self.container,
            text=machineUrl,
            background="white",
            font=("Arial", 10, "italic"),
            anchor="center",
            wraplength=380
        )
        self.url_label.pack(pady=(0, 10))

        # Status label
        self.status_label = ttk.Label(
            self.container,
            text="Waiting for scan...",
            background="white",
            font=("Arial", 12, "bold"),
            anchor="center"
        )
        self.status_label.pack(pady=(0, 10))

        # Order box inside a frame with scrollbar
        order_frame = ttk.Frame(self.container)
        order_frame.pack(fill="both", expand=True, padx=5, pady=(0, 10))

        self.order_box = tk.Text(order_frame, height=8, wrap="word", font=("Arial", 10))
        self.order_box.pack(side="left", fill="both", expand=True)

        scrollbar = ttk.Scrollbar(order_frame, command=self.order_box.yview)
        scrollbar.pack(side="right", fill="y")
        self.order_box.config(yscrollcommand=scrollbar.set)

        self.order_box.insert("1.0", "Order details will appear here...")
        self.order_box.config(state="disabled")

        self.bind("<Configure>", self.on_resize)
        self.qr_image = None
        self.render_qr(250)

        self.poll_payment_status()

        self.apply_styles()

    def apply_styles(self):
        style = ttk.Style()
        style.theme_use("default")
        style.configure("TLabel", background="white")
        style.configure("Main.TFrame", background="white")

    def render_qr(self, size):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=2,
        )
        qr.add_data(machineUrl)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
        img = img.resize((size, size), Image.Resampling.LANCZOS)
        self.qr_image = ImageTk.PhotoImage(img)
        self.qr_label.config(image=self.qr_image)

    def on_resize(self, event):
        size = min(event.width, event.height - 250)
        if size > 100:
            self.render_qr(size)

    def poll_payment_status(self):
        try:
            response = requests.get(statusUrl, timeout=5)
            if response.status_code == 200:
                data = response.json()
                confirmed = data.get('confirmed')
                order = data.get('order')
                ip = data.get('ip', 'Unknown IP')
                vending = data.get('vending', 'pending')

                # Refresh UI only when order or IP changes
                if order != self.last_order or ip != self.last_ip:
                    self.clear_ui()
                    self.last_order = order
                    self.last_ip = ip

                if order:
                    self.display_order(order, ip)

                    if vending == "in_progress":
                        self.status_label.config(text="🔄 Vending in progress...", foreground="orange")
                    elif vending == "completed":
                        self.status_label.config(text="✅ Vending completed!", foreground="green")
                        self.after(4000, self.reset_ui)
                    elif confirmed:
                        self.status_label.config(text="✅ Payment Confirmed! Starting vending...", foreground="blue")
                    else:
                        self.status_label.config(text="🛒 Order Placed. Awaiting Payment...", foreground="black")
                else:
                    self.status_label.config(text="⏳ Waiting for user to place an order...", foreground="gray")
            else:
                self.status_label.config(text="⚠ Error contacting server", foreground="red")
        except requests.RequestException as e:
            self.status_label.config(text=f"❌ Network error: {e}", foreground="red")

        self.after(3000, self.poll_payment_status)

    def display_order(self, order, ip):
        items = order.get('items', {})
        total = order.get('total', 0)
        text = f"📡 Device IP: {ip}\n\n🧾 Order Summary:\n"
        for item, qty in items.items():
            text += f" • {item}: {qty}\n"
        text += f"\n💰 Total: ₹{total}"

        self.order_box.config(state="normal")
        self.order_box.delete("1.0", "end")
        self.order_box.insert("1.0", text)
        self.order_box.config(state="disabled")


    def clear_ui(self):
        self.order_box.config(state="normal")
        self.order_box.delete("1.0", "end")
        self.order_box.insert("1.0", "Order details will appear here...")
        self.order_box.config(state="disabled")

    def reset_ui(self):
        self.status_label.config(text="Waiting for scan...")
        self.clear_ui()
        self.last_order = None
        self.last_ip = None


if __name__ == "__main__":
    app = QRApp()
    app.mainloop()