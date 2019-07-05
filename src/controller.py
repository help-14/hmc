from __future__ import print_function
from inputs import get_gamepad
import socketio
import inputs

sio = socketio.Client()


@sio.event
def connect():
    print("connection established")


@sio.event
def my_message(data):
    print("message received with ", data)
    sio.emit("my response", {"response": "my response"})


@sio.event
def disconnect():
    print("disconnected from server")


sio.connect("http://localhost:3000")
sio.wait()


def main():
    """Just print out some event infomation when the gamepad is used."""
    while 1:
        events = get_gamepad()
        for event in events:
            print(event.ev_type, event.code, event.state)
            if event.ev_type == "Absolute" and event.state == 0:
                sio.emit("gamepad", event.code)


if __name__ == "__main__":
    main()
