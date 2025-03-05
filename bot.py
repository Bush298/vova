import telebot
import requests
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

# Токен бота
TOKEN = "7840011938:AAEIyDQcVWA5b6Aj9KvlJny5_xBgPFGRfbY"  # Замени на свой токен
bot = telebot.TeleBot(TOKEN)

# Данные для почты
EMAIL_FROM = "bushnev.max@gmail.com"
EMAIL_TO = "maxon298@yandex.ru"
EMAIL_PASSWORD = "snkc apmr bjys kfyv"

# Функция отправки письма с файлом
def send_email(subject, message, file_path=None):
    msg = MIMEMultipart()
    msg["From"] = EMAIL_FROM
    msg["To"] = EMAIL_TO
    msg["Subject"] = subject
    msg.attach(MIMEText(message, "plain"))

    # Добавляем вложение, если есть файл
    if file_path:
        attachment = open(file_path, "rb")
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header("Content-Disposition", f"attachment; filename={os.path.basename(file_path)}")
        msg.attach(part)
        attachment.close()

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(EMAIL_FROM, EMAIL_PASSWORD)
    server.send_message(msg)
    server.quit()

    # Удаляем файл после отправки
    if file_path:
        os.remove(file_path)

# Команда /start
@bot.message_handler(commands=["start"])
def send_welcome(message):
    bot.reply_to(message, "Привет! Отправь мне сообщение или файл, и я перешлю его на почту.")

# Обработка текстовых сообщений
@bot.message_handler(content_types=["text"])
def handle_text(message):
    user_text = f"От {message.chat.username}:\n{message.text}"
    send_email("Новое сообщение от Telegram-бота", user_text)
    bot.reply_to(message, "Сообщение отправлено на почту!")

# Обработка файлов (фото, документы)
@bot.message_handler(content_types=["photo", "document"])
def handle_file(message):
    if message.photo:
        file_info = bot.get_file(message.photo[-1].file_id)
    else:
        file_info = bot.get_file(message.document.file_id)

    file_url = f"https://api.telegram.org/file/bot{TOKEN}/{file_info.file_path}"
    file_name = file_info.file_path.split("/")[-1]

    # Скачиваем файл
    response = requests.get(file_url)
    with open(file_name, "wb") as file:
        file.write(response.content)

    # Отправляем файл на почту
    send_email("Файл от Telegram-бота", f"От {message.chat.username}", file_name)
    bot.reply_to(message, "Файл отправлен на почту!")

# Запуск бота
bot.polling(none_stop=True)
