from twilio.rest import Client
import os
from dotenv import load_dotenv

load_dotenv()

account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_WHATSAPP_NUMBER")

client = Client(account_sid, auth_token)

def enviar_codigo_whatsapp(celular, codigo):
    message = client.messages.create(
        body=f"Seu código de ativação é: {codigo}",
        from_=twilio_number,
        to=f"whatsapp:{celular}"
    )
    print("Mensagem enviada! SID:", message.sid)
    return message.sid