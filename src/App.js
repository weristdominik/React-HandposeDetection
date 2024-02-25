import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './Navigation/navbar';
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import drawHand from './drawHand'

import { handGesture } from './HandGestures';

import * as fp from "fingerpose";


function App() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runHandpose = async () => {
        const net = await handpose.load();
        console.log("Handpose model loaded.");
        //  Loop and detect hands
        setInterval(() => {
            detect(net);
        }, 100);
    };

    const detect = async (net) => {
        // Check data is available
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Make Detections
            const hand = await net.estimateHands(video);
            //console.log(hand);

            //Recognize Gesture:
            if (hand.length > 0) {
                const GE = new fp.GestureEstimator([
                    handGesture
                ]);
                const gesture = await GE.estimate(hand[0].landmarks, 4);
                if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
                    console.log(gesture.gestures);

                    const confidence = gesture.gestures.map(
                        (prediction) => prediction.confidence
                    );
                    const maxConfidence = confidence.indexOf(
                        Math.max.apply(null, confidence)
                    );

                    /* START CODE When Gesture is recognized */

                    //View handGesture.js to get Hand Shape!
                }
            }

            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx);

        }
    };

    runHandpose();

    return (
        <div className="bg-dark text-light"> {/* Apply the bg-dark class for dark background and text-light for light text */}
            <AppNavbar />
            <header className="App-header">
                <Webcam
                    ref={webcamRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 640,
                        height: 480,
                    }}
                />

                <canvas
                    mirrored={true}
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 640,
                        height: 480,
                    }}
                />
            </header>
        </div>
    );
}



export default App;




/* Example hand from console:
      [
    {
        "handInViewConfidence": 0.9995028972625732,
        "boundingBox": {
            "topLeft": [
                147.13752169813347,
                -79.41070068084545
            ],
            "bottomRight": [
                751.673697731499,
                525.1254753525201
            ]
        },
        "landmarks": [
            [
                479.7818355052782,
                442.68872407524304,
                -0.0009127557277679443
            ],
            [
                529.0304724971318,
                372.52727408635616,
                13.989690780639648
            ],
            [
                543.4297208596035,
                309.4613997019351,
                17.08856773376465
            ],
            [
                545.1181022530898,
                257.4860074951769,
                19.323984146118164
            ],
            [
                547.476627773216,
                216.15484946313717,
                21.493886947631836
            ],
            [
                533.123617896522,
                273.99172794453904,
                -5.959096431732178
            ],
            [
                513.3397315939332,
                182.89069549199098,
                -7.946897506713867
            ],
            [
                495.8587411430266,
                129.85869069527544,
                -6.559576034545898
            ],
            [
                481.20514344781975,
                91.89281142625535,
                -5.240905284881592
            ],
            [
                493.36030567775396,
                284.6651145583048,
                -11.593387603759766
            ],
            [
                467.7918415246153,
                179.58185748662248,
                -15.939507484436035
            ],
            [
                445.6582197182288,
                119.33654296272165,
                -13.797832489013672
            ],
            [
                429.9191029757096,
                76.3031628429002,
                -12.355681419372559
            ],
            [
                450.95585773202436,
                301.8428618233216,
                -14.771222114562988
            ],
            [
                423.3832871840334,
                206.77590227939135,
                -18.69388771057129
            ],
            [
                400.7051230327471,
                148.7453053618859,
                -17.571317672729492
            ],
            [
                385.1353553780719,
                107.22835625347801,
                -16.7697696685791
            ],
            [
                411.0101587202126,
                321.8665604870711,
                -15.767257690429688
            ],
            [
                383.0946493146422,
                248.13035965027638,
                -18.41558074951172
            ],
            [
                364.716507315131,
                207.4844679770619,
                -18.567012786865234
            ],
            [
                351.3345916564164,
                173.09996296287756,
                -19.019336700439453
            ]
        ],
        "annotations": {
            "thumb": [
                [
                    529.0304724971318,
                    372.52727408635616,
                    13.989690780639648
                ],
                [
                    543.4297208596035,
                    309.4613997019351,
                    17.08856773376465
                ],
                [
                    545.1181022530898,
                    257.4860074951769,
                    19.323984146118164
                ],
                [
                    547.476627773216,
                    216.15484946313717,
                    21.493886947631836
                ]
            ],
            "indexFinger": [
                [
                    533.123617896522,
                    273.99172794453904,
                    -5.959096431732178
                ],
                [
                    513.3397315939332,
                    182.89069549199098,
                    -7.946897506713867
                ],
                [
                    495.8587411430266,
                    129.85869069527544,
                    -6.559576034545898
                ],
                [
                    481.20514344781975,
                    91.89281142625535,
                    -5.240905284881592
                ]
            ],
            "middleFinger": [
                [
                    493.36030567775396,
                    284.6651145583048,
                    -11.593387603759766
                ],
                [
                    467.7918415246153,
                    179.58185748662248,
                    -15.939507484436035
                ],
                [
                    445.6582197182288,
                    119.33654296272165,
                    -13.797832489013672
                ],
                [
                    429.9191029757096,
                    76.3031628429002,
                    -12.355681419372559
                ]
            ],
            "ringFinger": [
                [
                    450.95585773202436,
                    301.8428618233216,
                    -14.771222114562988
                ],
                [
                    423.3832871840334,
                    206.77590227939135,
                    -18.69388771057129
                ],
                [
                    400.7051230327471,
                    148.7453053618859,
                    -17.571317672729492
                ],
                [
                    385.1353553780719,
                    107.22835625347801,
                    -16.7697696685791
                ]
            ],
            "pinky": [
                [
                    411.0101587202126,
                    321.8665604870711,
                    -15.767257690429688
                ],
                [
                    383.0946493146422,
                    248.13035965027638,
                    -18.41558074951172
                ],
                [
                    364.716507315131,
                    207.4844679770619,
                    -18.567012786865234
                ],
                [
                    351.3345916564164,
                    173.09996296287756,
                    -19.019336700439453
                ]
            ],
            "palmBase": [
                [
                    479.7818355052782,
                    442.68872407524304,
                    -0.0009127557277679443
                ]
            ]
        }
    }

      
      
      
      */