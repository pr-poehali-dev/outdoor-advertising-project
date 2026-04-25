import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта Визуал ПРО на почту vizualpro39@mail.ru"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Invalid JSON"})}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    service = body.get("service", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    smtp_user = "vizualpro39@mail.ru"
    smtp_host = "smtp.mail.ru"
    smtp_port = 465

    subject = f"Новая заявка с сайта: {name}"

    html_body = f"""
<html>
<body style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <div style="background: #FFE600; padding: 24px 32px;">
      <h1 style="margin: 0; color: #0A0A0A; font-size: 22px; font-weight: bold;">⚡ Новая заявка — Визуал ПРО</h1>
    </div>
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 13px; width: 130px;">Имя клиента</td>
          <td style="padding: 10px 0; color: #111; font-size: 15px; font-weight: bold;">{name}</td>
        </tr>
        <tr style="border-top: 1px solid #f0f0f0;">
          <td style="padding: 10px 0; color: #888; font-size: 13px;">Телефон</td>
          <td style="padding: 10px 0; color: #111; font-size: 15px; font-weight: bold;">
            <a href="tel:{phone}" style="color: #FF6B00; text-decoration: none;">{phone}</a>
          </td>
        </tr>
        <tr style="border-top: 1px solid #f0f0f0;">
          <td style="padding: 10px 0; color: #888; font-size: 13px;">Услуга</td>
          <td style="padding: 10px 0; color: #111; font-size: 15px;">{service if service else "Не указана"}</td>
        </tr>
        {f'''<tr style="border-top: 1px solid #f0f0f0;">
          <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Сообщение</td>
          <td style="padding: 10px 0; color: #111; font-size: 15px;">{message}</td>
        </tr>''' if message else ""}
      </table>
      <div style="margin-top: 28px; padding: 16px; background: #fffbe6; border-left: 4px solid #FFE600; border-radius: 4px;">
        <p style="margin: 0; color: #666; font-size: 13px;">Перезвоните клиенту в рабочее время: Пн–Пт 10:00–18:00, Сб 10:00–17:00</p>
      </div>
    </div>
    <div style="padding: 16px 32px; background: #f9f9f9; text-align: center;">
      <p style="margin: 0; color: #bbb; font-size: 12px;">Визуал ПРО · г. Калининград, Киевский переулок, д. 1А</p>
    </div>
  </div>
</body>
</html>
"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = smtp_user
    msg["To"] = smtp_user
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True, "message": "Заявка отправлена"}),
    }
