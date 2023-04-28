import cv2
import argparse
from ultralytics import YOLO
from Adafruit_IO import Client
import supervision as sv
import numpy as np
import time
import base64
from io import BytesIO
from PIL import Image
import json


aio = Client(username='thinhdanghcmut', key='aio_JZnx35SZsm0I0jl4QYIcEdCFBw33')


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="YOLOv8 live")
    parser.add_argument(
        "--webcam-resolution", 
        default=[320, 320], 
        nargs=2, 
        type=int
    )
    args = parser.parse_args()
    return args


def main():
    args = parse_arguments()
    frame_width, frame_height = args.webcam_resolution

    # cap = cv2.VideoCapture('http://192.168.137.72:4747/mjpegfeed')
    cap = cv2.VideoCapture(0)

 
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, frame_width)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, frame_height)
    model = YOLO("best.pt")
   

    box_annotator = sv.BoxAnnotator(
        thickness=2,
        text_thickness=2,
        text_scale=1
    )
    object_counts={}

    while True:
        ret, frame = cap.read()
            # Convert the frame to a JPEG image 
        frame = cv2.resize(frame, (320, 320))

        result = model(frame, agnostic_nms=True)[0]
        detections = sv.Detections.from_yolov8(result)

        labels = [
            f"{model.model.names[class_id]} {confidence:0.2f}"
            for _, confidence, class_id, _
            in detections
        ]

        # print(labels)
        for label in labels:
            object_label = label.split(' ')[0]  # Extract class label
            if object_label not in object_counts:
                object_counts[object_label] = 0  # Initialize count to 0 if not present
                object_counts[object_label] += 1  # Increment count by 1

        # print (object_counts)

        # aio.send_data('', object_counts)  # Send object counts as dictionary

        frame = box_annotator.annotate(
            scene=frame, 
            detections=detections, 
            labels=labels
        )

        res, buffer = cv2.imencode('.jpg', frame)
        jpeg_frame = buffer.tobytes()
        data = base64.b64encode(jpeg_frame).decode('utf-8')
    
        aio.send_data('frame', data)

        cv2.imshow("yolov8", frame)


        if (cv2.waitKey(30) == 27):
            break


if __name__ == "__main__":
    main()