'''
@author: Lincunia
'''
from flask import Flask, request
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os, variables

app=Flask(__name__)

@app.route('/')
def begin():
    test=os.environ.get('TEST')
    return test

@app.route('/sms', methods=['GET', 'POST'])
def sms():
    try:
        # Find your Account SID and Auth Token at twilio.com/console
        # and set the environment variables. See http://twil.io/secure
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']

        account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
        auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
        client = Client(account_sid, auth_token)
        content=request.args.get('message')
        destination=request.args.get('phone')

        message = client.messages \
                .create(
                        body=content,
                        from_='+15095162162',
                        to='+57'+destination
                        )

        print(message.sid)
        return f'Enviado correctamente hacia {destination}'
    except Exception as e:
        return 'Error al enviar el mensaje '+e

@app.route('/email_send', methods=['GET', 'POST'])
def email():
    destination=request.args.get('email')
    content=request.args.get('message')
    matter=request.args.get('matter')

    message = Mail(
        from_email=os.environ.get('SENDGRID_EMAIL'),
        to_emails=destination,
        subject=matter,
        html_content=f'<strong>{content}</strong>')
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return 'Correo enviado'
    except Exception as e:
        return e.message

if __name__=='__main__':
    app.run()
