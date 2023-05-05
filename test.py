import requests

TOKEN = '5993617758:AAED3k1DbgETFSlgpfO2yMxZC_U03h3rW1Q'
Chat_ID = '-947923565'  

def send_to_telegram(message):
    # apiToken = '5082654068:AAF7quCLZ4xuTq2FBdo3POssdJsM_FRHwTs'
    # chatID = '515382482'
    apiURL = f'https://api.telegram.org/bot{TOKEN}/sendMessage'
    try:
        response = requests.post(apiURL, json={'chat_id': Chat_ID, 'text': message})
        print(response.text)
    except Exception as e:
        print(e)

send_to_telegram('TestSendMessage')