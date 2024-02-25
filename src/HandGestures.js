//Dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

//Description
export const handGesture = new GestureDescription('CustomHandGesture');

//Thumb
handGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
handGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
handGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);

//Rest of Fingers
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    handGesture.addCurl(finger, FingerCurl.FullCurl, 0.75);
    handGesture.addDirection(finger, FingerDirection.VerticalDown, 0.75);
}