FROM python:3.9

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD [ "gunicorn", "--reload", "app:app", "--bind", "0.0.0.0:8000", "--workers", "3" ]
