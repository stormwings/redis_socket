import falcon
import redis
import json
import time
import threading

class RedisResource:
    def __init__(self):
        self.redis_client = redis.StrictRedis(host='redis', port=6379, db=0)

    def delayed_publish(self):
        time.sleep(5)
        data = {
            'socketId': 'someSocketId',
            'info': 'someInformation'
        }
        self.redis_client.publish('some-channel', json.dumps(data))

    def on_get(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.media = {"message": "Cargando"}
        
        threading.Thread(target=self.delayed_publish).start()

app = falcon.App()
app.add_route('/send-to-redis', RedisResource())
